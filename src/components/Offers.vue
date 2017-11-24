<template>
  <div :class="$style.offers">
    <div :class="$style.offers__bar">
      <breadcrumbs :items="[ { text: 'Главная', to: 'root'}, { text: 'Предложения', to: ''} ]"/>
      <div :class="$style.bar__layout_switcher">
        
        <span @click="currentLayout = false"
          :class="[$style.layout_switcher__grid, currentLayout || $style.__active]">
          <span :class="$style.grid__icon"></span>
        </span>

        <span @click="currentLayout = true"
          :class="[$style.layout_switcher__list, !currentLayout || $style.__active]">
          <span :class="$style.list__icon"></span>
        </span>

      </div>

    </div>
    <div :class="$style.offers__toolbar">
      <h1 :class="$style.toolbar__title">Предложения<span :class="$style._small">актуальные объекты</span></h1>
      <div :class="$style.toolbar__actions">

        <ui-radio-group name="authorFilter"
          :options="authorFilterOptions"
          :class="$style.actions__author_filter"
          v-model="authorFilter"
        ></ui-radio-group>
        
        <div :class="$style.actions__filter">
          <ui-switch v-model="filterToggled">Фильтр</ui-switch>
        </div>

        <div :class="$style.actions__create">
          <ui-fab
            @click="$router.push({ name: 'new-offer' })"
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
            <offers-filter :data="offers" @change="onFiltersChange" />
          </div>
        </transition>
        <transition name="layout-switcher" appear v-if="!!filteredOffers.length">
          <ul :class="$style.content__list" v-if="currentLayout">
            <li :class="$style.list__item" v-for="( offer, index ) in filteredOffers" :key="offer.key">
              <list-layout-item :offer="offer" :ghostMode="ghostMode" />
              <app-ad-banner v-if="(index + 1) % 10 === 0"></app-ad-banner>
            </li>
            <div :class="$style.list__loadmore">
              <ui-button size="small" v-if="isDataFulfilled" @click="loadMore">Загрузить еще</ui-button>
            </div>
          </ul>
          <ul :class="$style.content__grid" v-else>
            <grid-layout-item  :offer="offer" :ghostMode="ghostMode" v-for="( offer, index ) in filteredOffers" :key="offer.key" />
            <!-- <app-ad-banner v-if="(index + 1) % 9 === 0" :class="$style.ad__banner"></app-ad-banner> -->
            <div :class="$style.list__loadmore">
              <ui-button size="small" v-if="isDataFulfilled" @click="loadMore">Загрузить еще</ui-button>
            </div>
          </ul>
        </transition>
        <span v-else> По Вашему запросу ничего не найдено, попробуйте изменить условия поиска </span>
      </div>
      <app-loader v-else></app-loader>
      <app-ad-sidebar></app-ad-sidebar>
    </div>
  </div>
</template>

<style>


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

  .content__filter {
    position: relative;
    margin-bottom: 20px;
  }

  .content__list {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    &:after { @include clearfix }
  }

  .list__item {
    position: relative;
  }

  .list__loadmore {
    text-align: center;
  }

  .content__grid {
    position: relative;
    list-style: none;
    margin: 0 -10px;
    padding: 0;
    cursor: pointer;
    &:after { @include clearfix }
  }

  .grid__item {
    position: relative;
  }

  .ad__banner {
    position: relative;
    clear: both;
    padding: 0;
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
        display: inline-block;
        padding: 5px 10px;
        background-color: transparent;
        color: #93a3b5;
        border: 1px solid #93a3b5;
        transition: all .2s ease-in-out;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        line-height: 1.5;
        font-size: 13px;
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
    vertical-align: middle;
    margin-right: 25px;
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
  import firebase from '../firebase.js';
  import ListLayoutItem from './offers/list-layout-item.vue';
  import GridLayoutItem from './offers/grid-layout-item.vue';

  const offersRef = firebase.database().ref('offers');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'offers',
    props: ['auth', 'user', 'ghostMode'],
    components: { GridLayoutItem, ListLayoutItem },
    data() {
      return {
        dataReady: false,
        currentLayout: true,
        filterToggled: true,
        authorFilter: 'all',
        ref: '',
        offers: [],
        companies: {},
        data: {},
        offerLimit: 15,
        authorFilterOptions : [
          { label: 'Мои', value: 'my' },
          { label: 'ЯСР', value: 'yasr' },
          { label: 'Все', value: 'all' }
        ]
      }
    },
    created() {
      this.ref = offersRef.on('value', this.onOffersValue);
    },
    computed: {
      isDataFulfilled() { return ( this.filteredOffers.length === this.offerLimit && this.offers.length > this.offerLimit ) },
      filteredOffers() {
        if ( this.filterToggled ) {
          if ( !this.data.length ) return []
          return this.data.sort( (a, b) => b.created - a.created )
                .filter( e => this.authorFilterResult(e) )
                .slice( 0, this.offerLimit )
        } else {
          return this.offers.sort( (a, b) => b.created - a.created )
                .filter( e => this.authorFilterResult(e) )
                .slice( 0, this.offerLimit )
        }
      }
    },
    methods: {
      loadMore() { this.offerLimit += 15 },
      isMy(offer) { return offer.author === this.user.key },
      isYasr(offer) { return this.companies[offer.company].yasr },
      authorFilterResult(offer) {
        return this.authorFilter === 'my' && this.isMy(offer) ||
          this.authorFilter === 'yasr' && this.isYasr(offer) ||
          this.authorFilter === 'all'
      },
      onOffersValue(offers) {
        if ( !offers.exists() ) { this.offers = []; this.dataReady = true; return;  }
        let tmp = offers.val();
        this.offers = Object.keys(tmp).map( e => tmp[e] );
        offers.forEach( offer => {
          companiesRef.child(offer.val().company).once('value', company => {
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