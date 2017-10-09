<template>
  <div :class="$style.request" v-if="dataReady">
    <ui-modal ref="reportModal" title="Жалоба на заявку">
      <app-report :link="'/requests/' + request.key" :author="user.key" @close="$refs.reportModal.close()"></app-report>
    </ui-modal>
    <ui-confirm
      confirm-button-icon="delete"
      confirm-button-text="Удалить"
      deny-button-text="Отмена"
      ref="deleteConfirm"
      title="Удалить заявку"
      type="danger"

      @confirm="remove"
    >Вы уверены, что хотите удалить эту заявку?
    </ui-confirm>
    <div :class="$style.request__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
        <router-link tag="li" :to="{ name: 'requests' }" :class="$style.breadcrumbs__item">Спрос</router-link >
        <span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">{{ title }}</li>
      </ul>
    </div>
    <div :class="$style.request__toolbar">
      <h1 :class="$style.toolbar__title">{{ title }}<span :class="$style._small">добавлено: {{ request.created | unixToDate }}</span></h1>
      <div :class="$style.toolbar__actions">
        <div :class="$style.actions">
          <ui-fab
            @click="report"
            icon="gavel"
            tooltip-position="top center"
            tooltip="Жалоба"
            size="small"
          ></ui-fab>
          <ui-fab
            @click="$router.push({ name: 'edit-request', params: { id: request.key } })"
            icon="edit"
            tooltip-position="top center"
            tooltip="Правка"
            size="small"
            :class="$style.uifab"
            v-if="isOwner || isModer || isAdmin"
          ></ui-fab>
          <ui-fab
            @click="showConfirm"
            icon="delete"
            tooltip-position="top center"
            tooltip="Удалить"
            size="small"
            :class="$style.uifab"
            v-if="isOwner || isModer || isAdmin"
          ></ui-fab>
        </div>
      </div>
    </div>
    
    <div :class="$style.request__main">
      <div :class="$style.main__content">
        <request-content :request="request" :model="mdl" :ghostMode="ghostMode" />
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
  /* request */
    .request {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* request__main */
    .request__main {
      position: relative;
    }

  /* request__bar */
    .request__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* request__toolbar */
    .request__toolbar {
      &:after { @include clearfix }
      margin: 25px 0 }

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
  
  /* main__content */
    .main__content {
      position: relative;
      margin-right: 300px;
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

    .toolbar__actions {
      float: right;
    }

    .actions {
      align-items: flex-end;
      display: flex;
      flex-wrap: wrap;
    }
    .uifab { margin-left: 10px; }

  /* responsive */
    .request {
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
  import firebase from '../firebase.js';
  import mdl from '../models/request.js';
  import AppLoader from './app-loader.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppFilters from './helpers/filters.js';
  import requestContent from './request/request-content.vue';
  import AppReport from './report/report.vue';

  const requestsRef = firebase.database().ref('requests');

  export default {
    name: 'request',
    props: ['auth', 'user', 'ghostMode'],
    components: { AppLoader, AppAdSidebar, requestContent, AppReport },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        mdl: {},
        request: {}
      }
    },
    computed: {
      isOwner() { return this.user.key === this.request.author },
      isModer() { return this.user.company === this.request.company && this.user.role === 5 },
      isAdmin() { return this.user.role === 1 },
      title() {
        let op = ['Ищу', 'Куплю', 'Сниму'][this.request.op.value],
            r = this.request;
        switch( this.request.object.value ) {
          case 1: return `${op}: ${r.rooms.map( e => e.value ).join(', ')}-к квартиру`;
          default: return `${op}: ${r.object.label.toLowerCase()}`;
        }
      },
    },
    created() {
      requestsRef.child(this.$route.params.id).once('value', request => {
        if ( request.exists() ) {
          this.request = request.val();
          let objectType = mdl.objectTypes()[this.request.object.value];
          this.mdl = mdl.model(['meta', 'general', objectType]);
          this.dataReady = true;
        }
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.id } });
        }
      });
    },
    methods: {
      remove() {
        requestsRef.child(this.request.key).remove()
          .then( () => {
            this.$parent.$refs.notify.createSnackbar({
              message: 'Заявка удалена',
            });
            this.$router.push({ name: 'requests'});
          })
          .catch( error => {
            this.$parent.$refs.notify.createSnackbar({
              message: `Ошибка сети: ${error.message}`,
            });
          })
      },
      report() {
        this.$refs.reportModal.open();
      },
      showConfirm() {
        this.$refs.deleteConfirm.open();
      },
    }
  }
</script>