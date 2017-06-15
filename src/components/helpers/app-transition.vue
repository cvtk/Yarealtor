<template>
  <transition v-if="type === 'slideRight'" name="slide-right"><slot></slot></transition>
  <transition v-else-if="type === 'toggleDown'" name="toggle-down"><slot></slot></transition>
  <transition v-else name="fade"><slot></slot></transition>
</template>

<style>
  .slide-right-enter-active, .slide-right-leave-active {
    left: 0;
    transition: left 1.2s ease-in-out;
  }

  .slide-right-enter, .slide-right-leave-to {
    left: -100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .toggle-down-enter-active, .toggle-down-leave-active {
    height: 18px;
    transition: height .2s ease-in-out, opacity .2s ease-in-out;
  }

  .toggle-down-enter, .toggle-down-leave-to {
    height: 0;
    opacity: 0;
  }
</style>

<script>
  export default {
    name: 'app-transition',
    props: ['type']
  }
</script>