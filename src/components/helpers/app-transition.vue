<template>
  <transition name="fade"><slot></slot></transition>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
  export default {
    name: 'app-transition'
  }
</script>