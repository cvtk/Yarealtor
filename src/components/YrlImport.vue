<template>
  <div :class="$style.import" v-if="dataReady">

    <div :class="$style.import__bar">
      <breadcrumbs :items="[
        { text: 'Главная', to: 'root'},
        { text: 'Импорт из YRL', to: '' }
      ]"/> 
    </div>

    <div :class="$style.import__toolbar">
      <toolbar title="Импорт из YRL" sub="загрузка объектов недвижимости"></toolbar>
    </div>

    <div :class="$style.import__content">
      <div :class="$style.content">
        <table>
          <thead>
            <tr>
              <th>Название организации</th>
              <th>Ссылка на выгрузку</th>
              <th>Опции</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="( company, index ) in companies" :key="company.key">
              <th>{{ company.name }}</th>
              <th>{{ company.yml }}</th>
              <th><ui-icon-button
                @click="checkFeed(index)"
                icon="refresh"
                size="small"
                tooltip="Проверить выгрузку"
                tooltipPosition="top right"
                :loading="currentCompanyIndex === index && feedIsLoading" 
              ></ui-icon-button></th>
            </tr>
          </tbody>
        </table>
        <div :class="$style.content__data" v-if="!!logData.length && currentCompanyIndex !== null">
          <div :class="$style.data">
            <div :class="$style.data__toolbar">
              <toolbar title="Журнал" sub=""></toolbar>
            </div>
            <table>
              <thead><tr><th>№№</th><th>Время</th><th>Сообщений</th></tr></thead>
              <tbody>
                <tr v-for="( item, index ) in logData" :key="index">
                  <th>{{ index }}</th>
                  <th>{{ dateToLog(item.time) }}</th>
                  <th>{{ item.message }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div :class="$style.content__data" v-if="!feedIsLoading && currentCompanyIndex !== null">
          <div :class="$style.data">
            <div :class="$style.data__toolbar">
              <toolbar :title="companies[currentCompanyIndex].name" sub="актуальные объекты (созданы менее 120 дней)"></toolbar>
            </div>
            <table>
              <thead>
                <tr>
                  <th>№№</th>
                  <th>ID</th>
                  <th>Создан</th>
                  <th>Изменен</th>
                  <th>Тип предл.</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Город</th>
                  <th>Улица</th>
                  <th>Строение</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="( offer, index ) in offers" :key="offer['_internal-id']">
                  <th>{{ index }}</th>
                  <th>{{ offer['_internal-id'] }}</th>
                  <th>{{ dateToHuman(offer.created) }}</th>
                  <th>{{ dateToHuman(offer.modified) }}</th>
                  <th>{{ offer.type }}</th>
                  <th>{{ offer.object }}</th>
                  <th>{{ offer.price }}</th>
                  <th>{{ offer.localityType }} {{ offer.locality }}</th>
                  <th>{{ offer.streetType }} {{ offer.street }}</th>
                  <th>{{ offer.buildingType }} {{ offer.building }}</th>
                  <th><ui-icon-button
                    icon="add"
                    size="small"
                    tooltip="Добавить объект"
                    tooltipPosition="top right"
                  ></ui-icon-button></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ui-progress-linear color="primary" v-if="feedIsLoading"></ui-progress-linear>
      </div>
    </div>
  </div>
  <app-loader v-else></app-loader>
</template>

<script>
  import firebase from '../firebase.js';
  import Firebase from 'firebase';
  import xhr from './helpers/xhr.js';
  import seam from './yrl-import/seam.js';

  const moment = require('moment');
  const X2JS = require('./helpers/xml2json.js');

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'yrl-import',
    props: ['auth', 'user'],
    components: {  },
    data() {
      return {
        dataReady: false,
        companies: [],
        currentCompanyIndex: null,
        feedIsLoading: false,
        offers: '',
        logData: []
      }
    },
    destroyed() {
      // \\
    },
    created() {
      companiesRef.orderByChild('yml').on('value', this.companiesWithYrl);
      
    },
    computed: {
      currentCompany() {
        return this.companies[this.currentCompanyIndex];
      }
    },
    methods: {
      log(message) {
        if ( typeof(message) === 'undefined' ) return;
        let time = new Date();
        this.logData.push({ time, message });
      },
      isSamePerson(user, externalUser) {
        let _phn = (number) => {
          if ( typeof(number) === 'undefined' ) return;
          number.replace(/\D/g,'').slice(-10);
        }
        let _isEqual = ( field, extField ) => {
          if ( typeof(field) === 'undefined' || typeof(extField) === 'undefined' ) return false;
          return field === extField;
        }
        let extPhone = externalUser.phone,
            extEmail = externalUser.email.toLowerCase(),
            mobile = user.mobile,
            phone = user.phone,
            email = user.email.toLowerCase();

        if ( typeof(extPhone) === 'object' ) {
          return extPhone.some( p => {
            return _isEqual( _phn(p), _phn(phone) ) || _isEqual( _phn(p), _phn(mobile) ) || _isEqual( email, extEmail );
          })
        }
        return _isEqual( _phn(extPhone), _phn(phone) ) || _isEqual( _phn(extPhone), _phn(mobile) ) || _isEqual( email, extEmail );
      },
      getAgentsList(offers) {
        return [...new Set(offers.map( offer => offer['sales-agent'].email ))];
      },
      daysFrom(date) {
        let a = moment(),
            b = moment(date);
        return a.diff(b, 'days');
      },
      offerIsActual(offer) {
        let date = offer['creation-date'];
        //let date = offer['last-update-date'];

        return this.daysFrom(date) <= 120;
      },
      dateToLog(date) {
        return moment(date).format('HH:mm:ss.SSS');
      },
      dateToHuman(date) {
        return moment(date * 1000).calendar();
      },
      isYrlExists(company) {
        return typeof(company.yml) !== 'undefined' && !!company.yml;
      },

      companiesWithYrl(snapshot) {
        this.companies = [];
        snapshot.forEach( cmpn => {
          let company = cmpn.val();
          if ( this.isYrlExists(company) ) { this.companies.push(company) }
        });
        this.dataReady = true;
      },
      sortFeedOffersByDate(a, b) {
        let dateA = a['creation-date'],
            dateB = b['creation-date'];

        return new Date(dateB) - new Date(dateA);
      },
      xmlLoad(data) {
        let parser = new X2JS();
        return parser.xml_str2json(data);
      },
      prepareOffers(json) {
        return json['realty-feed']['offer']
                .sort( (a, b) => this.sortFeedOffersByDate(a, b) )
                .filter( offer => this.offerIsActual(offer) );        
      },
      checkFeed(index) {
        if ( this.currentCompanyIndex === index && this.feedIsLoading ) return false;
        this.feedIsLoading = true;
        this.currentCompanyIndex = index;
        this.logData = [];
        let url = this.companies[index].yml,
            offers = [];
        new Promise( (resolve, reject) => {
          this.log('Загрузка фида: ' + this.currentCompany.name + ' ,запрос данных по ссылке: ' + url);
          xhr(url, ( err, data ) => {
            if ( err ) { reject(err) } else { resolve(data) }
          });
        }).then( xml => {
          let json = this.xmlLoad(xml);
          this.log('Фид загружен, найдено: ' + json['realty-feed']['offer'].length + ' предл.');
          offers = this.prepareOffers( json );
          this.log('Выборка актуальных предложений (не старше 120 дн.), найдено: ' + offers.length + ' предл.');
          return usersRef.orderByChild('company').equalTo(this.currentCompany.key).once('value');
        }).then(snapshot => {
            let users = snapshot.val();
            this.offers = offers.filter( offer => {
              let externalUser = offer['sales-agent'];
              for ( let key in users ) {
                if (users.hasOwnProperty(key)) {
                  let user = users[key];
                  return true;
                  //return this.isSamePerson(user, externalUser)
                }
              }
            }).map( offer => seam(offer) );

            this.log('Поиск сотрудников на портале для связи с предложениями, найдено для: ' + offers.length + ' предл.');

            this.feedIsLoading = false;
          })
      }
    }
  }
