<template>
  <aside :class="$style.ad__sidebar">
    <h2 :class="$style.sidebar__title">Наши партнеры</h2>
    <div :class="$style.sidebar__content">
      <img src="/static/ad_1.gif" alt="" >
    </div>
    <div :class="$style.sidebar__content">
      <img src="/static/ad_3.gif" alt="" >
    </div>
  </aside>
</template>

<style lang="scss" module>
  .ad__sidebar {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: auto;
    background-color: #fff;
    padding: 15px 20px;
  }
  .sidebar__title {
    width: 100%;
    color: #578ebe;
    padding: 12px 0;
    display: inline-block;
    font-size: 15px;
    line-height: 18px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: .25px;
  }
  .sidebar__content { padding-bottom: 15px; text-align: center; }
</style>
  
<script>
  export default {
    name: 'app-ad-sidebar'
  }
</script>