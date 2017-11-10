<template>
  <router-link :to="{ name: 'offer', params: { id: offer.key } }"
    :key="offer.key"
    :class="$style.item" tag="li">
    <span :class="$style.item__type">{{ humanize( 'type', offer.type) }}</span>
    <div :class="$style.wrapper_image">
      <div :class="$style.item__image" :style="{ 'background-image': 'url(' + offer.images[0].small + ')' }"></div>
      <div :class="$style.item__details">
        
      </div>
    </div>
    <div :class="$style.item__meta">
      <h3 :class="$style.meta__title">{{ title }}</h3>
      <span :class="$style.meta__address">{{ address }}</span>
      <span :class="$style.meta__contacts"><span v-if="!ghostMode">{{ company.name }}, </span>{{ author.mobile }}</span>
      <!-- <span :class="$style.item__favorites">12</span> -->
      <span :class="$style.item__price">{{ offer.price | price }} руб.</span>
    </div>
  </router-link>
</template>
<style lang="scss" module>
  @import "../../assets/style.scss";

  .item {
    display: block;
    position: relative;
    width: 33.333333%;
    padding: 0 10px;
    float: left;
    overflow: hidden;
    margin-bottom: 10px;
    &:hover {
      .item__image { transform:scale(1.1) }
      .item__details { top: 0 }
      .item__meta { background-color: #3e4b5c }
      .meta__title { color: #f1f1f1 }
      .meta__address { color: #f1f1f1 }
      .meta__contacts { color: #f1f1f1 }
      .item__price { color: #f9e491 }
      .item__price:before { background-image: url(/static/bg-border-dotted-horizontal--hover.png) }
    }
    @media (max-width: $bp-large) {
      width: 50%;
    }
    @media (max-width: $bp-medium) {
    }
    @media (max-width: $bp-small) {
      width: 100%;

    }
    @media (max-width: $bp-extra-small) {
      
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
    position: relative;
    background-color: #fff;
    padding: 15px 20px;
    transition: background-color .2s ease-in-out;
    margin-bottom: 10px;
    overflow: hidden;
    min-height: 184px;
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
  }
  .item__price {
    display: block;
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 15px;
    text-align: right;
    color: #32c5d2;
    font-size: 20px;
    font-weight: 300;
    transition: color .2s ease-in-out;
    &:before {
      display: block;
      position: absolute;
      content: "";
      top: -15px;
      left: -20px;
      right: -20px;
      height: 1px;
      background: url(/static/bg-border-dotted-horizontal.png) 0 100% repeat-x;
    }
  }
</style>

<script>
  import mdl from '../../models/offer.js';
  import firebase from '../../firebase.js';
  import AppFilters from '../helpers/filters.js';

  const companiesRef = firebase.database().ref('companies');
  const usersRef = firebase.database().ref('users');

  export default {
    name: 'grid-layout-item',
    props: ['offer', 'ghostMode'],
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        thumb: '', author: {}, company: {},
        mdl: mdl.getModel(['meta', 'general', 'offer', 'address', 'params'])
      }
    },
    methods: {
      commercialType() {
        let types = [ 'commercial_retail', 'commercial_office', 'commercial_industrial',
          'commercial_warehouse', 'commercial_business', 'commercial_land', 'commercial_apartments' ];

        for ( let i = 0; i < types.length; i++ ) {
          let key = types[i];

          if ( typeof this.offer[key] !== 'undefined' && this.offer[key] ) {
            return this.mdl[key].title;
          }
        }
      },
      humanize: mdl.getOptionTitle
    },
    computed: {
      title() {
        switch( this.offer.object ) {
          case 1: return `${this.offer.rooms}-к квартира, ${this.offer.area_full} м², ${this.offer.floor}/${this.offer.floors} эт.`;
          case 2: return `Комната, ${this.offer.area_full} м², ${this.offer.floor}/${this.offer.floors} эт.`;
          case 3: return `Коммерческая, ${this.commercialType()}, ${this.offer.area_full} м²`;
          case 4: return `${ this.humanize( 'cottage_type', this.offer.cottage_type) }, ${this.offer.area_full} м², ${this.offer.floors} этажа`;
          case 5: return `Гараж, ${ this.humanize( 'garage_material', this.offer.garage_material) }, ${this.offer.area_full} м²`;
          case 6: return `Участок ${ this.humanize( 'land_type', this.offer.land_type) }, ${this.offer.cottage_area} сот.`;
        }
      },
      address() {
        switch( this.offer.object ) {
          case 4: return `${this.offer.localityType}. ${this.offer.locality}, ${this.offer.streetType}. ${this.offer.street}`;
          case 5: return `${this.offer.localityType}. ${this.offer.locality}, ${this.offer.streetType}. ${this.offer.street}`;
          case 6: return `${this.offer.localityType}. ${this.offer.locality}`;
          default: return `${this.offer.localityType}. ${this.offer.locality}, ${this.offer.streetType}. ${this.offer.street}, ${this.offer.building}`;
        }
      }
    },
    created() {

      usersRef.child(this.offer.author).once('value', user => {
        this.author = user.val();
        companiesRef.child(this.offer.company).once('value', company => {
          this.company = company.val();
          this.dataReady = true;
        });
      })
    }
  }
</script>