</script>

<style lang="sass" module>

  @import "../assets/style.scss";

  .import
    position: relative
    padding: 20px

  .import__bar
    border-bottom: 1px solid #e7ecf1
    background-color: #fff
    position: relative
    padding: 0 20px
    margin: -20px -20px 0

  .import__toolbar
    margin: 25px 0

  .import__content
    position: relative

  .content
    position: relative

  .content__data
    position: relative
    margin: 20px 0

  .data
    position: relative

  .data__toolbar
     margin: 25px 0

  table
    font-size: 14px
    border-spacing: 0px
    border-collapse: collapse
    width: 100%
    max-width: 100%
    margin-bottom: 15px
    background-color: #fff
    text-align: left

  th
    font-weight: bold
    border: 1px solid #cccccc
    padding: 8px

  td
    border: 1px solid #cccccc
    padding: 8px

  tr
    background-color: #fff

  tr:nth-of-type(2n+1)
    background-color: #fff

  tr th
    font-family: "Roboto"
    font-weight: 300

  tr
    -moz-transition: background-color 300ms ease-in-out 0s
    -ms-transition: background-color 300ms ease-in-out 0s
    -o-transition: background-color 300ms ease-in-out 0s
    -webkit-transition: background-color 300ms ease-in-out 0s
    transition: background-color 300ms ease-in-out 0s

  tr
    border-top: 1px solid #cccccc
    border-bottom: 1px solid #cccccc

  th, td
    border: none
    
</style>