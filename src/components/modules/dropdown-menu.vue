<template>
  <div :class="$style.dropdown_menu_wrapper">
    <div :class="$style.trigger" @click="toggled = !toggled"></div>
    <div :class="$style._wrapper" @mouseleave="toggled = false" v-if="toggled">
      <div :class="$style.dropdown_menu">
        <div :class="$style.dropdpwn_menu__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .trigger {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  ._wrapper {
    opacity: 1;
    visibility: visible;
    position: absolute;
    padding: 10px;
    left: -11px;
    top: 26px;
    z-index: 2;
    transition: visibility .2s ease-in-out, opacity .2s ease-in-out, top .2s ease-in-out;
    &._hidden { visibility: hidden; opacity: 0; top: 55px; }
  }

  .dropdown_menu {
    position: relative;
    text-align: left;
    background-color: #fff;
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 0;
    border: 1px solid #c2cad8;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
    &:after {
      position: absolute;
      top: -6px;
      left: 20px;
      display: block;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #fff;
      border-left: 6px solid transparent;
      content: '';
    }
    &:before {
      position: absolute;
      top: -8px;
      left: 19px;
      display: block;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #c2cad8;
      border-left: 7px solid transparent;
      content: '';
    }
    .dropdpwn_menu__content {
      position: relative;
    }
  }
</style>

<script>
  export default {
    name: 'dropdown-menu',
    props: ['align'],
    data() {
      return {
        toggled: false
      }
    }
  }
</script>