<template>
  <div :class="$style.offer">
    <div :class="$style.offer__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
        <router-link tag="li" :to="{ name: 'offers' }" :class="$style.breadcrumbs__item">Предложения</router-link >
        <span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">{{ item.estate.city }}, {{ item.estate.address }} ({{ item.id }})</li>
      </ul>
    </div>
    <div :class="$style.offer__toolbar">
      <h1 :class="$style.toolbar__title">{{ item.estate.city }}, {{ item.estate.address }}<span :class="$style._small">Предложение #{{ item.id }}</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    
    <div :class="$style.offer__main">
      <div :class="$style.main__content">
        <div :class="$style.content__background" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
        <aside :class="$style.content__details">
          <div :class="$style.details__author">
            <img :class="$style.author__photo" :src="item.author.photo">
            <div :class="$style.author__meta">
              <router-link :class="$style.meta__name" :to="{ name: 'user', params: { page: item.author.page } }">
                {{ item.author.name }}
                <app-online-status :online="true"></app-online-status>
              </router-link>
              <router-link :class="$style.meta__company" :to="{ name: 'company', params: { page: item.author.page } }">
                {{ item.author.company }}
              </router-link>
            </div>
          </div>

          <ul :class="$style.details__list">
            <li :class="$style.list__item">
              <span :class="$style.item__title">Цена:</span>
              <span :class="$style.item__value">{{ item.price | price }} руб.</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Населенный пункт:</span>
              <span :class="$style.item__value">гор. Ярославль</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Адрес:</span>
              <span :class="$style.item__value">{{ item.estate.address }}</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Район:</span>
              <span :class="$style.item__value">Красноперекопский</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Тип:</span>
              <span :class="$style.item__value">новостройка</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Материал:</span>
              <span :class="$style.item__value">деревянный</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Комнат:</span>
              <span :class="$style.item__value">2</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Этаж:</span>
              <span :class="$style.item__value">8 / 11</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Общая площадь:</span>
              <span :class="$style.item__value">90.2 м²</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Жилая площадь:</span>
              <span :class="$style.item__value">80 м²</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Площадь кухни:</span>
              <span :class="$style.item__value">10 м²</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Отделка:</span>
              <span :class="$style.item__value">от застройщика</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Санузел:</span>
              <span :class="$style.item__value">совмещенный</span>
            </li>
            <li :class="$style.list__item">
              <span :class="$style.item__title">Балкон:</span>
              <span :class="$style.item__value">есть</span>
            </li>
          </ul>
        </aside>
        <div :class="$style.content__carousel">
          <div :class="$style.carousel__thumbnails">
            <div :class="$style.thumbnails__item" v-for="thumbnail in item.thumbs" :style="{ 'background-image': 'url(' + thumbnail + ')' }"></div>
          </div>
          <div :class="[$style.carousel__menu, !carouselMenuActive || $style.__active]">
            <div :class="$style.menu__switcher" @click="carouselMenuActive=!carouselMenuActive"></div>
            <div :class="$style.menu__item" @click="item.favorites=!item.favorites" v-show="carouselMenuActive">
              <div :class="$style.item__top">
                <icon :class="$style.top__icon" name="star" v-if="item.favorites"></icon>
                <icon :class="$style.top__icon" name="star-o" v-else></icon>
                <span :class="$style.top__text">241</span>
              </div>
              <span :class="$style.item__title">Избранное</span>
            </div>
            <div :class="$style.menu__item" v-show="carouselMenuActive">
              <div :class="$style.item__top">
                <icon :class="$style.top__icon" name="comments-o"></icon>
                <span :class="$style.top__text">87</span>
              </div>
              <span :class="$style.item__title">Обсудить</span>
            </div>
            <div :class="$style.menu__item" v-show="carouselMenuActive">
              <div :class="$style.item__top">
                <icon :class="$style.top__icon" name="map-o"></icon>
              </div>
              <span :class="$style.item__title">Карта</span>
            </div>
          </div>
          <div :class="$style.carousel__controls">
            <span :class="$style.controls__fullscreen"></span>
            <span :class="$style.controls__prev"></span>
            <span :class="$style.controls__next"></span>
          </div>
          <img :src="item.image" alt="" :class="$style.carousel__slide">
        </div>
      </div>
    <div :class="$style.main__description">
      Сергей, оно зависит от количества текста. Больше текста - больше места. Или Вы не это имели ввиду? Много-много текста, оооочень много текста. Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.Много-много текста, оооочень много текста.
    </div>
    <div :class="$style.main__h_ad"><img src="/static/ad_2.gif" alt="" ></div>
    <app-ad-sidebar :class="$style.main__ad"></app-ad-sidebar>
    </div>
  </div>
</template>

<style>
  .slide-content-enter-active {
    transition: bottom 1s ease-in-out, opacity .9s ease-in-out;
  }
  .slide-content-leave-active {
    transition: bottom .5s ease-in-out, opacity .45s ease-in-out;
  }
  .slide-content-leave, .slide-content-enter-to { bottom: 0; opacity: 1; }
  .slide-content-enter, .slide-content-leave-to { bottom: -768px; opacity: 0 }
</style>

