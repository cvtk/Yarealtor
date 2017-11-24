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
            <router-link v-if="!ghostMode" :class="$style.meta__company" :to="{ name: 'company', params: { page: company.page } }">
              {{ company.name }}
            </router-link>
            <span :class="$style.meta__phone" @click="showPhone = !showPhone">Телефон: {{ showPhone ? author.mobile: 'скрыт' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.details__list">
      <ul :class="$style.list">
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Предложение:</span>
            <span :class="$style.item__value">Сдать квартиру</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Цена:</span>
            <span :class="$style.item__value">{{ offer.price | price }} руб.</span>
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
            <span :class="$style.item__value">{{ offer.area_full }} м²</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.balcony.title }}:</span>
            <span :class="$style.item__value">{{ humanize('balcony', offer.balcony) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.nationality">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.nationality.title }}:</span>
            <span :class="$style.item__value">{{ humanize('nationality', offer.nationality) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.leaseAddPayments">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.leaseAddPayments.title }}:</span>
            <span :class="$style.item__value">{{ humanize('leaseAddPayments', offer.leaseAddPayments) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.couchettes">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.couchettes.title }}:</span>
            <span :class="$style.item__value">{{ humanize('couchettes', offer.couchettes) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.leaseType">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.leaseType.title }}:</span>
            <span :class="$style.item__value">{{ humanize('leaseType', offer.leaseType) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.kids">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.kids.title }}:</span>
            <span :class="$style.item__value">{{ humanize('kids', offer.kids) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.animals">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.animals.title }}:</span>
            <span :class="$style.item__value">{{ humanize('animals', offer.animals) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.businessTrip">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.businessTrip.title }}:</span>
            <span :class="$style.item__value">{{ humanize('businessTrip', offer.businessTrip) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!addFields.length">
          <div :class="$style.item">
            <span :class="$style.item__value_wo_title">{{ addFields }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  
  import AppFilters from '../../helpers/filters.js';
  import mdl from '../../../models/offer.js';

  export default {
    name: 'offer-details-apartments',
    props: ['offer', 'company', 'author', 'ghostMode'],
    filters: AppFilters,
    computed: {
      addFields() {
        let adds = [ 'roomFurniture', 'kitchenFurniture', 'television', 'washingMachine', 'refrigerator' ];

        return this.joinFields(adds);
      },
    },
    data() {
      return {
        mdl: mdl.getModel(['meta', 'general', 'offer', 'address', 'params']),
        showPhone: false
      }
    },
    methods: {
      humanize: function(key, value) {
        return mdl.getOptionTitle(key, value);
      },
      joinFields(types) {
        if ( typeof types === 'undefined' ) return '';

        return types.reduce( (r, key) => {
          if ( typeof this.offer[key] !== 'undefined' && this.offer[key] ) {
            let type = this.mdl[key].title;
            r.push(type);
          }
          return r;
        }, []).join(', ');
      }
    }
  }
</script>

<style lang="sass" module>
  @import "../assets/offer-details.sass";
</style>