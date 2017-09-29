<template>
  <div :class="$style.company">
    <div :class="$style.company__bar">
      <ul :class="$style.bar__breadcrumbs">
        <router-link :to="{ name: 'companies' }" tag="li" :class="$style.breadcrumbs__item">
          Компании
        </router-link><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item"> {{ company.name }}</li>
      </ul>
    </div>
    <div :class="$style.company__toolbar">
      <h1 :class="$style.toolbar__title">{{ company.name }}<span :class="$style._small">{{ company.slogan }}</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    <div :class="$style.company__banner" :style="{ 'background-image': 'url(' + company.image + ')' }">
      <div :class="$style.title_wrapper">
        <h2 :class="$style.banner__name">{{ company.name }} <span :class="$style.name__badge">Участник ЯСР</span></h2>
        <h3 :class="$style.banner__slogan">{{ company.slogan }}</h3>
      </div>
    </div>
    
    <div :class="$style.company_wrapper" v-if="dataReady">
      <div :class="$style.company__about_us">
        <h4 :class="$style.about_us__header"><span :class="$style.header__icon"></span> О Компании</h4>
        <p :class="$style.about_us__description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
        <div :class="$style.about_us__contacts">
          <div :class="$style.contacts__item"><span :class="$style.item__icon_address"></span>Адрес: {{ company.address }}</div>
          <div :class="$style.contacts__item"><span :class="$style.item__icon_phone"></span>Телефон: {{ company.phone }}</div>
          <div :class="$style.contacts__item"><span :class="$style.item__icon_email"></span>Эл. почта: {{ company.email }}</div>
        </div>
        <div :class="$style.about_us__requisites">
          <h5 :class="$style.requisites__title">Реквизиты</h5>
          <p :class="$style.requisites__item">Юридический адрес: 150000, г. Ярославль, ул. Большая Октябрьская, 76
            ИНН: 760214015080
            ОГРН: 1027700067328
            Расчетный счет: 40802810002910000776 в  АО "АЛЬФА-БАНК"
          </p>
        </div>
      </div>
      <div :class="$style.company__employees">
        <h4 :class="$style.employees__header"><span :class="$style.header__icon"></span> Сотрудники</h4>
        <div :class="$style.employees_wrapper">
          <div :class="$style.employees__principal" v-for="employee in moderators">
            <img :class="$style.principal__photo" :src="employee.photo">
            <div :class="$style.principal__meta">
              <router-link :to="{ name: 'user', params: { page: employee.page } }" :class="$style.meta__name">
                {{ [ employee.name, employee.surname ].join(' ') }}
              </router-link>
              <span :class="$style.meta__position">{{ employee.position }}</span>
              <p :class="$style.meta__about">{{ employee.about }}</p>
              <div :class="$style.meta__contacts">
                <span :class="$style.contacts__item"><span :class="$style.item__icon_phone"></span> {{ employee.phone }}</span>
                <span :class="$style.contacts__item"><span :class="$style.item__icon_mobile"></span> {{ employee.mobile }}</span>
                <span :class="$style.contacts__item"><span :class="$style.item__icon_email"></span> {{ employee.email }}</span>
              </div>
            </div>
          </div>
          <div :class="$style.employees__search_filter">
            <app-input v-model="search" placeholder="Поиск сотрудника..." :class="$style.search_filter__input" @keydown.enter.native="searchFilterSelectAll" />
          </div>
          <div :class="$style.employees__notfound" v-if="!employees.length">Сотрудники не найдены</div>
          <div :class="$style.employees__item" v-else v-for="employee in employees">
            <transition name="fade" appear>
              <div :class="$style.employe__wrapper">
                <div :class="$style.photo_wrapper">
                  <img :class="$style.item__photo" :src="employee.photo">
                </div>
                <router-link :to="{ name: 'user', params: { page: employee.page } }" :class="$style.item__name">{{ [ employee.name, employee.surname ].join(' ') }}</router-link>
                <span :class="$style.item__position">{{ employee.position }}</span>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .45s ease-in-out;
  }

  .fade-leave, .fade-enter-to { opacity: 1 }
  .fade-enter, .fade-leave-to { opacity: 0 }

