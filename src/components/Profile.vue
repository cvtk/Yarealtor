<template>
  <div :class="$style.content__wrapper" v-if="dataReady">
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
          <div :class="$style.user_title__name">{{ user.name }}</div>
          <div :class="$style.user_title__company">ООО "КакаяКомпания"</div>
        </div>
        <!-- TODO: rewrite class -->
        <ul :class="$style.sidebar__user_menu">
          <li :class="{[$style.user_menu__item]: true, [$style._active]: currentTab === 'profile'}" @click="currentTab = 'profile'">Профиль</li>
          <li :class="{[$style.user_menu__item]:true, [$style._settings]:true, [$style._active]: currentTab === 'settings'}" @click="currentTab = 'settings'">Настройки</li>
        </ul>
      </aside>
      <div :class="$style.profile__account_settings">
        <div :class="$style.account_settings__wrapper">
          
        </div>
      </div>
    </div>
  </div>
  <app-loader v-else></app-loader>
</template>

<script>
import firebase from '../firebase.js';
import AppLoader from './app-loader.vue';

const usersRef = firebase.database().ref('users');

  export default {
    name: 'profile',
    props: ['auth'],
    components: { AppLoader },
    data() {
      return { dataReady: false, currentTab: 'profile' }
    },
    mounted() {
      this.$bindAsObject('user', usersRef.child(this.auth.uid), null, () => this.dataReady = true );
    }
  }
</script>

<style lang="scss" module>
  @import "../assets/style.scss";
  .content__wrapper { position: relative }
  .content__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -25px -20px 0;
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
    > .profile__sidebar {
      float: left;
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
            background-color: #fafcfd;
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
    > .profile__account_settings {
      overflow: hidden;
      > .account_settings__wrapper {
        width: 100%;
        height: 500px;
        background-color: #fff;
      } 
    }
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
</style>