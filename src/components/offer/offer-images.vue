<template>
  <div :class="$style.images">
    <div :class="$style.images__prev" @click="previous()" v-if="isMultiple"></div>
    <div :class="$style.images__next" @click="next()" v-if="isMultiple"></div>
    <div :class="$style.images__carousel">
      <flickity :class="[ $style.carousel, 'carousel-main' ]" ref="flickity" :options="opt">
        <div :class="$style.carousel__item" v-for="(image, index) in images">
          <div :class="$style.item">
            <div :class="$style.item__background" :style="{ 'background-image': 'url(' + image + ')' }"></div>
            <img :class="[ $style.item__image, false && $style._portret ]" :src="image">
          </div>
        </div>
      </flickity>
    </div>
    <div :class="$style.images__navigation" v-if="isMultiple">
      <flickity :class="$style.navigation" ref="navigation" :options="navOpt">
        <div :class="$style.navigation__item" 
          v-for="(image, index) in images" 
          :style="{ 'background-image': 'url(' + image + ')' }"
          @click="select(index)">  
        </div>
      </flickity>
    </div>
  </div>
</template>

<style lang="scss" module>

  .images {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    * { height: 100%; outline: none; }
  }
  
  .images__carousel { /* */ }

  .carousel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .carousel__item {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .images__prev, .images__next {
    position: absolute;
    top: 45%;
    right: 20px;
    height: 54px;
    cursor: pointer;
    padding: 12px 15px;
    text-align: center;
    background-color: #fff;
    opacity: .35;
    transition: opacity, .35s;
    z-index: 5;
    &:hover { opacity: .5 }
    &:after {
      content: "\e606";
      font-family: "Icons";
      font-size: 22px;
      color: #191c1f;
    }
  }

  .images__prev {
    left: 20px; right: auto;
    &:after { content: "\e605" }
  }

  .item__background {
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(50px);
    opacity: .75;
  }

  .item__image {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    filter: none;
    &._portret {
      max-height: 100%;
      width: auto;
    }
  }

  .images__navigation {
    position: absolute;
    left: 0; bottom: 0;
    height: 100px;
    width: 100%;
    z-index: 10;
  }

  .navigation { 
    padding: 10px 20px;
  }

  .navigation__item {
    margin: 0 5px;
    width: 80px;
    height: 80px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    transition: transform .2s;
    &:hover {
      transform: scale(1.1);
    }
  }

</style>

<script>
  import Flickity from 'vue-flickity';

  export default {
    name: 'offer-images',
    props: {
      images: { type: Array, default: [] }
    },
    components: { Flickity },

    data() {
      return {
        opt: { pageDots: false, prevNextButtons: false },
        navOpt: { contain: true, pageDots: false, prevNextButtons: false },
        dataReady: false
      }
    },

    computed: {
      isMultiple() {
        return this.images.length > 1;
      }
    },

    mounted() {
      this.dataReady = true;
    },

    methods: {
      select(index) {
        this.$refs.flickity.select(index);
      },

      next() {
        this.$refs.flickity.next();
      },

      previous() {
        this.$refs.flickity.previous();
      }
    }
  }
</script>