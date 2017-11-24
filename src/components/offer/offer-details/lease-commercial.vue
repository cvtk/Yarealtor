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
            <span :class="$style.item__value">Сдать коммерческую</span>
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
            <span :class="$style.item__title">Тип:</span>
            <span :class="$style.item__value">{{ commercialFields }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.floor.title }}:</span>
            <span :class="$style.item__value">{{ offer.floor || '*' }}/{{ offer.floors }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.area_full.title }}:</span>
            <span :class="$style.item__value">{{ offer.area_full }} м²</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.minimal_area">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.minimal_area.title }}:</span>
            <span :class="$style.item__value">{{ offer.minimal_area }} м²</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.leaseAllBuilding">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.leaseAllBuilding.title }}:</span>
            <span :class="$style.item__value">{{ humanize('leaseAllBuilding', offer.leaseAllBuilding) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.parking">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.parking.title }}:</span>
            <span :class="$style.item__value">{{ humanize('parking', offer.parking) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.leaseAddPayments">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.leaseAddPayments.title }}:</span>
            <span :class="$style.item__value">{{ humanize('leaseAddPayments', offer.leaseAddPayments) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.leaseType">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.leaseType.title }}:</span>
            <span :class="$style.item__value">{{ humanize('leaseType', offer.leaseType) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.communalPaymentsSummer">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.communalPaymentsSummer.title }}:</span>
            <span :class="$style.item__value">{{ humanize('communalPaymentsSummer', offer.communalPaymentsSummer) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="!!offer.communalPaymentsWinter">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.communalPaymentsWinter.title }}:</span>
            <span :class="$style.item__value">{{ humanize('communalPaymentsWinter', offer.communalPaymentsWinter) }}</span>
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
      commercialFields() {
        let commercial = [ 'commercial_retail', 'commercial_office', 'commercial_industrial', 'commercial_warehouse', 'commercial_business', 'commercial_land', 'commercial_apartments' ];

        return this.joinFields(commercial);
      },
      addFields() {
        let adds = [ 'roomFurniture', 'phone', 'internet', 'security_alarm', 'fire_alarm', 'accessSystem' ];

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