<template>
  <div :class="$style.details">
    <div :class="$style.details__author">
      <div :class="$style.author">
        <div :class="$style.author__photo">
          <div :class="$style.photo" :style="{ 'background-image': 'url(' + author.photo.small + ')' }"></div>
        </div>
        <div :class="$style.author__meta">
          <div :class="$style.meta">
            <router-link :class="$style.meta__name" :to="{ name: 'user', params: { page: author.page } }">
              {{ author.name }} {{ author.surname }}
            </router-link>
            <router-link :class="$style.meta__company" :to="{ name: 'company', params: { page: company.page } }">
              {{ company.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.details__list">
      <ul :class="$style.list">
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Предложение:</span>
            <span :class="$style.item__value">{{ offerType }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Цена:</span>
            <span :class="$style.item__value">{{ offer.price }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Адрес:</span>
            <span :class="$style.item__value">{{ offer.localityType }}. {{ offer.locality }}, {{ offer.streetType }}. {{ offer.street }}, {{ offer.buildingType }}. {{ offer.building }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Район:</span>
            <span :class="$style.item__value">{{ humanize('district', offer.district) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.building_type.title }}:</span>
            <span :class="$style.item__value">{{ humanize('building_type', offer.building_type) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.material.title }}:</span>
            <span :class="$style.item__value">{{ humanize('material', offer.material) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.rooms.title }}:</span>
            <span :class="$style.item__value">{{ offer.rooms }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.floor.title }}:</span>
            <span :class="$style.item__value">{{ offer.floor }}/{{ offer.floors }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.area_full.title }}:</span>
            <span :class="$style.item__value">{{ offer.area_full }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.area_living.title }}:</span>
            <span :class="$style.item__value">{{ offer.area_living }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.area_kitchen.title }}:</span>
            <span :class="$style.item__value">{{ offer.area_kitchen }}</span>
          </div>
        </li>
<!--         <li :class="$style.list__item">
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
        </li> -->
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
    float: left;
  }

  .photo {
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .author__meta {
    margin-left: 70px;
    padding: 4px 0;
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
  
  import AppFilters from '../helpers/filters.js';
  import mdl from '../../models/offer.js';

  export default {
    name: 'offer-details-apartments',
    props: ['offer', 'company', 'author'],
    filters: AppFilters,
    computed: {
      offerType() {
        let type = ['', 'Продать', 'Сдать'][this.offer.type];
        switch(this.offer.object) {
          case 1: return type + ' квартиру';
          case 2: return type + ' комнату';
          case 3: return type + ' коммерческую';
          case 4: return type + ' дом или дачу';
          case 5: return type + ' гараж или хозблок';
          case 6: return type + ' земеьный участок';
        }
      }
    },
    data() {
      return {
        mdl: mdl.getModel(['meta', 'general', 'offer', 'address', 'params'])
      }
    },
    methods: {
      humanize: function(key, value) {
        console.log(key, value)
        let r = mdl.getOptionTitle(key, value);

        return r;
      }
      
    }
  }
</script>