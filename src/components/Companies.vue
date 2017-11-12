<template>
  <div :class="$style.companies">
    <modal-overlay :show="showCreateModal" @close="showCreateModal = false">
      <company-create :company="model" @cancel="showCreateModal = false" />
    </modal-overlay>
    <div :class="$style.companies__bar">
      <breadcrumbs :items="[ { text: 'Главная', to: 'root'}, { text: 'Компании', to: ''} ]"/> 
    </div>
    <div :class="$style.companies__toolbar">
      <div :class="$style.toolbar__header">
        <toolbar title="Компании" sub="организации портала"></toolbar>
      </div>
      <div :class="$style.toolbar__settings" v-if="isAdmin">
        <default-button label="Создать компанию" @click="showCreateModal = true" />
      </div>
    </div>

    <ul :class="[ $style.companies__grid, $style._yasr ]" v-if="!!yasrCompanies.length">
      <li :class="$style.grid__item" v-for="company in yasrCompanies">
        <div :class="$style.item_wrapper">
          <div :class="$style.image_wrapper">
            <div :class="$style.item__image" :style="{ 'background-image': 'url(' + company.image.medium + ')' }"></div>
            <div :class="$style.item__links">
              <router-link :to="{ name: 'company', params: { page: company.page } }" :class="$style.links_wrapper">
                <app-input type="button" :class="$style.links__more">Узнать больше</app-input>
              </router-link>
            </div>
          </div>
          <h3 :class="$style.item__name">{{ company.name }} <span :class="$style.item__remove" v-if="isAdmin" @click="removeCompany(company.key)">удалить</span></h3>
          <h4 :class="$style.item__slogan">{{ company.slogan }}</h4>
        </div>
        
      </li>
    </ul>
    <ul :class="$style.companies__grid">
      <li :class="$style.grid__item" v-for="company in otherCompanies">
        <div :class="$style.item_wrapper">
          <div :class="$style.image_wrapper">
            <div :class="$style.item__image" :style="{ 'background-image': 'url(' + company.image.medium + ')' }"></div>
            <div :class="$style.item__links">
              <router-link :to="{ name: 'company', params: { page: company.page } }" :class="$style.links_wrapper">
                <app-input type="button" :class="$style.links__more">Узнать больше</app-input>
              </router-link>
            </div>
          </div>
          <h3 :class="$style.item__name">{{ company.name }} <span :class="$style.item__remove" v-if="isAdmin" @click="removeCompany(company.key)">удалить</span></h3>
          <h4 :class="$style.item__slogan">{{ company.slogan }}</h4>
        </div>
        
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/style.scss";
  /* companies */
    .companies {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* companies__grid */
    .companies__grid {
      position: relative;
      padding: 0;
      list-style: none;
      margin: 0 -10px;
      &:after { @include clearfix }
      &._yasr { padding-top: 10px; border: 1px solid #F3C200; margin-bottom: 20px }
    }

  /* grid__item */
    .grid__item {
      display: block;
      position: relative;
      width: 25%;
      float: left;
      padding: 0 10px 20px;
      
    }

    .item_wrapper {
      position: relative;
      background-color: #fff;
      overflow: auto;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }

    .image_wrapper {
      position: relative;
      width: 100%;
      padding-top: 75%;
      background-color: #282727;
      overflow: hidden;
      &:hover > .item__image { top: -60px; bottom: 60px; }
    }

    .item__image {
      position: absolute;
      top: 0;
      left: -5px;
      bottom: 0;
      right: -5px;
      overflow: hidden;
      z-index: 1;
      transition: top .5s cubic-bezier(0.19, 1, 0.22, 1),
                  bottom .5s cubic-bezier(0.19, 1, 0.22, 1);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .item__links {
      padding: 15px 0;
      text-align: center;
    }
    .links__more {
      color: #fff;
      background-color: #e7505a !important;
      border-color: #e7505a !important;
      text-transform: uppercase;
      font-weight: 300;
      transition: background-color .2s ease-in-out,
                  border-color .2s ease-in-out;
      &:hover {
        background-color: #e12330 !important;
        border-color: #dc1e2b !important;
      }
    }

    .item__name {
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: #474747;
      margin: 15px 0 0;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item__remove {
      display: inline-block;
      color: #e27d79;
      font-size: 12px;
      font-weight: 300;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: color .25s;
      cursor: pointer;
      vertical-align: middle;
      &:hover { color: #d9534f; text-decoration: underline; }
    }

    .item__slogan {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      text-transform: uppercase;
      color: #888888;
      margin: 5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 17px;
    }

  /* companies__bar */
    .companies__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* companies__toolbar */
    .companies__toolbar {
      margin: 25px 0;
      &:after { @include clearfix }
    }

    .toolbar__header { float: left }

    .toolbar__settings { float: right }

  /* responsive */
    .companies__grid {
      @media (max-width: $bp-extra-large) {

      }
      @media (max-width: $bp-large) {
        .grid__item { width: 33.333333% }
      }
      @media (max-width: $bp-medium) {
        .grid__item { width: 50% }
      }
      @media (max-width: $bp-small) {

      }
      @media (max-width: $bp-extra-small) {
        .grid__item { width: 100% }
      }
  }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import firebase from '../firebase.js';
  import fface from './helpers/fireface.js';
  import companyMdl from '../models/company.js'
  import Breadcrumbs from './page-blocks/breadcrumbs.vue';
  import Toolbar from './page-blocks/toolbar.vue';
  import CompanyCreate from './company/company-settings.vue';
  import ModalOverlay from './modal-overlay/modal-overlay.vue';
  import DefaultButton from './default-inputs/default-button.vue';

  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'companies',
    props: ['auth', 'user'],
    components: { AppLoader, AppInput, CompanyCreate, ModalOverlay, DefaultButton, Breadcrumbs, Toolbar },
    data() {
      return {
        dataReady: false,
        companies: [],
        showCreateModal: false,
        model: companyMdl
      }
    },
    created() {
      companiesRef.on('value', companies => {
        let c = companies.val();
        this.companies = Object.keys(c).map( company => c[company]);
        this.dataReady = true;
      })
    },
    methods: {
      removeCompany(key) {
        fface.company.remove(key);
      }
    },
    computed: {
      isAdmin() {
        return this.user.role === 1;
      },
      yasrCompanies() {
        let yasr = this.companies.filter( company => company.yasr );
        for (let i = yasr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = yasr[i];
          yasr[i] = yasr[j];
          yasr[j] = temp;
        }
        return yasr;
      },
      otherCompanies() {
        return this.companies.filter( company => !company.yasr );
      }
    }
  }
</script>