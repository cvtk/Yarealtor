<template>
  <button :class="[ $style.button, $style[icon] ]" :id="id" @click="$emit('click')">{{ label }}</button>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .button {
    display: inline-block;
    z-index: 1;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 1.5;
    touch-action: manipulation;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #32c5d2;
    outline: none;
    color: #fff;
    background-color: #32c5d2;
    user-select: none;
    transition: all .2s ease-in-out;
    &:hover {
      color: #fff;
      background-color: #26a1ab;
      border-color: #2499a3;
    }
  }
  .next:after {
    content: "\e079";
    font-family: "Icons";
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    margin-left: 5px;
  }

  .previos:before {
    content: "\e07a";
    font-family: "Icons";
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    margin-right: 5px;
  }
  
</style>

<script>
  export default {
    name: 'default-button',
    props: {
      label: { type: String, default: '' },
      icon: { type: String, default: '' }
    },
    data() {
      return {
        id: Math.random().toString(36).substring(7)
      }
    }
  }
</script>
