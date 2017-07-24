<template>
  <div :class="$style.offers">
    <div :class="$style.offers__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">Предложения</li>
      </ul>
      <div :class="$style.bar__layout_switcher">
        
        <app-input type="button" @click.native="currentLayout = false"
          :class="[$style.layout_switcher__grid, currentLayout || $style.__active]">
          <span :class="$style.grid__icon"></span>
        </app-input>

        <app-input type="button" @click.native="currentLayout = true"
          :class="[$style.layout_switcher__list, !currentLayout || $style.__active]">
          <span :class="$style.list__icon"></span>
        </app-input>

      </div>

    </div>
    <div :class="$style.offers__toolbar">
      <h1 :class="$style.toolbar__title">Предложения<span :class="$style._small">актуальные объекты</span></h1>
      <div :class="$style.toolbar__actions">
        <span :class="[ $style.actions__author_filter, authorFilter === 'my' && $style._active ]" @click="authorFilter = 'my'">Мои</span>
        <span :class="[ $style.actions__author_filter, authorFilter === 'yasr' && $style._active ]" @click="authorFilter = 'yasr'">Ан ЯСР</span>
        <span :class="[ $style.actions__author_filter, authorFilter === 'all' && $style._active ]" @click="authorFilter = 'all'">Все</span>
        <app-input type="button" :class="[ $style.actions__filter, filterToggled && $style._active ]" @click="filterToggled = !filterToggled">
          <span :class="$style.filter__icon"></span>
          <span :class="$style.filter__text">Фильтр</span>
        </app-input>
        <router-link :to="{ name: 'new-offer' }">
          <app-input type="button" :class="$style.actions__new">
            <span :class="$style.new__icon"></span>
            <span :class="$style.new__text">Создать предложение</span>
          </app-input>
        </router-link>
      </div>
    </div>
    
    <div :class="$style.wrapper">

      <div :class="$style.offers__content" v-if="dataReady">
        <transition name="fade">
          <div :class="$style.content__filter" v-if="filterToggled">
            <apartments-filter />
          </div>
        </transition>
        <transition name="layout-switcher" appear> 
          <app-content-list :data="tmpHomes" v-if="currentLayout"></app-content-list>
          <app-content-grid :data="tmpHomes" v-else></app-content-grid>
        </transition>
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
    margin-right: 10px;
    margin-left: 20px;
    background-color: #fff;
    color: #32c5d2;
    &._active { background-color: #32c5d2; color: #fff; border: 1px solid #32c5d2; }
    > .filter__icon:before {
      content: "\e06c";
      font-family: "Icons";
      margin-right: 5px;
    }
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
      .offers__ad { display: none }
      .offers__content { margin-right: 0 }
    }
    @media (max-width: $bp-small) {
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
  import AppContentGrid from './modules/content-grid.vue';
  import AppContentList from './modules/content-list.vue';
  import AppInput from './modules/inputs.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import ApartmentsFilter from './apartments/apartments-filter.vue'

  export default {
    name: 'offers',
    props: ['auth'],
    components: { AppLoader, AppContentGrid, AppContentList, AppInput, AppAdSidebar, ApartmentsFilter },
    data() {
      return {
        dataReady: false,
        currentLayout: true,
        filterToggled: false,
        authorFilter: 'all',
        tmpHomes: [
          {
            image: '/static/apartments/1.jpg',
            id: 112323,
            type: 0,
            rooms: 3,
            price: 4500000,
            date: 1498740907332,
            area: 90.2,
            floor: 7,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 13 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/2.jpg',
            id: 112324,
            type: 1,
            rooms: 2,
            price: 2600000,
            date: 1498740907332,
            area: 77.3,
            floor: 2,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 5 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/3.jpg',
            id: 112325,
            type: 0,
            rooms: 1,
            price: 1000000,
            date: 1498740907332,
            area: 60,
            floor: 5,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 5 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/4.jpg',
            id: 112326,
            type: 0,
            rooms: 2,
            price: 1400000,
            date: 1498740907332,
            area: 45.2,
            floor: 6,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 7 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/5.jpg',
            id: 112327,
            type: 0,
            rooms: 1,
            price: 1750000,
            date: 1498740907332,
            area: 45.7,
            floor: 3,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Советская, 26', city: 'Ярославль', floors: 9 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/6.jpg',
            id: 112328,
            type: 0,
            rooms: 2,
            price: 3200000,
            date: 1498740907332,
            area: 50.4,
            floor: 3,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 5 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/7.jpg',
            id: 112329,
            type: 1,
            rooms: 2,
            price: 1300000,
            date: 1498740907332,
            area: 45.9,
            floor: 6,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 7 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/8.jpg',
            id: 112310,
            type: 0,
            rooms: 4,
            price: 6700000,
            date: 1498740907332,
            area: 127.6,
            floor: 4,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 11 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/9.jpg',
            id: 112311,
            type: 0,
            rooms: 2,
            price: 4500000,
            date: 1498740907332,
            area: 70.8,
            floor: 2,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 5 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/9.jpg',
            id: 112312,
            type: 1,
            rooms: 3,
            price: 3400000,
            date: 1498740907332,
            area: 56.3,
            floor: 4,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 7 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/9.jpg',
            id: 112313,
            type: 0,
            rooms: 2,
            price: 340000,
            date: 1498740907332,
            area: 66,
            floor: 5,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 9 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/9.jpg',
            id: 112314,
            type: 1,
            rooms: 2,
            price: 2500000,
            date: 1498740907332,
            area: 56.1,
            floor: 2,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Бабича, 7', city: 'Ярославль', floors: 7 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
        ]
      }
    },
    created() {
      this.dataReady = true;
    }
  }
</script>