<template>
  <div :class="$style.details">
    <div :class="$style.details__author">
      <div :class="$style.author">
        <img :class="$style.author__photo" src="">
        <div :class="$style.author__meta">
          <div :class="$style.meta">
            <router-link :class="$style.meta__name" :to="{ name: 'root' }">
              Цветков Олег
              <app-online-status :online="true"></app-online-status>
            </router-link>
            <router-link :class="$style.meta__company" :to="{ name: 'root' }">
              ООО "Диджит"
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.details__list">
      <ul :class="$style.list">
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.type.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'type', offer.type.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.price.title }}:</span>
            <span :class="$style.item__value">{{ offer.price.current | price }} руб.</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.object.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'object', offer.object.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.house_city.title }}:</span>
            <span :class="$style.item__value">{{ offer.house_city.current }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.house_address.title }}:</span>
            <span :class="$style.item__value">{{ offer.house_address.current }}, {{ offer.house_number.current }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.house_district.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'house_district', offer.house_district.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.house_type.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'house_type', offer.house_type.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.house_material.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'house_material', offer.house_material.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartment_rooms.title }}:</span>
            <span :class="$style.item__value">{{ offer.apartment_rooms.current }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartment_floor.title }}:</span>
            <span :class="$style.item__value">{{ offer.apartment_floor.current }} / {{ offer.house_floors.current }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartments_full_area.title }}:</span>
            <span :class="$style.item__value">{{ offer.apartments_full_area.current }} м²</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartments_living_area.title }}:</span>
            <span :class="$style.item__value">{{ offer.apartments_living_area.current }} м²</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartment_furnish.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'apartment_furnish', offer.apartment_furnish.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartment_bathroom.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'apartment_bathroom', offer.apartment_bathroom.current ) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ offer.apartment_balcony.title }}:</span>
            <span :class="$style.item__value">{{ humanize( 'apartment_balcony', offer.apartment_balcony.current ) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .details {
    position: relative;
  }

  .details__author {
    position: relative;
    padding: 20px 15px 5px;
    &:after {
      @include clearfix;
      display: block;
      height: 1px;
      padding-top: 15px;
      background: url("./assets/border.png") 0 100% repeat-x;
    }
  }

  .author {
    position: relative;
  }

  .author__photo {
    display: block;
    max-width: 100%;
    width: 25%;
    height: auto;
    border-radius: 50%;
    padding-right: 5px;
    float: left;
  }

  .author__meta {
    float: left;
    width: 75%;
    padding: 2.5px 0;
  }

  .meta {
    position: relative;
  }

  .meta__name {
    display: block;
    color: #5a7391;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 7px;
    text-decoration: none;
  }

  .meta__company {
    display: block;
    text-transform: uppercase;
    color: #5b9bd1;
    font-size: 12px;
    font-weight: 400;
    text-decoration: none;
  }

  .details__list {
    position: relative;
  }

  .list {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 7.5px solid #fff;
  }

  .list__item {
    position: relative;
  }

  .item {
    position: relative;
    border-bottom: 1px solid #f0f4f7;
    display: block;
    padding: 7.5px;
    cursor: default;
    transition: background-color .1s ease-in-out;
    &:hover { background-color: #eef1f5 }
    &:after { @include clearfix }
  }
  
  .item__title {
    display: block;
    width: 50%;
    float: left;
    color: #5a7391;
  }

  .item__value { 
    display: block;
    width: 50%;
    float: left;
    color: #5a7391;
    text-align: right;
    color: #93a3b5;
    font-style: italic;
  }

</style>

<script>
  
  import AppOnlineStatus from '../modules/online-status.vue';
  import AppFilters from '../helpers/filters.js';
  import mdl from '../../models/offer.js';

  export default {
    name: 'offer-details',
    props: ['offer'],
    filters: AppFilters,
    components: { AppOnlineStatus },
    methods: {
      humanize: mdl.getOptionTitle
    }
  }
</script>