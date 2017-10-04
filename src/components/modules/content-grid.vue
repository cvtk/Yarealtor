<template>
  <ul :class="$style.content__grid">
    <router-link v-for="offer in data"
      :to="{ name: 'offer', params: { id: offer.key } }"
      :key="offer.key"
      :class="$style.grid__item" tag="li">
      <span :class="$style.item__type">{{ humanize( 'type', offer.type) }}</span>
      <div :class="$style.wrapper_image">
        <div :class="$style.item__image" :style="{ 'background-image': 'url(' + offer.images[0].small + ')' }"></div>
        <div :class="$style.item__details">
          
        </div>
      </div>
      <div :class="$style.item__meta">
        <h3 :class="$style.meta__title">{{ offer.rooms }}-к квартира, {{ offer.area_full }} м², {{ offer.floor }}/{{ offer.floors }} эт.</h3>
        <span :class="$style.meta__address">{{ offer.localityType }}. {{ offer.locality }}, {{ offer.streetType }}. {{ offer.street }}, {{ offer.buildingType }}. {{ offer.building }}</span>
        <span :class="$style.meta__contacts">ЗАО «ГАЗПРОМ», 8 (987) 654-43-21</span>
        <!-- <span :class="$style.item__favorites">12</span> -->
        <span :class="$style.item__price">{{ offer.price | price }} руб.</span>
      </div>
    </router-link>
  </ul>
</template>
<style lang="scss" module>
  @import "../../assets/style.scss";

  .content__grid {
    position: relative;
    list-style: none;
    margin: 0 -10px;
    padding: 0;
    cursor: pointer;
    &:after { @include clearfix }
    @media (min-width: $bp-extra-large) {
      .grid__item { width: 25% }
    }
    @media (max-width: $bp-large) {
      .grid__item { width: 50% }
    }
    @media (max-width: $bp-extra-small) {
      .grid__item { width: 100% }
    }
  }
  .grid__item {
    display: block;
    position: relative;
    width: 33.333333%;
    padding: 0 10px 20px;
    float: left;
    overflow: hidden;
    &:hover {
      .item__image { transform:scale(1.1) }
      .item__details { top: 0 }
      .item__meta { background-color: #3e4b5c }
      .meta__title { color: #f1f1f1 }
      .meta__address { color: #f1f1f1 }
      .meta__contacts { color: #f1f1f1 }
      .meta__contacts:after { background-image: url(/static/bg-border-dotted-horizontal--hover.png) }
      .item__price { color: #f9e491 }
      .item__favorites { color: #f9e491 }
    }
  }

  .wrapper_image {
    position: relative;
    width: 100%;
    padding-top: 75%;
    overflow: hidden;
  }

  .item__image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    transition: transform .3s ease-in-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .item__details {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: top .4s ease-in-out;
  }

  .item__type {
    position: absolute;
    right: 5px;
    background: #3e4b5c;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 3px 15px;
    top: 20px;
    line-height: 2;
    z-index: 1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.1);   
    &:after {
      position: absolute;
      right: 0;
      bottom: -5px;
      border-top: 5px solid #2b3643;
      width: 5px;
      content: " ";
      z-index: 1;
      display: block;
      border-right: 5px solid #f6f6f6;
    }
  }

  .item__meta {
    background-color: #fff;
    padding: 15px 20px;
    transition: background-color .2s ease-in-out;
    margin-bottom: 10px;
    overflow: hidden;
    &:after { @include clearfix }
  }
  .meta__title {
    color: #5a7391;
    font-weight: 400;
    margin: 0;
    font-size: 16px;
    line-height: 1.8;
    transition: color .2s ease-in-out;
    white-space: pre;
  }

  .meta__address {
    display: block;
    color: #5b9bd1;
    line-height: 1.8;
    transition: color .2s ease-in-out;
    &:before {
      content: "\e096";
      font-family: "Icons";
      font-size: 14px;
      padding-right: 3px;
    }
  }
  .meta__contacts {
    display: block;
    color: #5b9bd1;
    line-height: 1.8;
    transition: color .2s ease-in-out;
    &:before {
      content: "\e001";
      font-family: "Icons";
      font-size: 14px;
      padding-right: 3px;
    }
    &:after {
      content: "";
      display: block;
      margin: 10px 0;
      height: 1px;
      background: url(/static/bg-border-dotted-horizontal.png) 0 100% repeat-x;
    }
  }
  .item__favorites {
    display: block;
    float: left;
    width: 25%;
    cursor: pointer;
    color: #5b9bd1;
    line-height: 28px;
    transition: color .2s ease-in-out;
    &:before {
      content: "\e09b";
      font-family: "Icons";
      font-size: 14px;
      padding-right: 3px;
    }
  }
  .item__price {
    display: block;
    float: right;
    text-align: right;
    width: 75%;
    color: #32c5d2;
    font-size: 20px;
    font-weight: 300;
    transition: color .2s ease-in-out;
  }
</style>

<script>
  import mdl from '../../models/offer.js';
  import AppFilters from '../helpers/filters.js';

  export default {
    name: 'app-content-grid',
    props: ['data'],
    filters: AppFilters,
    data() {
      return {
        mdl: mdl.getModel(['meta', 'general', 'offer', 'address', 'params'])
      }
    },
    methods: {
      humanize: mdl.getOptionTitle
    }
  }
</script>