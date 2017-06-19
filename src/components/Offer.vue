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
      <div :class="$style.toolbar__actions">

      </div>
    </div>
    
    <div :class="$style.wrapper" v-if="dataReady">
      <transition name="slide-content" appear>
        <div :class="$style.wrapper_main">
          <aside :class="$style.offer__details">

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
                <span :class="$style.item__value">{{ item.price }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Населенный пункт:</span>
                <span :class="$style.item__value">гор. Ярославль</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Адрес:</span>
                <span :class="$style.item__value">ул. Красный молдаских партизан, 46 корп. 2</span>
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
            </ul>
          </aside>
          <div :class="$style.offer__content">
            <div :class="$style.content__background" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
            <div :class="$style.content__image_wrapper">
              <img :class="$style.images__item" :src="item.image">
            </div>
          </div>
        </div>
      </transition>
      <aside :class="$style.offer__ad">
        <h2 :class="$style.ad__title">Наши партнеры</h2>
        <div :class="$style.ad__content">
          <img src="/static/ad_1.gif" alt="" >
        </div>
      </aside>
    </div>
    <app-loader v-else></app-loader>
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

  .wrapper {
    position: relative;
    height: 100%;
    &:after { @include clearfix }
  }

  .wrapper_main {
    position: relative;
    margin-right: 300px;
    overflow: hidden;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  
  .offer {
    position: relative;
    height: 100%;
    padding: 20px;
  }

  .offer__content {
    position: relative;
    margin-left: 280px;
    &:after { @include clearfix }
  }

  .offer__details {
    position: relative;
    float: left;
    width: 280px;
    overflow: hidden;
    background-color: #fff;
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


  .content__background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(30px);
    opacity: .8;
  }

  .content__image_wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    padding-top: 67.666667%;
    > .images__item {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }

  .offer__ad {
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
  .offer__bar {
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

    &:after { @include clearfix }

    @media (max-width: $bp-small) {
      > .bar__breadcrumbs {
        > .breadcrumbs__item:first-child { display: none; }
      }
    }
  }
  .offer__toolbar {
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

  .offer {
    @media (max-width: $bp-medium) {
      .offer__ad { display: none }
      .offer__content { margin-right: 0 }
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
  import AppOnlineStatus from './modules/online-status.vue';

  export default {
    name: 'offer',
    props: ['auth'],
    components: { AppLoader, AppOnlineStatus },
    data() {
      return {
        dataReady: false,
        item:
          {
            image: '/static/apartments/7.jpg',
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