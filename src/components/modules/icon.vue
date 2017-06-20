<template>
  <svg :class="$style.icon"><use :xlink:href="'./assets/app-icons/' + name + '.svg'" /></svg>
</template>
<style lang="scss" module>
  .icon { fill: currentColor }
</style>

<script>
  export default {
    name: 'app-icon',
    props: ['name']
  }

</script>