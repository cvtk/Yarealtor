<template>
  <ul :class="$style.content__grid">
    <router-link tag="li" v-for="item in data" :to="{ path: 'root' }" :class="$style.grid__item">
      <div :class="$style.item__image" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>

    </router-link>
  </ul>
</template>
<style lang="scss" module>
  @import "../../assets/style.scss";

  .content__grid {
    list-style: none;
    margin: 0 -20px;
    padding: 0;
    &:after { @include clearfix }
  }
  .grid__item {
    display: block;
    position: relative;
    width: 33.333333%;
    height: 190px;
    padding: 0 15px 15px;
    float: left;
    overflow: hidden;
    cursor: pointer;
  }
  .item__image {
    position: absolute;
    width: 100%;
    height: 0;
    padding-top: 66.64%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<script>
  export default {
    name: 'app-content-grid',
    props: ['data']
  }
</script>