<template>

<div id="#app" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
  <header class="app-header mdl-layout__header mdl-color--blue-grey-800">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="header-logo mdl-layout-title mdl-color-text--blue-grey-100 mdl-layout--small-screen-only"><span class="_hl">Я</span>СР</span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation. We hide it in small screens. -->
      <button id="user-menu" class="user-dropdown mdl-button mdl-js-button mdl-color-text--blue-grey-100 mdl-layout--large-screen-only">
        <img src="/static/users/default-2.svg" alt="Пользователь" class="avatar">
        <span class="name ">Иван Петров</span>
        <i class="material-icons">arrow_drop_down</i>
      </button>
      <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="user-menu">
        <li class="mdl-menu__item">Мой профиль</li>
        <li class="mdl-menu__item mdl-menu__item--full-bleed-divider">Моя компания</li>
        <li class="mdl-menu__item">Выйти</li>
      </ul>
    </div>
  </header>

  <div class="app-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    
    <header class="drawer-header">
      <span class="header-logo mdl-layout-title mdl-color-text--blue-grey-100 mdl-layout--large-screen-only"><span class="_hl">Я</span>СР</span>
      <div class="user-menu mdl-layout--small-screen-only">
        <img src="/static/users/default-2.svg" alt="Пользователь" class="avatar">
        <div class="menu-dropdown">
          <span class="name">Иван Петров</span>
          <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
            <i class="material-icons">arrow_drop_down</i>
          </button>
          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
            <li class="mdl-menu__item">Мой профиль</li>
            <li class="mdl-menu__item mdl-menu__item--full-bleed-divider">Моя компания</li>
            <li class="mdl-menu__item">Выйти</li>
          </ul>
        </div>      
      </div>
    </header>

    <nav class="drawer-navigation mdl-navigation mdl-color--blue-grey-800">
      <a class="link mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-50 material-icons" role="presentation">home</i>Home</a>
      <a class="link mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
      <a class="link mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
      <a class="link mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
      <a class="link mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
      <div class="mdl-layout-spacer"></div>
      <router-link tag="button" :to="{ name: 'list'}" id="tt1" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--blue-grey-100">
        <i class="material-icons">help_outline</i>
      </router-link>
      <router-link tag="button" :to="{ name: 'root'}" id="tt2" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--blue-grey-100">
        <i class="material-icons">report</i>
      </router-link>
      <div class="mdl-tooltip" data-mdl-for="tt1">Информация по работе с системой</div>
      <div class="mdl-tooltip" data-mdl-for="tt2">Кодекс риэлтора</div>
    </nav>
  </div>
  <main class="mdl-layout__content">
    <div class="page-content">
      <router-view></router-view>
    </div>
  </main>
</div>

</template>

<script>

export default {
  name: 'app',
}

</script>

<style lang="scss" scoped>
  .app-header {}
  .header-logo {
    font-family: 'Lobster', sans-serif;
    font-size: 32px;
    letter-spacing: 0.15em;
    text-align: center;
    > ._hl { color: #ffc107; }
  }
  .user-dropdown {
    border-radius: 18px;
    padding-left: 2px;
    padding-right: 6px;
    font-weight: 300;
    text-transform: none;
    > .avatar {
      height: 32px;
      margin-right: 5px;
      border-radius: 16px;
    }
  }
  .app-drawer { border: none; }

  .drawer-navigation {
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    > .link {
      display: -webkit-flex !important;
      display: -ms-flexbox !important;
      display: flex !important;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 300;
      font-size: 16px;
    }
  }
  .drawer-header {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    padding: 16px;
  }
  .user-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    > .avatar {
      padding: 0 15px;
      border-radius: 150px;
    }
    > .menu-dropdown {

    }
  }
</style>
