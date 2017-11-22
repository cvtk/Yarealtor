<template>
  <aside :class="$style.ad__sidebar">
    <h2 :class="$style.sidebar__title">Наши партнеры</h2>
    <div :class="$style.sidebar__content" v-for="( ad, index ) in ads" :key="index">
      <img :src="ad" alt="Реклама на портале" >
    </div>
  </aside>
</template>

<style lang="sass" module>
  @import "../../assets/style.scss";
  .ad__sidebar
    position: absolute
    top: 0
    right: 0
    width: 280px
    height: auto
    background-color: #fff
    padding: 15px 20px
    @media (max-width: $bp-medium)
      display: none

  .sidebar__title
    width: 100%
    color: #578ebe
    padding: 12px 0
    display: inline-block
    font-size: 15px
    line-height: 18px
    margin: 0
    text-transform: uppercase
    letter-spacing: .25px

  .sidebar__content
    padding-bottom: 15px; text-align: center;
</style>
  
<script>
  import firebase from '../../firebase.js';

  const adsRef = firebase.database().ref('ads/sidebar');

  export default {
    name: 'app-ad-sidebar',
    data() {
      return { ads: {} }
    },
    created() {
      adsRef.once('value', this.loadAds)
    },
    methods: {
      loadAds(snapshot) {
        this.ads = snapshot.val();
      }
    }
  }
</script>