<template>
  <li :class="$style.item" v-if="dataReady">

    <div :class="$style.item__content">
      <div :class="$style.row">
        <router-link :class="$style.content__title" :to="{ name: 'request', params: { id: request.key } }">
          <span :class="$style.title">{{title}}</span>
        </router-link>
        <span :class="$style.content__price">до {{ request.price_to | price }} руб.</span>
      </div>
      <div :class="$style.row">
        <div :class="$style.content__meta">
          <div :class="$style.meta__address">{{address}}</div>
        </div>
        <span :class="$style.content__date">{{ request.created | unixToDate }}</span>
      </div>
       <div :class="$style.content__description">{{ request.description }}</div>
       <div :class="$style.content__foot">
         <router-link :to="{ name: 'user', params: { page: author.page } }"  :class="[$style.foot__item, $style._author]">{{ author.name }} {{ author.surname }}</router-link>
         <router-link v-if="!ghostMode" :to="{ name: 'company', params: { page: company.page } }"  :class="[$style.foot__item, $style._company]">{{ company.name }}</router-link>
         <span :class="[$style.foot__item, $style._phone]">{{ author.mobile }}</span>
       </div>
    </div>
  </li>
</template>
<style lang="scss" module>
  @import "../../assets/style.scss";

  .item {
    display: block;
    position: relative;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 20px;
    &:after { @include clearfix }
    @media (max-width: $bp-medium) {
      
    }
    @media (max-width: $bp-small) {
      .wrapper_image { display: none }
      .item__type { display: none }
      .item__content { width: 100% }
      .content__title { float: none; width: 100% }
      .content__price { float: none; text-align: left; width: 100% }
      .content__meta { float: none; width: 100% }
      .content__date { float: none; width: 100% }
      .content__foot { text-align: left }
    }
    @media (max-width: $bp-extra-small) {
      
    }
  }

  .row {
    position: relative;
    &:after { @include clearfix }
  }

  .item__type {
    position: absolute;
    left: 10px;
    background: #3e4b5c;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 3px 15px;
    top: 35px;
    line-height: 2;
    z-index: 1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.1);   
    &:after {
      position: absolute;
      left: 0;
      bottom: -5px;
      border-top: 5px solid #2b3643;
      width: 5px;
      content: " ";
      z-index: 1;
      display: block;
      border-left: 5px solid #f6f6f6;
    }
  }

  .item__content {
    position: relative
  }

  .content__title {
    width: 66.666667%;
    float: left;
    color: #5a7391;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    margin-bottom: 5px;
    text-decoration: none;
    transition: color .2s ease-in-out;
    &:hover { color: #3e4b5c }
  }

  .content__price {
    display: block;
    width: 33.333333%;
    float: right;
    text-align: right;
    color: #32c5d2;
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    margin-bottom: 5px;
  }

  .content__meta {
    width: 66.666667%;
    float: left;
    margin-bottom: 10px;
  }

  .meta__address {
    display: inline-block;
    color: #5b9bd1;
    //white-space: pre;
    margin-right: 10px;
    &:before {
      content: "\e096";
      font-family: "Icons";
      font-size: 13px;
      margin-right: 3px;
    }
  }

  .content__date {
    width: 33.333333%;
    float: right;
    text-align: right;
    margin-bottom: 10px;
  }

  .content__description {
    width: 100%;
    margin-bottom: 7px;
  }

  .content__foot {
    border-top: 1px solid #f0f1f2;
    padding-top: 20px;
    margin-top: 20px;
    text-align: right;
    > .foot__item {
      display: inline-block;
      color: #5a7391;
      transition: color .2s ease-in-out;
      text-decoration: none;
      white-space: pre;
      font-weight: 400;
      margin-right: 15px;
      &:hover { color: lighten(#5a7391, 10%) }
      &:before {
        content: "";
        font-family: "Icons";
        font-size: 13px;
        margin-right: 3px;
      }
    }
    > ._author:before { content: "\e005" }
    > ._company { float: left; &:before { content: "\e001" } }
    > ._favorites:before { content: "\e09b" }
    > ._comments:before { content: "\e04a" }
    > ._phone{ float: left; &:before { content: "\e048" } }
  }


  .content__list {
    @media (max-width: $bp-extra-large) {
      .wrapper_image { width: 15%; padding-top: 15%; }
      .item__content { width: 85% }
    }
    @media (max-width: $bp-large) {
      .wrapper_image { width: 20%; padding-top: 20%; }
      .item__content { width: 80% }
    }
    @media (max-width: $bp-medium) {
      .wrapper_image { width: 30%; padding-top: 30%; }
      .item__content { width: 70% }
    }
    @media (max-width: $bp-small) {
      .wrapper_image { width: 40%; padding-top: 40%; }
      .item__content { width: 60% }
    }
    @media (max-width: $bp-extra-small) {
      .wrapper_image { width: 100%; padding-top: 80%; }
      .item__content {
        width: 100%;
        padding-left: 0;
        padding-top: 10px;
      }
      .content__title {
        width: 100%;
        margin-bottom: 0;
        float: none;
        font-weight: 400;
        font-size: 18px
      }
      .content__price {
        width: 100%;
        float: none;
        text-align: left;
        margin-bottom: 0;
      }
      .content__meta { width: 100%; margin-bottom: 0; }
      .content__date {
        width: 100%;
        display: inline-block;
        color: #5b9bd1;
        transition: color .2s ease-in-out;
        white-space: pre;
        text-align: left;
        &:hover { color: #578ebe }
        &:before {
          content: "\e081";
          font-family: "Icons";
          font-size: 13px;
          margin-right: 3px;
        }
      }
      .content__description {  }
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
    props: ['request', 'ghostMode'],
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        thumb: '', author: {}, company: {},
        mdl: {}
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
        let op = ['Ищу', 'Куплю', 'Сниму'][this.request.op.value],
            r = this.request;
        switch( this.request.object.value ) {
          case 1: return `${op}: ${r.rooms.map( e => e.value ).join(', ')}-к квартиру`;
          default: return `${op}: ${r.object.label.toLowerCase()}`;
        }
      },
      address() {
        switch( this.request.object.value ) {
          default: return `${this.request.localityType}. ${this.request.locality}, ${this.request.district[0].label} район`;
        }
      }
    },
    created() {

      usersRef.child(this.request.author).once('value', user => {
        this.author = user.val();
        companiesRef.child(this.request.company).once('value', company => {
          this.company = company.val();
          this.dataReady = true;
        });
      })
    }
  }
</script>