<template>
  <div :class="$style.app__loader">
    <img :class="$style.loader__spinner" src="/static/loader__spinner.svg">
  </div>
</template>

<script>
  export default {
    name: 'app-loader',
    props: ['config']
  }
</script>

<style lang="scss" module>
  .app__loader {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .loader__spinner {
    display: block;
    width: 15%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>