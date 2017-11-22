<template>
  <div :class="$style.offers">
    <div :class="$style.offers__bar">
      <breadcrumbs :items="[ { text: 'Главная', to: 'root'}, { text: 'Спрос', to: ''} ]"/>

    </div>
    <div :class="$style.offers__toolbar">
      <h1 :class="$style.toolbar__title">Спрос<span :class="$style._small">актуальные объекты</span></h1>
      <div :class="$style.toolbar__actions">
        <span :class="[ $style.actions__author_filter, authorFilter === 'my' && $style._active ]" @click="authorFilter = 'my'">Мои</span>
        <span :class="[ $style.actions__author_filter, authorFilter === 'yasr' && $style._active ]" @click="authorFilter = 'yasr'">Ан ЯСР</span>
        <span :class="[ $style.actions__author_filter, authorFilter === 'all' && $style._active ]" @click="authorFilter = 'all'">Все</span>
        <div :class="$style.actions__filter">
          <ui-switch v-model="filterToggled">Фильтр</ui-switch>
        </div>
        <div :class="$style.actions__create">
          <ui-fab
            @click="$router.push({ name: 'new-request' })"
            icon="edit"
            tooltip-position="top center"
            tooltip="Создать"
            size="small"
          ></ui-fab>
        </div>
      </div>
    </div>
    
    <div :class="$style.wrapper">

      <div :class="$style.offers__content" v-if="dataReady">
        <transition name="fade">
          <div :class="$style.content__filter" v-if="filterToggled">
            <requests-filter :data="requests" @change="onFiltersChange" />
          </div>
        </transition>
        <transition name="toggle-filter">
          <div :class="$style.content__filter" v-if="filterToggled"></div>
        </transition>
        <transition name="layout-switcher" appear v-if="!!filteredRequests.length"> 
          <ul :class="$style.content__list">
            <list-layout-item v-for="request in filteredRequests" :ghostMode="ghostMode" :key="request.key" :request="request" />
          </ul>
        </transition>
        <span v-else> По Вашему запросу ничего не найдено, попробуйте изменить условия поиска </span>
      </div>
      <app-loader v-else></app-loader>
      <app-ad-sidebar :class="$style.offers__ad"></app-ad-sidebar>
    </div>
  </div>
</template>

<style>
  .toggle-filter-enter-active, .toggle-filter-leave-active {
    transition: height .5s ease-in-out, opacity .5s ease-in-out;
  }
 
  .toggle-filter-leave, .toggle-filter-enter-to { height: auto; opacity: 1; }
  .toggle-filter-enter, .toggle-filter-leave-to { height: 0; opacity: 0 }


  .layout-switcher-enter-active {
    transition: bottom 1s ease-in-out, opacity .9s ease-in-out;
  }
  .layout-switcher-leave-active {
    transition: bottom .5s ease-in-out, opacity .45s ease-in-out;
  }
  .layout-switcher-leave, .layout-switcher-enter-to { bottom: 0; opacity: 1; }
  .layout-switcher-enter, .layout-switcher-leave-to { bottom: -768px; opacity: 0 }

  .filter-enter-active, .filter-leave-active {
    transition: left .5s ease-in-out;
    left: 0;
  }
  .filter-enter, .filter-leave-to { left: -100% }

  .ad-enter-active, .ad-leave-active {
    transition: right .75s ease-in-out;
    right: 0;
  }
  .ad-enter, .ad-leave-to { right: -100% }
</style>

