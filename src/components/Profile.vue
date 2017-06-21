<template>
  <div :class="$style.content" v-if="dataReady">
    <div :class="$style.content__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Компании</li><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">ООО "КакоетоНазвание"</li><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">{{ user.name }}</li>
      </ul>
      <button :class="$style.bar__actions">Действия</button>
    </div>
    <h1 :class="$style.content__title">{{ user.name }}<span :class="$style._small">Личная страница</span></h1>
    <div :class="$style.content__profile">
      <aside :class="$style.profile__sidebar">
        <img :class="$style.sidebar__img" :src="user.photo">
        <div :class="$style.sidebar__user_title">
          <div :class="$style.user_title__name">{{ user.name }}<app-online-status :online="true"></app-online-status></div>
          <div :class="$style.user_title__company">ООО "КакаяКомпания"</div>
        </div>
        <!-- TODO: rewrite class -->
        <ul :class="$style.sidebar__user_menu">
          <li :class="{ [$style.user_menu__item]:true, [$style._active]:currentTab === 'profile'}" @click="currentTab = 'profile'">Информация</li>
          <li :class="{ [$style.user_menu__item]:true, [$style._settings]:true, [$style._active]: currentTab === 'settings' }" @click="currentTab = 'settings'">Настройки</li>
        </ul>
      </aside>
      <div :class="$style.profile__data" v-if="currentTab === 'profile'">
        <div :class="$style.data__bar">
          <h2 :class="$style.bar__title">Профиль</h2>
        </div>
      </div>
      <div :class="$style.profile__data" v-if="currentTab === 'settings'">
        <div :class="$style.data__bar">
          <h2 :class="$style.bar__title">Настройки</h2>
          <ul :class="$style.bar__nav_tabs">
            <li :class="{ [$style.nav_tabs__item]:true, [$style._active]:settingsTab === 'main'}" @click="settingsTab = 'main'">Общая информация</li>
            <li :class="{ [$style.nav_tabs__item]:true, [$style._active]:settingsTab === 'bio'}" @click="settingsTab = 'bio'">Личные данные</li>
            <li :class="{ [$style.nav_tabs__item]:true, [$style._active]:settingsTab === 'avatar'}" @click="settingsTab = 'avatar'">Фото профиля</li>
            <li :class="{ [$style.nav_tabs__item]:true, [$style._active]:settingsTab === 'change-password'}" @click="settingsTab = 'change-password'">Смена пароля</li>
          </ul>
        </div>
        <div :class="$style.data__content" v-show="settingsTab === 'main'">
          <app-input type="name" label="Ваше имя" :value="user.name" />
          <app-input type="name" label="Должность" :value="user.position" />
          <app-input type="page" label="Страница" :value="user.page" />
          <app-input type="tel" label="Рабочий телефон" :value="user.phone" />
          <app-input type="tel" label="Мобильный телефон" :value="user.mobile" />
        </div>
        <div :class="$style.data__content" v-show="settingsTab === 'bio'">

        </div>
      </div>
      <app-ad-sidebar></app-ad-sidebar>
    </div>
  </div>
  <app-loader v-else></app-loader>
</template>

