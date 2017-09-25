<template>
  <div :class="$style.third">
    <div :class="$style.third__content">
      <div :class="$style.wrapper">
        <div :class="$style.group__images">
          <div v-for="image in offer.images.current"
            v-if="offer.images.current.length !== 0"
            :class="$style.images__item" 
            :style="{ 'background-image': 'url(' + image.url + ')' }">
          </div>
          <div v-else
            :class="$style.images__item" 
            :style="{ 'background-image': 'url(/static/image-placeholder.png)' }">
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.third__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <div :class="$style.group__details">
            <ul :class="$style.details__list">
              <li :class="$style.list__item" v-for="obj in filteredOffers">
                <span :class="$style.item__title">{{ obj.title }}</span>
                <span :class="$style.item__value">{{ obj.current }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .wrapper {
    position: relative;
    background-color: #fff;
    overflow: auto;
    &:after { @include clearfix }
  }

  /* third */
    .third {
      position: relative;
      margin: 20px -10px 0;
      &:after { @include clearfix }
      @media (max-width: $bp-medium) {
        .third__content { width: 100% }
      }
    }

  /* third__content */
    .third__content {
      width: 50%;
      float: left;
      padding: 0 10px;
    }

  /* content__group */
    .content__group {
      position: relative;
      border: 1px solid #c2cad8;
      padding: 15px;
      margin: 15px;
      margin-top: 20px;
    }

    .content__group:first-child {
      margin-top: 15px;
    }
    
    .group__title {
      position: absolute;
      color: #c2cad8;
      top: -10px;
      left: 15px;
      background-color: #fff;
      padding: 0 5px;
      font-style: italic;
    }

    .details__list {
      margin: 0 -7.5px;
      padding: 0;
      list-style: none;
      > .list__item {
        border-bottom: 1px solid #f0f4f7;
        display: block;
        padding: 7.5px;
        cursor: default;
        transition: background-color .1s ease-in-out;
        &:nth-child(odd) { background-color: #eef1f5 }
        &:after { @include clearfix }
        > .item__title, .item__value { display: block; width: 50%; float: left; color: #5a7391; }
        > .item__value { text-align: right; color: #93a3b5; font-style: italic; }
      }
    }

    .group__images {
      position: relative;
      &:after { @include clearfix }
    }

    .images__item {
      position: relative;
      width: 50%;
      min-height: 100px;
      float: left;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      &:first-child {
        width: 100%;
        min-height: 327px;
      }
    }

</style>

<script>
  import AppInput from '../modules/inputs.vue';
  import AppUploadImages from '../modules/upload-images.vue';
  import model from '../../models/offer.js';

  export default {
    name: 'final',
    components: { AppInput, AppUploadImages },
    props: ['offer'],
    methods: {
      getOptionTitle: model.getOptionTitle
    },
    computed: {
      filteredOffers() {
        let hidden = ['images'],
            r = {};
        for (let obj in this.offer) {
          if ( !hidden.includes(obj) ) {
            let humanized = model.getOptionTitle(obj, this.offer[obj].current) || this.offer[obj].current;
            r[obj] = { title: this.offer[obj].title, current: humanized }
          }
        }
        return r;
      }
    }
  }
</script>