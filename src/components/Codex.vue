<template>
  <div :class="$style.codex">
    <div :class="$style.codex__bar">
      <ul :class="$style.bar__breadcrumbs">Главная<span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">Кодекс риэлтора</li>
      </ul>
    </div>
    <div :class="$style.codex__toolbar">
      <h1 :class="$style.toolbar__title">Кодекс риэлтора<span :class="$style._small">важно знать и пользоваться</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    <div :class="$style.codex__content">
      Тут кодекс риэлтора. Его нужно прислать.
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/style.scss";

  .codex {
    position: relative;
    height: 100%;
    padding: 20px;
  }
  .codex__content {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    min-height: 500px;
    padding: 15px;
  }
  .codex__toolbar {
    margin: 25px 0;

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small {
        font-size: 14px;
        letter-spacing: 0;
        text-transform: lowercase;
        margin-left: 5px;
      }
    }
  }

  .codex__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
    &:after { @include clearfix }

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
  }
    
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import firebase from '../firebase.js';

  const companiesRef = firebase.database().ref('companies');
  const usersRef = firebase.database().ref('users');

  export default {
    name: 'codex',
    props: ['auth'],
    components: { AppLoader, AppInput }
  }
</script>