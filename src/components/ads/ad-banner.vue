<template>
  <div :class="$style.ad__banner">
    <div :class="$style.banner__content">
      <img :src="ad" :class="$style.image" alt="Реклама на портале" >
    </div>
  </div>
</template>

<style lang="sass" module>
  .ad__banner
    position: relative
    width: 100%
    height: auto
    margin: 20px 0

  .banner__content
    text-align: center;

  .image
    display: block
    max-width: 100%
    margin: 0 auto
</style>
  
<script>
  import firebase from '../../firebase.js';

  const adsRef = firebase.database().ref('ads/banner');

  export default {
    name: 'app-ad-banner',
    data() {
      return { ad: {} }
    },
    created() {
      adsRef.once('value', this.loadAds)
    },
    methods: {
      randomAd(ads) {
        let randomElement = Math.floor(Math.random() * ads.length);
        return ads[randomElement];
      },
      loadAds(snapshot) {
        this.ad = this.randomAd( snapshot.val() );
      }
    }
  }
</script>