<style lang="scss" module>
  @import "../assets/style.scss";
  .content {
    position: relative;
    padding: 20px; 
  }

  .content__bar {
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

  .content__title {
    margin: 25px 0;
    font-size: 24px;
    color: #666;
    padding: 0;
    letter-spacing: -1px;
    font-weight: 300;
    > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
  }

  .content__profile {
    position: relative;
    &:after { content: ""; display: table; clear: both; }
  }

  .profile__sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    background-color: #fff;
    margin-right: 20px;
    padding: 30px 0 0;
    > .sidebar__img {
      display: block;
      max-width: 100%;
      margin: 0 auto;
      width: 50%;
      height: 50%;
      border-radius: 50%;
    }
    > .sidebar__user_title {
      text-align: center;
      margin-top: 20px;
      > .user_title__name {
        color: #5a7391;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 7px;
      }
      > .user_title__company {
        text-transform: uppercase;
        color: #5b9bd1;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 7px;
      }
    }
    > .sidebar__user_menu {
      margin: 30px 0 0;
      padding: 0 0 20px;
      list-style: none;
      > .user_menu__item {
        border-bottom: 1px solid #f0f4f7;
        display: block;
        color: #93a3b5;
        font-size: 16px;
        font-weight: 400;
        padding: 10px 15px;
        cursor: pointer;
        transition: background-color .2s ease-in-out, color .2s ease-in-out;
        &._active {
          color: #5b9bd1;
          background-color: #f6f9fb;
          border-left: 2px solid #5b9bd1;
          margin-left: -2px;
        }
        &:hover {
          background-color: #f6f9fb;
          color: #5b9bd1;
        }
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

  .profile__ad {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 500px;
    background-color: #fff;
    margin-left: 20px;
    padding: 12px 20px 15px;
    > .ad__title {
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

  .profile__data {
    background-color: #fff;
    padding: 12px 20px 15px;
    margin-left: 300px;
    margin-right: 300px;
    margin-bottom: 25px;
    > .data__bar {
      min-height: 48px;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
      &:after { content: ""; display: table; clear: both; }
      > .bar__title {
        color: #578ebe;
        padding: 12px 0;
        float: left;
        display: inline-block;
        font-size: 15px;
        line-height: 18px;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: .25px;
      }
      > .bar__nav_tabs {
        margin: 0;
        float: right;
        display: inline-block;
        padding: 0;
        list-style: none;
        &:after {
          content: "";
          display: table;
          clear: both;
        }
        > .nav_tabs__item {
          padding: 12px 13px 13px;
          font-size: 13px;

          border-bottom: 4px solid transparent;
          float: left;
          cursor: pointer;
          transition: border-color .1s ease-in-out;
          &._active, &:hover { border-color: #36c6d3; }
        }
      }
    }
    > .data__content {
      padding-top: 8px;
      > .content__input_group {
        position: relative;
        margin-bottom: 15px;
        > .input_group__loader {
          position: absolute;
          width: 50px;
          height: 34px;
          right: 0;
          img { width: 50% }
        }
        > .input_group__label {
          margin-top: 1px;
          margin-bottom: 5px;
          display: inline-block;
          cursor: default;
        }
        > .input_group__text {
          outline: 0;
          width: 100%;
          height: 34px;
          padding: 6px 12px;
          color: #555;
          background-color: #fff;
          border: 1px solid #c2cad8;
          &::-webkit-input-placeholder { color: #93a3b5 }
          &::-moz-placeholder { color: #93a3b5 }
          &:-ms-input-placeholder { color: #93a3b5 }
          &:-moz-placeholder { color: #93a3b5 }
          transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
          &:focus {
            border-color: #93a1bb;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
          }
        }
      }
    }
  }
    
</style>

<script>
  import firebase from '../firebase.js';
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppOnlineStatus from './modules/online-status.vue';

  const usersRef = firebase.database().ref('users');

  export default {
    name: 'profile',
    props: ['auth'],
    components: { AppLoader, AppInput, AppOnlineStatus, AppAdSidebar },
    data() {
      return { dataReady: false, currentTab: 'profile', settingsTab: 'main', user: ''  }
    },
    created() {
      usersRef.orderByChild('page').equalTo(this.$route.params.page).on('value', (data) => {
        if ( data.exists() ) {
          data.forEach( (user) => this.user = user.val() );
        }
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.page } });
        }
        this.dataReady = true
      })
    },
    methods: {
      updProfileField(el) {
        usersRef.child(this.user['.key']).update({[el.name]: el.value}, () => {
          el.value = '';
          el.blur();
        });
      }
    }
  }
</script>