<template>
  <ul :class="$style.breadcrumbs">
    <li :class="$style.breadcrumbs__item" v-for="(item, index) in items" :key="index">
      <router-link :class="$style.link" v-if="item.to" :to="{ name: item.to }">{{ item.text }}</router-link>
      <span :class="$style.item" v-else :to="{ name: item.to }">{{ item.text }}</span>
    </li>
  </ul>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .breadcrumbs {
    display: inline-block;
    margin: 0; padding: 0;
    list-style: none;
    @media (max-width: $bp-small) {
      .breadcrumbs__item:first-child { display: none }
    }
  }

  .breadcrumbs__item {
    display: inline-block;
    padding: 11px 0;
    &:after {
      content: "\e606";
      display: inline-block;
      font-family: "Icons";
      font-size: 8px;
      vertical-align: middle;
      margin: 0 5px;
      line-height: 18px;
    }
    &:last-child:after { content: "" }
  }

  .item {
    color: #888;
    line-height: 14px;
  }

  .link {
    color: #888;
    line-height: 14px;
    cursor: pointer;
    text-decoration: none;
    transition: color .35s;
    &:hover { color: #364150 }
  }

</style>

<script>
  export default {
    name: 'app-breadcrumbs',
    props: {
      items: {
        type: Array,
        default: () => [ { text: 'Главная', to: 'root'} ]
      }
    }
  }
</script>