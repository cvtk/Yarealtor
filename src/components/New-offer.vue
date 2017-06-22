<template>
  <div :class="$style.new_offer">
    <div :class="$style.new_offer__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
        <router-link tag="li" :to="{ name: 'offers' }" :class="$style.breadcrumbs__item">Предложения</router-link >
        <span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">Создать новое</li>
      </ul>
    </div>
    <div :class="$style.new_offer__toolbar">
      <h1 :class="$style.toolbar__title">Создать<span :class="$style._small">новое предложение</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    
    <div :class="$style.new_offer__main">
      <div :class="$style.main_wrapper">
        <div :class="$style.main__steps">
          <div :class="$style.steps__item">
            <div :class="$style.item__number">1</div>
            <div :class="$style.item__title">Тип</div>
            <div :class="$style.item__content">Тут пояснение</div>
          </div>
          <div :class="[ $style.steps__item, $style._color_red ]">
            <div :class="$style.item__number">2</div>
            <div :class="$style.item__title">Опции</div>
            <div :class="$style.item__content">Какой-то текст</div>
          </div>
          <div :class="[ $style.steps__item, $style._color_green ]">
            <div :class="$style.item__number">3</div>
            <div :class="$style.item__title">Финиш</div>
            <div :class="$style.item__content">Еще немного текста</div>
          </div>
        </div>
      </div>
      
      <app-ad-sidebar :class="$style.main__ad"></app-ad-sidebar>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/style.scss";
  /* new_offer */
    .new_offer {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* new_offer__main */
    .new_offer__main {
      position: relative;
    }
  /* main_wrapper */
    .main_wrapper {
      position: relative;
      margin-right: 300px;
    }
  /* main__steps */
    .main__steps {
      position: relative;
      background-color: #2f353b;
      &:after { @include clearfix }
    }
    
    .steps__item {
      position: relative;
      width: 33.333333%;
      float: left;
      padding: 20px 30px;
      cursor: pointer;
      transition: background-color .2s ease-in-out;
      &._color_red > .item__number,
      &._color_red > .item__title,
      &._color_red > .item__content { color: #E7505A; border-color: #E7505A; }
      &._color_green > .item__number,
      &._color_green > .item__title,
      &._color_green > .item__content { color: #26C281; border-color: #26C281; }
      &:hover { background-color: #364150; &:after { border-left-color: #364150 } }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 42.5px solid transparent;
        border-bottom: 42.5px solid transparent;
        border-left: 42.5px solid transparent;
        transition: border-left-color .2s ease-in-out;
      }
    }

    .item__number {
      font-size: 26px;
      color: #e5e5e5;
      border-radius: 50%!important;
      float: left;
      margin: auto;
      padding: 3px 14px;
      border: 1px solid #e5e5e5;
    }

    .item__title {
      font-size: 24px;
      color: #e5e5e5;
      font-weight: 100;
      padding-left: 60px;
      margin-top: -4px;
      text-transform: uppercase;
    }

    .item__content {
      font-weight: 300;
      padding-left: 60px;
      margin-top: -5px;
      color: #95A5A6;
    }

  /* new_offer__bar */
    .new_offer__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* new_offer__toolbar */
    .new_offer__toolbar { margin: 25px 0 }

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
    }
  
  /* main__content */
    .main__content {
      position: relative;
      margin-right: 300px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      height: auto;
      overflow: hidden;
      &:after { @include clearfix }
    }

  /* bar__breadcrumbs */
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

  /* responsive */
    .new_offer {
      @media (max-width: $bp-medium) {
        .main__ad { display: none }
        .main__content { margin-right: 0 }
      }
      @media (max-width: $bp-small) {
        ._small { display: none }
        .breadcrumbs__item:first-child { display: none }
      }
    }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppOnlineStatus from './modules/online-status.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppFilters from './helpers/filters.js';
  import Icon from 'vue-awesome/components/Icon.vue';
  import 'vue-awesome/icons/map';
  import 'vue-awesome/icons/map-o';
  import 'vue-awesome/icons/comments';
  import 'vue-awesome/icons/comments-o';
  import 'vue-awesome/icons/star';
  import 'vue-awesome/icons/star-o';

  export default {
    name: 'new_offer',
    props: ['auth'],
    components: { AppLoader, AppOnlineStatus, AppAdSidebar, Icon },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        carouselMenuActive: false,
        item:
          {
            image: '/static/apartments/1.jpg',
            favorites: false,
            id: 112313,
            type: 0,
            rooms: 3,
            price: 4500000,
            date: 1497852079,
            area: 90.2,
            floor: 7,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Тестовая компания"', photo: '/static/users/default-3.svg' },
            estate: { address: 'ул. Строителей, 7', city: 'Ярославль', floors: 13 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          }
      }
    },
    created() {
      this.dataReady = true;
    }
  }
</script>