</style>
<style lang="scss" module>
  @import "../assets/style.scss";

  .company {
    position: relative;
    height: 100%;
    padding: 20px;
  }

  .company__banner {
    position: relative;
    height: 500px;
    background-position: center;
    margin: 0 -20px;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
    }

    .title_wrapper {
      position: relative;
      z-index: 1;
    }
    .banner__name {
      color: #fff;
      font-size: 55px;
      font-weight: 600;
      text-align: center;
      margin-top: 130px;
      margin-bottom: 10px;
      text-shadow: 1px 1px 0 rgba(0,0,0,.2);
    }

    .name__badge {
      display: inline-block;
      position: relative;
      top: 1px;
      vertical-align: middle;
      margin-left: 10px;
      font-size: 14px;
      line-height: 1;
      font-weight: 300;
      letter-spacing: .25px;
      background-color: #9A12B3;
      opacity: .65;
      padding: 10px;
      padding-left: 5px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: -17px;
        border-top: 17px solid transparent;
        border-bottom: 17px solid transparent; 
        border-right: 17px solid #9A12B3; 
      }
    }

    .banner__slogan {
      color: #fff;
      text-align: center;
      font-size: 22px;
      font-weight: 400;
      margin-top: 30px;
      margin-bottom: 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  .company_wrapper {
    position: relative;
    overflow: hidden;
    margin: 20px -10px;
    &:after { @include clearfix }
  }

  .company__about_us {
    float: left;
    width: 50%;
    padding: 0 10px;

    .about_us__header {
      background-color: #d9534f;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      padding: 1em 20px;
      margin: 0;
      line-height: 1.1;
      letter-spacing: .25px;
    }
    
    .header__icon {
      display: inline-block;
      line-height: 14px;
      -webkit-font-smoothing: antialiased;
      font-size: 24px;
      &:after {
        content: "\e08b";
        font-family: "Icons";
      }
    }

    .about_us__description {
      padding: 20px;
      margin: 0;
      color: #808a94;
      background-color: #fff;
    }

    .about_us__contacts {
      position: relative;
      overflow: hidden;
      padding: 0 20px 15px;
      background-color: #fff;
    }

    .contacts__item {
      margin: 5px 0;
      font-size: 16px;
      color: #808a94;
    }

    .item__icon_address, .item__icon_phone, .item__icon_email {
      display: inline-block;
      font-size: 17px;
      margin-right: 5px;
      &:before {
        content: "\e096";
        font-family: "Icons";
        display: inline-block;
      }
    }
    .item__icon_phone:before { content: "\E048" }
    .item__icon_email:before { content: "\e01e" }

    .about_us__requisites {
      position: relative;
      overflow: hidden;
      padding: 0 20px 20px;
      background-color: #fff;
    }

    .requisites__title {
      font-size: 16px;
      font-weight: 400;
      margin: 0 0 5px;
    }

    .requisites__item {
      margin: 0;
      line-height: 24px;
      color: #808a94;
      white-space: pre-line;
    }
  }

  .company__employees {
    float: left;
    width: 50%;
    padding: 0 10px;

    .employees__header {
      background-color: #3598dc;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      padding: 1em 20px;
      margin: 0;
      line-height: 1.1;
      letter-spacing: .25px;
    }

    .header__icon {
      display: inline-block;
      line-height: 14px;
      -webkit-font-smoothing: antialiased;
      font-size: 24px;
      &:after {
        content: "\e001";
        font-family: "Icons";
      }
    }

    .employees_wrapper {
      position: relative;
      height: 800px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 20px;
      margin: 0;
      background-color: #fff;
      &:after { @include clearfix }
    }
    .employees__principal {
      position: relative;
      margin-bottom: 20px;
      overflow: hidden;
      &:after { @include clearfix }
    }

    .principal__photo {
      display: block;
      float: left;
      width: 20%;
    }

    .principal__meta {
      float: left;
      width: 80%;
      padding-left: 20px;
    }

    .meta__name {
      font-size: 16px;
      margin: 0;
      color: #32c5d2;
      font-weight: 400;
      text-decoration: none;
      transition: color .2s ease-in-out;
      &:hover { color: darken(#32c5d2, 15%); text-decoration: underline }
    }

    .meta__position {
      display: block;
      color: #95A5A6;
      line-height: 1.25;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .meta__about {
      margin: 7.5px 0;
      color: #808a94;
    }

    .meta__contacts {
      position: relative;
    }

    .contacts__item {
      display: inline-block;
      color: #32c5d2;
      margin-right: 10px;
      vertical-align: bottom;
    }

    .item__icon_phone, .item__icon_mobile, .item__icon_email {
      display: inline-block;
      font-size: 15px;
      &:before {
        content: "\e048";
        font-family: "Icons";
      }
    }

    .item__icon_mobile:before { content: "\e010" }
    .item__icon_email:before { content: "\e01e" }
    
    .employees__search_filter:after { @include clearfix }
    
    .employe__wrapper { /* */ }

    .search_filter__input {
      float: right;
      width: 33.333333%;
    }

    .employees__notfound {
      color: #93a1bb;
      font-style: italic;
      padding: 10px 0;
    }

    .employees__item {
      position: relative;
      float: left;
      padding: 0 10px;
      width: 33.333333%;
      margin-bottom: 15px;
    }

    .item__photo {
      display: block;
      max-width: 100px;
      border: 4px solid #f5f6fa;
      border-radius: 50%;
      margin: 0 auto;
    }

    .photo_wrapper {
      padding: 5px 15px;
    }

    .item__name {
      display: block;
      font-weight: 400;
      color: #578ebe;
      text-decoration: none;
      transition: color .2s ease-in-out;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover { text-decoration: underline; color: #23527c; }
    }

    .item__position {
      display: block;
      color: #95A5A6;
      line-height: 1.25;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .company__toolbar {
    margin: 25px 0;

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small {
        font-size: 14px;
        letter-spacing: 0;
        text-transform: lowercase;
        margin-left: 5px;
      }
    }
  }

  .company__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
    &:after { @include clearfix }

    .bar__breadcrumbs {
      padding: 11px 0;
      display: inline-block;
      float: left;
      margin: 0;
      list-style: none;
    }

    .breadcrumbs__item {
      display: inline-block;
      color: #888;
      cursor: pointer;
      line-height: 14px;
      &:last-child {
        cursor: default;
      }
    }

    .breadcrumbs__icon {
      color: #888;
      cursor: default;
      line-height: 14px;
      &:after {
        content: "\e606";
        display: inline-block;
        font-family: "Icons";
        cursor: default;
        font-size: 7px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
  }
    
  /* responsive */
    .company {
      @media (max-width: $bp-extra-large) {
        .employees__item { width: 25% }
      }
      @media (max-width: $bp-large) {
        .employees__item { width: 33.333333% }
      }
      @media (max-width: $bp-medium) {

      }
      @media (max-width: $bp-small) {
        .employees__item { width: 50% }
      }
      @media (max-width: $bp-extra-small) {

      }
  }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import firebase from '../firebase.js';

  const companiesRef = firebase.database().ref('companies');
  const usersRef = firebase.database().ref('users');

  export default {
    name: 'company',
    props: ['auth'],
    components: { AppLoader, AppInput },
    computed: {

      employees() {
        let sorted = this.users.sort( (a, b) => a[surname] > b[surname] );

        if ( !this.search ) return sorted;

        let regex = new RegExp(this.search, "i");
        return sorted.filter( employee => [employee.name, employee.surname].join('').match(regex) );
      }
    },
    methods: {
      searchFilterSelectAll(e) {
        let el = e.target;
        el.setSelectionRange(0, el.value.length)
      }
    },
    data() {
      return {
        dataReady: false,
        search: '',
        company: {},
        users: [],
        moderators: []
      }
    },
    mounted() {
      companiesRef.orderByChild('page').equalTo(this.$route.params.page).on('value', (company) => {
        if ( company.exists() ) { company.forEach(item => {
          this.company = item.val();
          usersRef.orderByChild('company').equalTo(this.company.key).on('value', employees => {
            employees.forEach( employee => {
              let e = employee.val();
              if ( e.role <= 5 ) { this.moderators.push(e) }
              else { this.users.push(e) }
            })
          })
          // usersRef.child(this.company.principal).on('value', principal => {
          //   this.$set( this.company, 'principal', principal.val() )
          // })
        })}
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.page } });
        }
        this.dataReady = true
      })
    },
  }
</script>