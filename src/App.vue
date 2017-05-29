<template>
<div :class="{ [$style.app]:true, [$style._toggled]: isToggled }">
  <header :class="$style.app__header">
    <div :class="$style.header__logo">
      <img src="/static/logo.png" alt="Логотип" :class="$style.logo__pic">
      <button :class="$style.menu__toggler" @click.prevent="isToggled = !isToggled"></button>
    </div>
    <div :class="$style.header__menu">
      <div :class="$style.menu__user">
        <img src="/static/users/default-2.svg" alt="Фото" :class="$style.user__pic">
        <span :class="$style.user__name">Иван Петров</span>
      </div>
      <button :class="[$style.menu__toggler, $style._mobile]"></button>
    </div>
  </header>
  <aside :class="[$style.app__sidebar]">
    <form :class="$style.sidebar__search">
      <input :class="$style.search__input" type="text" placeholder="Поиск...">
      <button :class="$style.search__btn"></button>
    </form>
    <ul :class="$style.sidebar__menu">
      <router-link tag="li" :to="{ name: 'root'}" :class="$style.menu__item" :active-class="$style._active" exact>
        <span :class="[$style.item__icon, $style._news]"></span>
        <span :class="$style.item__title">Новости</span>
      </router-link>
      <router-link tag="li" :to="{ name: 'offers'}" :class="$style.menu__item" :active-class="$style._active">
        <span :class="[$style.item__icon, $style._offers]"></span>
        <span :class="$style.item__title">Предложения</span>
      </router-link>
      <router-link tag="li" :to="{ name: 'requests'}" :class="$style.menu__item" :active-class="$style._active">
        <span :class="[$style.item__icon, $style._requests]"></span>
        <span :class="$style.item__title">Спрос</span>
      </router-link>
      <router-link tag="li" :to="{ name: 'companies'}" :class="$style.menu__item" :active-class="$style._active">
        <span :class="[$style.item__icon, $style._companies]"></span>
        <span :class="$style.item__title">Компании</span>
      </router-link>
    </ul>
    <ul :class="$style.sidebar__panel">
      <router-link tag="li" :to="{ name: 'root'}" :class="[$style.panel__item, $style._rules]" title="Кодекс риелтора"></router-link>
      <router-link tag="li" :to="{ name: 'root'}" :class="[$style.panel__item, $style._help]" title="Правила пользования порталом"></router-link>
      <router-link tag="li" :to="{ name: 'root'}" :class="[$style.panel__item, $style._feedback]" title="Сообщение администратору"></router-link>
    </ul>
  </aside>
  <main :class="$style.app__content">
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      isToggled: false
    }
  }
}
</script>

<style lang="scss" module>
  $bp-small: 544px;
  $bp-medium: 768px;
  $bp-large: 992px;

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
      .app__content { margin-left: 45px }
      .app__sidebar { width: 45px }
      .sidebar__search { border: none; margin: 20px 14.5px; }
      .search__input { display: none }
      .search__btn { }
      .menu__item { padding: 10px 13.5px 10px 9.5px; &:after { right: -4px } }
      .item__icon:before { margin-right: 0 }
      .item__title {
        opacity: 0;
        visibility: hidden;
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
    }
  }
  .app__header {
    position: fixed;
    z-index: 1;
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
  }
  .header__logo {
    float: left;
    width: 235px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    @media (max-width: $bp-small) { width: 125px }
  }

  .logo__pic {
    vertical-align: middle;
    cursor: pointer;
  }

  .header__menu {
    float: right;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .menu__user {
    float: left;
    cursor: pointer;
    line-height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    white-space: pre;
    color: #c6cfda;
    transition: background-color .2s ease-in-out;
    &:hover { background-color: #3f4f62 }
    &:after {
      content: "\E604";
      font-family: "Icons";
      font-size: 9px;
    }
  }
  .user__pic {
    height: 30px;
    margin-right: 5px;
    vertical-align: middle;
    
  }
  .user__name {
    margin-right: 5px;
    @media (max-width: $bp-small) { display: none; }
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
    @media (max-width: $bp-large) { display: none; }
    &._mobile {
      display: none;
      margin-left: 20px;
      @media (max-width: $bp-large) { display: block; }
    }
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
    transition: background-color .2s ease-in-out;
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
      }
    }
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
    &._news:before { content: "\e01c" }
    &._offers:before { content: "\e043" }
    &._requests:before { content: "\e04b" }
    &._companies:before { content: "\e001" }
  }
  .item__title {
    opacity: 1;
    visibility: visible;
    transition: opacity .2s ease-in-out, visibility .2s ease-in-out;
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
    height: 100%;
    padding: 20px;
    padding-top: 70px;
    margin-left: 235px;
    transition: margin-left .2s ease-in-out;
  }
</style>
