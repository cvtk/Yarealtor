<template>
  <div :class="$style.app" v-if="$route.name === 'login' || $route.name === 'registration' || $route.name === 'recovery'">
    <router-view></router-view>
  </div>
  <div :class="{ [$style.app]:true, [$style._toggled]: isToggled }" v-else>
    <div :class="$style.snackbar">
      <ui-snackbar-container
        ref="notify"
        position="right"
        :queue-snackbars="true">
      </ui-snackbar-container>
    </div>
    <header :class="$style.app__header">
      <div :class="$style.header__logo">
        <img src="/static/logo.png" alt="Логотип" :class="$style.logo__pic">
        <button :class="$style.menu__toggler" @click.prevent="isToggled = !isToggled"></button>
      </div>
      <div :class="$style.header__menu">
        <div :class="[ $style.menu__ghost_mode, !ghostMode || $style._active ]" @click="ghostMode=!ghostMode" title="Специальный режим"></div>
        <div :class="$style.menu__notification">
          <span :class="$style.notification__badge">7</span>
        </div>
        <div :class="$style.menu__user" v-if="dataReady">
          <img :src="user.photo" alt="Фото" :class="$style.user__pic">
          <span :class="$style.user__name">{{ user.name }} {{ user.surname }}</span>
          <ul :class="$style.user__dropdown">
            <router-link tag="li" :to="{ name: 'user', params: { page: user.page } }" :class="$style.dropdown__item">
              <span :class="[$style.item__icon, $style._profile]"></span>
              <span :class="$style.item__title">Профиль</span>
            </router-link>
            <router-link tag="li" :to="{ name: 'company', params: { page: user.company.page } }" :class="$style.dropdown__item">
              <span :class="[$style.item__icon, $style._my_company]"></span>
              <span :class="$style.item__title">Моя компания</span>
            </router-link>
            <li :class="$style.dropdown__divider"></li>
            <li :class="$style.dropdown__item" @click="signOut">
              <span :class="[$style.item__icon, $style._sign_out]"></span>
              <span :class="$style.item__title">Выйти</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
    
    <aside :class="[$style.app__sidebar]">
      <form :class="$style.sidebar__search">
        <input :class="$style.search__input" type="text" placeholder="Поиск...">
        <button :class="$style.search__btn"></button>
      </form>
      <ul :class="$style.sidebar__menu">
        <router-link tag="li" :to="{ name: 'root'}" :class="$style.menu__item" :active-class="$style._active" exact :title="isToggled && 'Главная'">
          <span :class="[$style.item__icon, $style._main]"></span>
          <span :class="$style.item__title">Главная</span>
        </router-link>
        <router-link tag="li" :to="{ name: 'polls'}" :class="$style.menu__item" :active-class="$style._active" exact :title="isToggled && 'Соц. опросы'">
          <span :class="[$style.item__icon, $style._polls]"></span>
          <span :class="$style.item__title">Соц. опросы</span>
        </router-link>
        <router-link tag="li" :to="{ name: 'news'}" :class="$style.menu__item" :active-class="$style._active" exact :title="isToggled && 'Новости'">
          <span :class="[$style.item__icon, $style._news]"></span>
          <span :class="$style.item__title">Новости</span>
        </router-link>
        <router-link tag="li" :to="{ name: 'offers'}" :class="$style.menu__item" :active-class="$style._active" :title="isToggled && 'Предложения'">
          <span :class="[$style.item__icon, $style._offers]"></span>
          <span :class="$style.item__title">Предложения</span>
        </router-link>
        <router-link tag="li" :to="{ name: 'requests'}" :class="$style.menu__item" :active-class="$style._active" :title="isToggled && 'Спрос'">
          <span :class="[$style.item__icon, $style._requests]"></span>
          <span :class="$style.item__title">Спрос</span>
        </router-link>
        <router-link tag="li" :to="{ name: 'companies'}" :class="$style.menu__item" :active-class="$style._active" :title="isToggled && 'Компании'">
          <span :class="[$style.item__icon, $style._companies]"></span>
          <span :class="$style.item__title">Компании</span>
        </router-link>
        <router-link tag="li" :to="{ name: 'yasr'}" :class="$style.menu__item" :active-class="$style._active" :title="isToggled && 'А ЯСР'">
          <span :class="[$style.item__icon, $style._yasr]"></span>
          <span :class="$style.item__title">А ЯСР</span>
        </router-link>
      </ul>
      <ul :class="$style.sidebar__panel">
        <router-link tag="li" :to="{ name: 'codex' }" :class="[$style.panel__item, $style._rules]" title="Кодекс риэлтора"></router-link>
        <router-link tag="li" :to="{ name: 'rules'}" :class="[$style.panel__item, $style._help]" title="Правила пользования порталом"></router-link>
        <router-link tag="li" :to="{ name: 'root'}" :class="[$style.panel__item, $style._feedback]" title="Сообщение администратору"></router-link>
      </ul>
    </aside>
    <main :class="$style.app__content">
      <router-view :auth="auth" :user="user" v-if="dataReady" :key="$route.fullPath"></router-view>
      <app-loader v-else></app-loader>
    </main>
  </div>
