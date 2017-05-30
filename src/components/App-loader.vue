<template>
  <div :class="$style.app__loader" :style="{width: config.width, height: config.height}">
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
    width: 100%;
    height: auto;
    max-height: 75%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>