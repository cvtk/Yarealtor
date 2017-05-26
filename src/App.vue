<template>
<div :class="$style.app">
  <header :class="$style.app__header">
    <div :class="$style.header__logo">
      <button :class="$style.menu__toggler"></button>
    </div>
    <div :class="$style.header__menu">
      <div :class="$style.menu__user">
        <img src="/static/users/default-2.svg" alt="Фото" :class="$style.user__pic">
        <span :class="$style.user__name">Иван Петров</span>
      </div>
    </div>
  </header>
  <aside :class="$style.app__menu">2</aside>
</div>
</template>

<script>
export default { name: 'app' }
</script>

<style lang="scss" module>

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
  }
  .app__header {
    position: fixed;
    z-index: 1;
    background-color: #2b3643;
    width: 100%;
    height: 50px;
  }
  .header__logo {
    float: left;
    width: 235px;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .header__menu {
    float: right;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .menu__user {
    cursor: pointer;
    padding: 14.5px 10px;
    transition: background-color .2s ease-in-out;
    &:hover { background-color: #3f4f62 }
  }
  .user__pic {
    height: 30px;
    
  }
  .user__name {
    color: #c6cfda;
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
      font-family: Icons;
      font-size: 21px;
      color: #818e9e;
      transition: color .3s ease-in-out;

    }
  }
</style>
