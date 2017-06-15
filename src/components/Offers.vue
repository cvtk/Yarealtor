<template>
  <div :class="$style.offers">
    <div :class="$style.offers__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Компании</li><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">ООО "КакоетоНазвание"</li><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">Предложения</li>
      </ul>
      <button :class="$style.bar__actions">Действия</button>
    </div>
    <h1 :class="$style.offers__title">Предложения<span :class="$style._small">актуальные объекты</span></h1>
    <div :class="$style.wrapper">

      <transition name="filter" appear>
        <aside :class="$style.offers__filter">
          <h2 :class="$style.filter__title">Фильтр</h2>
        </aside>
      </transition>

      <div :class="$style.offers__content" v-if="dataReady">
<!--         <ul :class="$style.content__grid">
          <li :class="$style.grid__item">
            <div :class="$style.wrapper">
              <div :class="$style.item__thumb">
                <div :class="$style.thumb__background" style="background-image: url(/static/apartments/1.jpg)"></div>
                <img src="/static/apartments/1.jpg" alt="Квартира 2" :class="$style.thumb__image">
              </div>
              <div :class="$style.item__content">
                <div :class="$style.wrapper">
                  <h3 :class="$style.content__title">3-к квартира, 87 м², 7/13 эт.</h3>
                  <span :class="$style.content__price">10 407 000 руб.</span>
                </div>
                <div :class="$style.wrapper">
                  <div :class="$style.content__meta">
                    <a href="#" :class="$style.meta__author">Сергей Иванов</a> (<a href="#" :class="$style.meta__company">ООО "Длинное название компании"</a>)
                  </div>
                  <span :class="$style.content__date">Сегодня, 14:37</span>
                </div>
                <div :class="$style.content__description">Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!</div>
              </div>
            </div>
            <div :class="$style.item__toolbar">
              <span :class="$style.toolbar__item">223</span>
              <span :class="$style.toolbar__item">45</span>
            </div>
          </li>
        </ul> -->
        <app-content-grid :data="tmpHomes"></app-content-grid>
      </div>
      <app-loader v-else></app-loader>

      <transition name="ad" appear>
        <aside :class="$style.offers__ad">
          <h2 :class="$style.ad__title">Наши партнеры</h2>
          <div :class="$style.ad__content"></div>
        </aside>
      </transition>

    </div>
  </div>
</template>

<style>
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
  .offers {
    position: relative;
    height: 100%;
    padding: 20px;
    overflow: hidden;
  }
  .offers__filter {
    position: absolute;
    top: 0;
    width: 280px;
    height: 100%;
    background-color: #fff;
    border: 1px solid #c2cad8;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
    padding: 15px 20px;
    > .filter__title {
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
  }

  .wrapper {
    position: relative;
    height: 100%;
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .offers__content {
    position: relative;
    margin: 0 300px;
    margin-bottom: 25px;
  }

  .content__grid {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
    padding: 15px;
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    > .grid__item {
      display: block;
      position: relative;
       .item__thumb {
        position: relative;
        float: left;
        overflow: hidden;
        border-radius: 3px;
        width: 33.333333%;
        height: auto;
        min-height: 240px;
        > .thumb__background {
          position: absolute;
          width: 100%;
          height: 100%;
          background: center no-repeat;
          background-size: cover;
          -webkit-filter: blur(13px);
          filter: blur(13px);
          opacity: .4;
        }
        > .thumb__image {
          position:absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 100%;
          height: auto;
          vertical-align: middle;
          max-width: 100%;
        }
      }
       .item__content {
        width: 66.666667%;
        float: left;
        padding-left: 15px;
         .content__title {
          width: 66.666667%;
          float: left;
          color: #5a7391;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          margin-bottom: 5px;
        }
         .content__price {
          width: 33.333333%;
          float: right;
          text-align: right;
          color: #32c5d2;
          font-size: 20px;
          font-weight: 300;
          margin: 0;
          margin-bottom: 5px;
        }
         .content__meta {
          width: 66.666667%;
          float: left;
          margin-bottom: 10px;
          > .meta__author, .meta__company {
            display: inline-block;
            color: #5b9bd1;
            transition: color .2s ease-in-out;
            text-decoration: none;
            &:hover { color: #578ebe }
          }
        }
         .content__date {
          width: 33.333333%;
          float: right;
          text-align: right;
          margin-bottom: 10px;
        }
        > .content__description {
          width: 100%;
          margin-bottom: 7px;
        }
      }
       .item__toolbar {
        position: relative;
        margin-top: 15px;
        &:before {
          content: "";
          display: block;
          margin-right: -15px;
          margin-left: -15px;
          border-bottom: 1px solid #eef1f5;
        }
        > .toolbar__item {
          display: inline-block;
          padding-top: 15px;
        }
      }
    }
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
    > .bar__actions {
      margin: 6px 0;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      touch-action: manipulation;
      text-align: center;
      cursor: pointer;
      display: inline-block;
      float: right;
      vertical-align: middle;
      border: 1px solid #32c5d2;
      outline: none;
      color: #32c5d2;
      background-color: #fff;
      user-select: none;
      transition: all .2s ease-in-out;
      &:after {
        content: "\e604";
        font-family: "Icons";
        font-size: 8px;
        margin-left: 5px;
        vertical-align: middle;
      }
      &:hover {
        border-color: #32c5d2;
        color: #FFF;
        background-color: #32c5d2;
      }
    }
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    @media (max-width: $bp-small) {
      > .bar__breadcrumbs {
        > .breadcrumbs__item:first-child { display: none; }
      }
    }
  }
  .offers__title {
    margin: 25px 0;
    font-size: 24px;
    color: #666;
    padding: 0;
    letter-spacing: -1px;
    font-weight: 300;
    > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
  }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppContentGrid from './modules/content-grid.vue';

  export default {
    name: 'offers',
    props: ['auth'],
    components: { AppLoader, AppContentGrid },
    data() {
      return {
        dataReady: false,
        tmpHomes: [
          {
            image: '/static/apartments/1.jpg',
            rooms: 3,
            price: 1000000,
            date: 1497548680,
            area: 87.2,
            floor: 7,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Строителей, 7', city: 'Ярославль', floors: 13 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/2.jpg',
            rooms: 3,
            price: 1000000,
            date: 1497548680,
            area: 87.2,
            floor: 7,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Строителей, 7', city: 'Ярославль', floors: 13 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/3.jpg',
            rooms: 3,
            price: 1000000,
            date: 1497548680,
            area: 87.2,
            floor: 7,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Строителей, 7', city: 'Ярославль', floors: 13 },
            description: 'Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!'
          },
          {
            image: '/static/apartments/4.jpg',
            rooms: 3,
            price: 1000000,
            date: 1497548680,
            area: 87.2,
            floor: 7,
            author: { name: 'Иванов Сергей', page: 'ivanov', company: 'ООО "Длинное название компании"' },
            estate: { address: 'ул. Строителей, 7', city: 'Ярославль', floors: 13 },
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