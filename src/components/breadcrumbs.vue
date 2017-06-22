<template>
  <ul :class="$style.breadcrumbs" v-for="item in path">
    <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
    <span :class="$style.breadcrumbs__icon"></span>
    <li :class="$style.breadcrumbs__item">Компании</li>
  </ul>
</template>

<style lang="scss" module>


</style>
  
<script>
  export default {
    name: 'breadcrumbs',
    props: ['path']
  }
</script>