<template>
  <transition v-if="type === 'toggleDown'" name="toggle-down"><slot></slot></transition>
  <transition v-else name="fade"><slot></slot></transition>
</template>

<style>
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