<style lang="scss" module>
  @import "../assets/style.scss";

  .wrapper {
    position: relative;
    height: 100%;
    &:after { @include clearfix }
  }
  .offers {
    position: relative;
    height: 100%;
    padding: 20px;
  }

  .offers__content {
    position: relative;
    margin-right: 300px;
    margin-bottom: 25px;
  }

  .content__list {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    &:after { @include clearfix }
  }

  .content__filter {
    position: relative;
    background-color: #fff;
    margin-bottom: 20px;
    
  }

  .offers__ad {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 100%;
    background-color: #fff;
    padding: 15px 20px;
    > .ad__title {
      width: 100%;
      color: #578ebe;
      padding: 12px 0;
      display: inline-block;
      font-size: 15px;
      line-height: 18px;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: .25px;
    }
    > .ad__content {}
  }
  .offers__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
    > .bar__breadcrumbs {
      padding: 11px 0;
      display: inline-block;
      float: left;
      margin: 0;
      list-style: none;
      > .breadcrumbs__item {
        display: inline-block;
        color: #888;
        cursor: pointer;
        line-height: 14px;
        &:last-child {
          cursor: default;
        }
      }
      > .breadcrumbs__icon {
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
    > .bar__layout_switcher {
      float: right;
      text-align: right;
      padding: 5px 0;
      > .layout_switcher__list, .layout_switcher__grid {
        background-color: transparent;
        color: #93a3b5;
        border-color: #93a3b5;
        transition: all .2s ease-in-out;
        &:hover {
          background-color: #93a3b5;
          color: #f1f1f1;
          border-color: #93a3b5;
        }
      }
      > .__active {
        background-color: #93a3b5;
        color: #f1f1f1;
        border-color: #93a3b5;        
      }
      > .layout_switcher__list > .list__icon:before { content: "\e067"; font-family: "Icons"; }
      > .layout_switcher__grid > .grid__icon:before { content: "\e06a"; font-family: "Icons"; }
    }
    &:after { @include clearfix }

    @media (max-width: $bp-small) {
      > .bar__breadcrumbs {
        > .breadcrumbs__item:first-child { display: none; }
      }
    }
  }
  .offers__toolbar {
    margin: 25px 0;
    &:after { @include clearfix }
  }
  .toolbar__title {
    float: left;
    width: 50%;
    font-size: 24px;
    color: #666;
    margin: 0;
    padding: 0;
    letter-spacing: -1px;
    font-weight: 300;
    > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
  }

  .toolbar__actions {
    float: right;
    width: 50%;
    text-align: right;
  }

  .actions__new {
    margin: 2px 0;
    > .new__icon:before {
      content: "\e060";
      font-family: "Icons";
      margin-right: 5px;
    }
  }

  .actions__filter {
    display: inline-block;
    margin-right: 50px;
    vertical-align: middle;
  }
  .actions__create {
    display: inline-block;
    vertical-align: middle;
  }

  .actions__author_filter {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    color: #32c5d2;
    &:hover, &._active { text-decoration: underline }
  }

  .offers {
    @media (max-width: $bp-medium) {
      .actions__author_filter { margin-right: 5px }
      .actions__filter { margin-right: 10px; }
      .offers__ad { display: none }
      .offers__content { margin-right: 0 }
    }
    @media (max-width: $bp-small) {
      .toolbar__actions, .toolbar__title { float: none; width: 100% }
      ._small { display: none }

    }
    @media (max-width: $bp-extra-small) {
      .new__text { display: none }
      .new__icon:before { margin-right:0 }
    }
  }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import firebase from '../firebase.js';
  import ListLayoutItem from './requests/list-layout-item.vue';
  import AppInput from './modules/inputs.vue';
  import RequestsFilter from './apartments/requests-filter.vue'
  import Breadcrumbs from './page-blocks/breadcrumbs.vue';

  const requestsRef = firebase.database().ref('requests');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'requests',
    props: ['auth', 'ghostMode', 'user'],
    components: { AppLoader, ListLayoutItem, AppInput, RequestsFilter, Breadcrumbs },
    data() {
      return {
        dataReady: false,
        currentLayout: true,
        filterToggled: false,
        authorFilter: 'my',
        ref: '',
        requests: {},
        companies: {},
        data: []
      }
    },
    created() {
      this.ref = requestsRef.on('value', this.onRequestsValue);
    },
    computed: {
      filteredRequests() {
        if ( this.filterToggled ) {
          if ( !this.data.length ) return []
          return this.data.sort( (a, b) => b.created - a.created )
                .filter( e => this.authorFilterResult(e) )
        } else {
          return this.requests.sort( (a, b) => b.created - a.created )
                .filter( e => this.authorFilterResult(e) )
        }
      }
    },
    methods: {
      isMy(request) { return request.author === this.user.key },
      isYasr(request) { return this.companies[request.company].yasr },
      authorFilterResult(request) {
        return this.authorFilter === 'my' && this.isMy(request) ||
          this.authorFilter === 'yasr' && this.isYasr(request) ||
          this.authorFilter === 'all'
      },
      onRequestsValue(requests) {
        if ( !requests.exists() ) { this.requests = []; this.dataReady = true; return;  }
        let tmp = requests.val();
        this.requests = Object.keys(tmp).map( e => tmp[e] );
        requests.forEach( request => {
          companiesRef.child(request.val().company).once('value', company => {
          this.companies[company.key] = company.val();
          this.dataReady = true;
        });
        })
      },
      onFiltersChange(value) {
        this.data = value;
      }
    }
  }
</script>