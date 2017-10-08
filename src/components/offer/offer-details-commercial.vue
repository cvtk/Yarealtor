<template>
  <div :class="$style.details">
    <div :class="$style.details__author">
      <div :class="$style.author">
        <div :class="$style.author__photo">
          <div :class="$style.photo" :style="{ 'background-image': 'url(' + author.photo + ')' }"></div>
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
            <span :class="$style.item__value">{{ offer.price | price }} руб.</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.agent_pay">
            <span :class="$style.item__title">{{ mdl.agent_pay.title }}:</span>
            <span :class="$style.item__value">{{ offer.agent_pay | price }} руб.</span>
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
            <span :class="$style.item__title">Тип недвижимости:</span>
            <span :class="$style.item__value">{{ commercialType }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.commercial_material.title }}:</span>
            <span :class="$style.item__value">{{ humanize('commercial_material', offer.commercial_material) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.floor.title }}:</span>
            <span :class="$style.item__value">{{ offer.floor }}/{{ offer.floors }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.special_floor">
            <span :class="$style.item__title">{{ mdl.special_floor.title }}:</span>
            <span :class="$style.item__value">{{ humanize('special_floor', offer.special_floor) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.area_full.title }}:</span>
            <span :class="$style.item__value">{{ offer.area_full }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.special_floor">
            <span :class="$style.item__title">{{ mdl.special_floor.title }}:</span>
            <span :class="$style.item__value">{{ humanize('special_floor', offer.special_floor) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.minimal_area">
            <span :class="$style.item__title">{{ mdl.minimal_area.title }}:</span>
            <span :class="$style.item__value">{{ humanize('minimal_area', offer.minimal_area) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.line">
            <span :class="$style.item__title">{{ mdl.line.title }}:</span>
            <span :class="$style.item__value">{{ humanize('line', offer.line) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.furnish">
            <span :class="$style.item__title">{{ mdl.furnish.title }}:</span>
            <span :class="$style.item__value">{{ humanize('furnish', offer.furnish) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.planning">
            <span :class="$style.item__title">{{ mdl.planning.title }}:</span>
            <span :class="$style.item__value">{{ humanize('planning', offer.planning) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.ceilings_height">
            <span :class="$style.item__title">{{ mdl.ceilings_height.title }}:</span>
            <span :class="$style.item__value">{{ offer.ceilings_height }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.power">
            <span :class="$style.item__title">{{ mdl.power.title }}:</span>
            <span :class="$style.item__value">{{ offer.power }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!commercialAdds">
            <span :class="$style.item__title">Дополнительно:</span>
            <span :class="$style.item__value">{{ commercialAdds }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.windows">
            <span :class="$style.item__title">{{ mdl.windows.title }}:</span>
            <span :class="$style.item__value">{{ humanize('windows', offer.windows) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.owner">
            <span :class="$style.item__title">{{ mdl.owner.title }}:</span>
            <span :class="$style.item__value">{{ humanize('owner', offer.owner) }}</span>
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
      commercialType() {
        let types = [ 'commercial_retail', 'commercial_office', 'commercial_industrial',
          'commercial_warehouse', 'commercial_business', 'commercial_land', 'commercial_apartments' ];

        return this.joinFields(types);
      },

      commercialAdds() {
        let adds = [ 'internet', 'security_alarm', 'fire_alarm', 'shutters', 'monument' ];

        return this.joinFields(adds);
      },

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
      joinFields(types) {
        if ( typeof types === 'undefined' ) return '';

        return types.reduce( (r, key) => {
          if ( typeof this.offer[key] !== 'undefined' && this.offer[key] ) {
            let type = this.mdl[key].title;
            r.push(type);
          }
          return r;
        }, []).join(', ');
      },
      humanize: mdl.getOptionTitle
    }
  }
</script>