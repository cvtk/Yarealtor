<template>
  <div :class="$style.companies">
    <div :class="$style.companies__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
        <span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">Компании</li>
      </ul>
      <app-layout-switcher v-model="currentLayout"></app-layout-switcher>
    </div>
    <div :class="$style.companies__toolbar">
      <h1 :class="$style.toolbar__title">Компании<span :class="$style._small">организации портала</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    
    <ul :class="$style.companies__grid" v-if="currentLayout === 'grid'">
      <li :class="$style.grid__item" v-for="company in companies">
        <div :class="$style.item_wrapper">
          <div :class="$style.image_wrapper">
            <div :class="$style.item__image" :style="{ 'background-image': 'url(' + company.image + ')' }"></div>
            <div :class="$style.item__links">
              <app-input type="button" :class="$style.links__more">Узнать больше</app-input>
            </div>
          </div>
          <h3 :class="$style.item__name">{{ company.name }}</h3>
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
      background-color: #e7505a;
      border-color: #e7505a;
      text-transform: uppercase;
      font-weight: 300;
      transition: background-color .2s ease-in-out,
                  border-color .2s ease-in-out;
      &:hover {
        background-color: #e12330;
        border-color: #dc1e2b;
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
    .companies__toolbar { margin: 25px 0 }

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
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
  import AppLayoutSwitcher from './modules/layout-switcher.vue';

  export default {
    name: 'companies',
    props: ['auth'],
    components: { AppLoader, AppInput, AppLayoutSwitcher },
    data() {
      return {
        dataReady: false,
        currentLayout: 'grid',
        companies: [
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          },
          {
            name: 'ООО "Рога и копыта"',
            slogan: 'Вперед и вверх',
            image: '/static/company_01.jpg'
          }
        ]
      }
    },
    created() {
      this.dataReady = true;
    }
  }
</script>