<template>
  <modal-overlay :show="showModalImage" @close="showModalImage = false; $emit('close')" borderless>
    <div :class="$style.images">
      <div :class="$style.images__prev" @click="previous()" v-if="isMultiple"></div>
      <div :class="$style.images__next" @click="next()" v-if="isMultiple"></div>
      <div :class="$style.images__carousel">
        <flickity :class="$style.carousel"
          ref="flick" :options="opt">
          <div :class="$style.carousel__item" v-for="(image, index) in images">
            <div :class="$style.item">
              <img :class="[ $style.item__image, false && $style._portret ]" :src="image.orig">
            </div>
          </div>
        </flickity>
      </div>
    </div>
  </modal-overlay>
</template>

<style lang="scss" module>

  .images {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    * { height: 100%; outline: none; }
    @media (min-width: 320px) { min-width: 320px }
    @media (min-width: 768px) { min-width: 750px }
    @media (min-width: 992px) { min-width: 970px }
    @media (min-width: 1200px) { min-width: 1170px }
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

</style>

<script>
  import ModalOverlay from '../modal-overlay/modal-overlay.vue';
  import Flickity from 'vue-flickity';

  export default {
    name: 'offer-modal-images',
    props: {
      images: { type: Array, default: [] },
      showModal: { type: Boolean, default: false },
      current: { type: Number, default: 0 }
    },
    components: { ModalOverlay, Flickity },

    data() {
      return {
        opt: { pageDots: false, prevNextButtons: false },
        dataReady: false,
        showModalImage: this.showModal
      }
    },

    computed: {
      isMultiple() {
        return this.images.length > 1;
      }
    },

    watch: {
      current() {
        this.select(this.current);
      }
      
    },

    methods: {
      select(index) {
        this.$refs.flick.select(index);
      },
      next() {
        this.$refs.flick.next();
      },

      previous() {
        this.$refs.flick.previous();
      },
    },
    watch: {
      showModal() {
        this.showModalImage = this.showModal;
      }
    }
  }
</script>