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
      <aside :class="$style.offer__details">
        <div :class="$style.details__background" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
        <img :class="$style.details__user_img" :src="item.author.photo">
        <div :class="$style.details__user_title">
          <router-link :class="$style.user_title__name" :to="{ name: 'user', params: { page: item.author.page } }">
            {{ item.author.name }}
            <app-online-status :online="true"></app-online-status>
          </router-link>
          <router-link :class="$style.user_title__company" :to="{ name: 'company', params: { page: item.author.page } }">
            {{ item.author.company }}
          </router-link>
        </div>
        <ul :class="$style.details__list">
          <li :class="$style.list__item">Цена</li>
          <li :class="$style.list__item">Комнат</li>
        </ul>
      </aside>
      <transition name="slide-content" appear> 
        <div :class="$style.offer__content">
          <div :class="$style.content__images">
            <img :class="$style.images__item" :src="item.image">
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
  .offer {
    position: relative;
    height: 100%;
    padding: 20px;
  }

  .offer__content {
    position: relative;
    margin-left: 216px;
    margin-right: 300px;
    margin-bottom: 25px;
    &:after { @include clearfix }
  }

  .offer__details {
    position: absolute;
    width: 196px;
    overflow: hidden;

    > .details__background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: right;
      filter: blur(50px);
      z-index: -1;
    }
    > .details__user_img {
      display: block;
      max-width: 100%;
      margin: 20px auto;
      width: 75%;
      height: 75%;
      border-radius: 50%;
    }
    > .details__user_title {
      text-align: center;
      background-color: #fff;
      padding: 10px 15px;
      > .user_title__name {
        display: block;
        color: #5a7391;
        font-size: 20px;
        font-weight: 300;
        margin-bottom: 7px;
        text-decoration: none;
      }
      > .user_title__company {
        text-transform: uppercase;
        color: #5b9bd1;
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 7px;
        text-decoration: none;
      }
    }
    > .details__list {
      margin: 0;
      padding: 20px 15px 20px;
      list-style: none;
      background-color: #fff;
      > .list__item {
        border-bottom: 1px solid #f0f4f7;
        display: block;
        color: #93a3b5;
        font-size: 16px;
        padding: 10px 0;
        &._settings:before { content: "\e09a" }
        &:before {
          content: "\e069";
          font-family: "Icons";
          margin-right: 8px;
          font-size: 16px;
        }
      }
    }
  }

  .content__images {
    position: relative;
    background-color: #fff;
    > .images__item {
      width: 100%;
      height: auto;
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
            image: '/static/apartments/1.jpg',
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