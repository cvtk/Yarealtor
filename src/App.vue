<template>

<div id="#app" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
  <header class="app-header mdl-layout__header mdl-color--blue-grey-800">
    <div class="mdl-layout__header-row">
      <span class="header-logo mdl-layout-title mdl-color-text--blue-grey-100 mdl-layout--small-screen-only"><span class="_hl">Я</span>СР</span>
      <div class="mdl-layout-spacer"></div>
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
      <router-link to="/" class="link mdl-navigation__link mdl-color-text--blue-grey-100" exact><img src="/static/newspaper.svg" alt="Новости" class="icon">Новости</router-link>
      <router-link to="/offers" class="link mdl-navigation__link mdl-color-text--blue-grey-100"><img src="/static/house.svg" alt="Новости" class="icon">Предложения</router-link>
      <router-link to="/requests" class="link mdl-navigation__link mdl-color-text--blue-grey-100"><img src="/static/market.svg" alt="Новости" class="icon">Спрос</router-link>
      <router-link to="/companies" class="link mdl-navigation__link mdl-color-text--blue-grey-100"><img src="/static/teamwork.svg" alt="Новости" class="icon">Компании</router-link>
      <div class="mdl-layout-spacer"></div>
    </nav>      
    <div class="info-menu">
      <router-link tag="button" :to="{ name: 'list'}" id="tt1" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--blue-grey-100">
        <i class="material-icons">help_outline</i>
      </router-link>
      <router-link tag="button" :to="{ name: 'root'}" id="tt2" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--blue-grey-100">
        <i class="material-icons">report</i>
      </router-link>
      <router-link tag="button" :to="{ name: 'root'}" id="tt3" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--blue-grey-100">
        <i class="material-icons">stars</i>
      </router-link>
      <div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="tt1">Информация по работе с системой</div>
      <div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="tt2">Кодекс риэлтора</div>
      <div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="tt3">Правила модерации</div>      
    </div>
  </div>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
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
      font-weight: 300;
      &._active, &:hover {
        background-color: rgba(158,158,158,.2);
      }
      > .icon {
        height: 40px;
        margin-right: 16px;
      }
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
  .info-menu {
    padding: 12px 22px;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    justify-content: space-around;
  }
  .user-menu {
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
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