</template>


<style lang="scss" module>
  @import "./assets/style.scss";

  @font-face {
    font-family: "Icons";
    src: url("simple-line-icons/fonts/Simple-Line-Icons.eot?v=2.4.0");
    src: url('simple-line-icons/fonts/Simple-Line-Icons.eot?v=2.4.0#iefix') format('embedded-opentype'),
        url('simple-line-icons/fonts/Simple-Line-Icons.woff2?v=2.4.0') format('woff2'),
        url('simple-line-icons/fonts/Simple-Line-Icons.ttf?v=2.4.0') format('truetype'),
        url('simple-line-icons/fonts/Simple-Line-Icons.woff?v=2.4.0') format('woff'),
        url('simple-line-icons/fonts/Simple-Line-Icons.svg?v=2.4.0#simple-line-icons') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  .app {
    @import "normalize.css";
    height: 100%;
    &._toggled {
      .header__logo { padding: 0 12px; width: 45px }
      .logo__pic { display: none }
      .app__content { margin-left: 45px }
      .app__sidebar { width: 45px }
      .sidebar__search { border: none; margin: 20px 14.5px; }
      .search__input { display: none }
      .search__btn { width: 100% }
      .menu__item {
        padding: 10px 13.5px 10px 9.5px; &:after { right: -4px }
        > .item__icon:before { margin-right: 0 }
        > .item__title { opacity: 0; visibility: hidden; }
      }
      .sidebar__panel {
        padding: 0;
        box-shadow: none;
        background-color: #364150;
        border-top: 1px solid #3d4957;
      }
      .panel__item {
        float: none;
        width: 100%;
      }
      @media (max-width: $bp-small) {
        .app__content { margin-left: 0 }
        .app__sidebar { width: 0; overflow: hidden; }
      }
    }
  }

  .snackbar {
    position: fixed;
    width: 100%;
    top: 115px;
    right: -10px;
    z-index: 9999;
  }

  .app__header {
    position: fixed;
    z-index: 8999;
    background-color: #2b3643;
    width: 100%;
    min-width: 320px;
    height: 50px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    > .header__logo {
      float: left;
      width: 235px;
      line-height: 50px;
      padding-left: 20px;
      padding-right: 20px;
      transition: width .2s ease-in-out;
      > .logo__pic {
        vertical-align: middle;
        cursor: pointer;
      }
    }
    > .header__menu {
      float: right;
      height: 50px;
      padding-left: 20px;
      padding-right: 20px;
      @media (max-width: $bp-small) { padding-left: 0 }

      > .menu__ghost_mode, .menu__notification, .menu__user {
        position: relative;
        float: left;
        cursor: pointer;
        min-width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        padding-left: 10px;
        padding-right: 8px;
        white-space: pre;
        color: #c6cfda;
        transition: background-color .2s ease-in-out;
        &:after {
          content: "\E604";
          font-family: "Icons";
          font-size: 9px;
          margin-left: 5px;
        }
        &:hover { background-color: #3f4f62;
          > .user__dropdown {
            visibility: visible;
            opacity: 1;
            top: 100%;
          }
        }
        > .user__pic {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          margin-right: 5px;
          vertical-align: middle;
        }
        > .user__name {}
        > .user__dropdown {
          visibility: hidden;
          text-align: left;
          opacity: 0;
          top: -9999px;
          transition: visibility 0s, opacity .2s linear, top 0s;
          position: absolute;
          right: 0;
          box-shadow: 5px 5px rgba(102,102,102,.1);
          width: 195px;
          background-color: #fff;
          margin: 0;
          margin-top: -1px;
          padding: 0;
          list-style: none;
          line-height: 0;
          &:after {
            position: absolute;
            top: -6px;
            right: 10px;
            display: block;
            border-right: 6px solid transparent;
            border-bottom: 6px solid #fff;
            border-left: 6px solid transparent;
            content: '';
          }
          > .dropdown__divider {
            background: #f1f3f6;
            height: 1px;
            margin: 9px 0;
            overflow: hidden;
          }
          > .dropdown__item {
            color: #555;
            padding: 8px 16px;
            line-height: 18px;
            transition: background-color .1s ease-in-out;
            &:hover { background-color: #f6f6f6 }
            > .item__icon:before {
              content: "";
              font-family: "Icons";
            }
            > ._profile:before { content: "\e005" }
            > ._my_company:before { content: "\e001" }
            > ._sign_out:before { content: "\e065" }
          }
        }
        @media (max-width: $bp-extra-small) {
          &:after { margin-left: 0 }
          > .user__pic { margin-right: 0 }
          > .user__name { display: none }
        }
      }
      > .menu__notification {
        &:hover:after { color: #c6cfda }
        &:after {
          position: relative;
          top: 2px;
          content: "\e027";
          font-size: 17px;
          margin-left: 0;
          color: #79869a;
          transition: color .2s ease-in-out;
        }
        > .notification__badge {
          display: inline-block;
          position: absolute;
          z-index: 1;
          top: 8px;
          left: 7px;
          font-weight: 300;
          font-size: 11px;
          padding: 4px 6px;
          height: 18px;
          border-radius: 50%;
          text-shadow: none;
          text-align: center;
          vertical-align: middle;
          min-width: 10px;
          line-height: 1;
          white-space: nowrap;
          background-color: #36c6d3;
          color: #fff;
          }
      }
      > .menu__ghost_mode {
        padding: 0 10px;
        &:hover:after { color: #c6cfda }
        &._active:after { color: #32c5d2 }
        &:after {
          content: "\e00e";
          font-size: 17px;
          color: #79869a;
          transition: color .2s ease-in-out;
          margin-left: 0;
        }
      }
    }
  }
  
  .menu__toggler {
    display: block;
    float: right;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    margin: 14.5px 0;
    padding: 0;
    line-height: 1;
    font-size: 0;
    &:hover:before { color: #a7b5c6 }
    &:before {
      content: "\e601";
      font-family: "Icons";
      font-size: 21px;
      color: #818e9e;
      transition: color .3s ease-in-out;
    }
  }
  .app__sidebar {
    position: fixed;
    z-index: 2;
    overflow: hidden;
    width: 235px;
    height: 100%;
    background-color: #364150;
    padding-top: 75px;
    padding-bottom: 75px;
    transition: width .2s ease-in-out;
  }
  .sidebar__search {
    margin: 20px;
    border-bottom: 1px solid #435060;
    height: 22px;
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
  .search__input {
    float: left;
    width: 90%;
    font-family: "Roboto", sans-serif;
    border: none;
    outline: none;
    background-color: transparent;
    color: #4e5d6f;
    font-weight: 300;
    &::-webkit-input-placeholder { color: #4e5d6f }
    &::-moz-placeholder { color: #4e5d6f }
    &:-ms-input-placeholder { color: #4e5d6f }
    &:-moz-placeholder { color: #4e5d6f }
  }
  .search__btn {
    float: right;
    width: 10%;
    cursor: pointer;
    font-size: 16px;
    color: #4e5d6f;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    &:hover:before { color: #f1f1f1; }
    &:before {
      content: "\e090";
      font-family: "Icons";
      transition: color .2s ease-in-out;
    }
  }
  .sidebar__menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .menu__item {
    position: relative;
    padding: 10px 20px 10px 16px;
    border-left: 4px solid transparent;
    color: #b4bcc8;
    cursor: pointer;
    white-space: pre;
    transition: background-color .2s ease-in-out, padding .2s ease-in-out;
    &:hover { background-color: #3a4656 }
    &._active {
      background-color: #3e4b5c;
      border-left: 4px solid #36c6d3;
      color: #f1f1f1;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 8px;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-right: 12px solid #eef1f5;
        line-height: 0;
        transition: right .2s ease-in-out;
      }
    }
    @media (max-width: $bp-small) { &:after { display: none } }
  }
  .item__icon {
    &:before {
    font-family: "Icons";
    margin-right: 7px;
    font-size: 16px;
    line-height: 14px;
    position: relative;
    top: 2px;
    }
    &._main:before { content: "\e041"; font-size: 17px }
    &._polls:before { content: "\e077" }
    &._news:before { content: "\e01c" }
    &._offers:before { content: "\e043" }
    &._requests:before { content: "\e04b" }
    &._companies:before { content: "\e001" }
    &._yasr:before { content: "\e088" }
  }
  .item__title {
    opacity: 1;
    visibility: visible;
    transition: opacity .1s ease-in-out, visibility .1s ease-in-out;
  }
  .sidebar__panel {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0 20px;
    background-color: #2b3643;
    box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.14), 0 -3px 1px -2px rgba(0, 0, 0, 0.2), 0 -1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  .panel__item {
    display: block;
    position: relative;
    float: left;
    width: 33.333333%;
    font-size: 16px;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    color: #c6cfda;
    text-align: center;
    &:hover:before { color: #36c6d3}
    &:before { font-family: "Icons"; transition: color .2s ease-in-out; }
    &._feedback:before { content: "\e076" }
    &._rules:before { content: "\e08b" }
    &._help:before { content: "\e05d" }
  }
  .app__content {
    position: relative;
    height: 100%;
    padding-top: 50px;
    margin-left: 235px;
    transition: margin-left .2s ease-in-out;
    @media (max-width: $bp-small) {
      margin-left: 0;
    }
  }
</style>

<script>
  import Vue from 'vue';
  import KeenUI from 'keen-ui';
  import 'keen-ui/src/bootstrap';
  import 'keen-ui/dist/keen-ui.css';

  Vue.use(KeenUI);
  
  import firebase from './firebase.js';
  import AppLoader from './components/app-loader.vue';

const usersRef = firebase.database().ref('users');
const companiesRef = firebase.database().ref('companies');

export default {
  name: 'app',
  components: { AppLoader },
  data() {
    return { isToggled: true, auth: false, user: false, dataReady: false, ghostMode: false }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((auth)=> {
      this.auth = auth;
      if ( !auth && this.$route.name !== 'login' && this.$route.name !== 'registration' ) {
        this.$router.push({ name: 'login', query: { redirect: this.$route.path} })
      }
      else if (auth) {
        usersRef.child(auth.uid).on('value', user => {
          this.user = user.val();
          companiesRef.child(this.user.company).on('value', company => {
            this.$set(this.user, 'company', company.val());
            this.dataReady = true;
          })
        })
      }
    });
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
    }
  }
}
</script>
