<template>
  <transition name="modal" appear>
    <div :class="[ $style.modal_overlay, layoutImage && $style._image ]" v-if="show" @click.self="closeModal">
      <div :class="$style.modal_overlay__close_button" @click="closeModal" v-if="closeButton"></div>
      <div :class="[ $style.modal_overlay__content_slot, borderless && $style._borderless ]" id="hR2ykz_">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style>

  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter #hR2ykz_,
  .modal-leave-to #hR2ykz_ {
    transform: scale(1.1);
  }

</style>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .modal_overlay {
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: rgba(0, 0, 0, .65);
    z-index: 9997;
    transition: opacity .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &._image {
      background-image: url("./layout.jpg");
      background-size: cover;
      background-color: rgba(0, 0, 0, .25);
    }
  }

  .modal_overlay__close_button {
    @media (max-width: $bp-extra-small) { background-color: #32c5d2; }
    position: absolute;
    top: 26px;
    right: 24px;
    background-image: url("./close-button.svg");
    background-repeat: no-repeat;
    width: 36px;
    height: 36px;
    background-size: 100%;
    cursor: pointer;
    z-index: 9999;
    background-size: 50%;
    background-position: center;
    border-radius: 50%;
    background-color: transparent;
  }

  .modal_overlay__content_slot {
    @media (min-width: 768px) { max-width: 750px }
    @media (min-width: 992px) { max-width: 970px }
    @media (min-width: 1200px) { max-width: 1170px }
    padding: 0;
    z-index: 9998;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .6);
    transition: all .3s;
    &._borderless { box-shadow: none }
  }
</style>

<script>
  export default {
    name: 'modal-overlay',
    props: {
      show: { default: false, type: Boolean },
      layoutImage: { default: false, type: Boolean },
      closeButton: { default: true, type: Boolean },
      borderless: { default: false, type: Boolean }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    },
    created() {
      document.addEventListener('keyup', (event) => {
        if ( this.show && event.keyCode === 27) this.closeModal();
      })
    }
  }
</script>