<style lang="scss" module>
  @import "../assets/style.scss";
  /* offer */
    .offer {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* offer__main */
    .offer__main {
      position: relative;
    }

  /* offer__bar */
    .offer__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* offer__toolbar */
    .offer__toolbar { margin: 25px 0 }

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
  
  /* main__description */
    .main__description {
      width: 100%;
      margin-top: 20px;
      padding-right: 300px;
      overflow: hidden;
      font-size: 17px;
    }
  
  /* main__ad */
    .main__h_ad {
      text-align: center;
      margin-top: 20px;
      padding-right: 300px;
    }

  /* content__background */
    .content__background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(50px);
      opacity: .75;
    }

  /* content__details */

    .content__details {
      position: absolute;
      width: 280px;
      height: 100%;
      background-color: #fff;
      opacity: .9;
    }

    .details__author {
      position: relative;
      padding: 20px 15px 5px;
      &:after {
        @include clearfix;
        display: block;
        height: 1px;
        padding-top: 15px;
        background: url(/static/bg-border-dotted-horizontal.png) 0 100% repeat-x;
      }
    }

    .author__photo {
      display: block;
      max-width: 100%;
      width: 25%;
      height: auto;
      border-radius: 50%;
      padding-right: 5px;
      float: left;
    }

    .author__meta {
      float: left;
      width: 75%;
      padding: 2.5px 0;
    }

    .meta__name {
      display: block;
      color: #5a7391;
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 7px;
      text-decoration: none;
    }
    .meta__company {
      display: block;
      text-transform: uppercase;
      color: #5b9bd1;
      font-size: 12px;
      font-weight: 400;
      text-decoration: none;
    }

    .details__list {
      margin: 0;
      padding: 0;
      list-style: none;
      border: 7.5px solid #fff;
      > .list__item {
        border-bottom: 1px solid #f0f4f7;
        display: block;
        padding: 7.5px;
        cursor: default;
        transition: background-color .1s ease-in-out;
        &:hover { background-color: #eef1f5 }
        &:after { @include clearfix }
        > .item__title, .item__value { display: block; width: 50%; float: left; color: #5a7391; }
        > .item__value { text-align: right; color: #93a3b5; font-style: italic; }
      }
    }
  
  /* content__carousel */
    .content__carousel {
      position: relative;
      margin-left: 280px;
      overflow: hidden;
      width: auto;
    }

    .carousel__thumbnails {
      position: absolute;
      left: 20px;
      width: 100px;
      padding: 10px;
      height: 100%;
      z-index: 1;
      background-color: #fff;
      .thumbnails__item {
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: transform .1s ease-in-out;
        &:hover { transform:scale(1.1) }
      }
    }
    .carousel__slide {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }

  /* carousel__menu */
    .carousel__menu {
      position: absolute;
      background-color: #fff;
      opacity: .9;
      padding: 10px 0;
      width: 100px;
      height: 100%;
      left: -80px;
      z-index: 1;
      transition: left .3s ease-in-out;
      border-left: 1px solid #f0f4f7;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      &.__active { left: 0 }
      > .menu__switcher:after {
        content: "\e602";
        font-family: "Icons";
        font-size: 18px;
        position: absolute;
        transition: background-color .2s ease-in-out;
        top: 40%;
        right: 1px;
        cursor: pointer;
        color: #93a3b5;
        padding: 15px 0;
        width: 19px;
      }
      > .menu__switcher:hover:after { background-color: #eef1f5 }
      > .menu__item {
        text-align: center;
        cursor: pointer;
        padding: 20px 15px;
        transition: background-color .2s ease-in-out;
        &:hover { background-color: #eef1f5 }
        > .item__top {
          display: block;
          margin: 0 auto;
          padding-bottom: 6px;
          > .top__icon {
            display: inline-block;
            color: #364150;
            width: 24px;
            height: 24px;
            margin-right: 3px;
            vertical-align: middle;
          }
          > .top__text {
            display: inline-block;
            text-transform: uppercase;
            color: #2b3643;
            font-size: 13px;
            font-weight: 600;
            vertical-align: bottom;
          }
        }
        > .item__title {
          display: block;
          padding-top: 5px;
          text-transform: uppercase;
          color: #2b3643;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  
  /* carousel__controls */
    .carousel__controls {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    .controls__fullscreen, .controls__prev, .controls__next {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      padding: 10px 15px;
      text-align: center;
      background-color: rgba(255, 255, 255, .25);
      &:after {
        content: "\e091";
        font-family: "Icons";
        font-size: 22px;
        color: #fff;
        transition: left .2s ease-in-out;
      }
    }
    .controls__next {
      top: 45%;
      &:after {
        content: "\e606";
      }
    }
    .controls__prev {
      top: 45%;
      left: 140px;
      right: auto;
      &:after {
        content: "\e605";
      }
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
    .offer {
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
    name: 'offer',
    props: ['auth'],
    components: { AppLoader, AppOnlineStatus, AppAdSidebar, Icon },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        carouselMenuActive: false,
        item:
          {
            image: '/static/apartments/7.jpg',
            thumbs: ['/static/apartments/1.jpg', '/static/apartments/2.jpg', '/static/apartments/3.jpg', '/static/apartments/5.jpg', '/static/apartments/6.jpg' ],
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