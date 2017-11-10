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
            <span :class="$style.item__value">{{ offer.localityType }}. {{ offer.locality }}, {{ offer.streetType }}. {{ offer.street }} {{ offer.buildingType }}. {{ offer.building }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Район:</span>
            <span :class="$style.item__value">{{ humanize('district', offer.district) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.direction">
            <span :class="$style.item__title">{{ mdl.direction.title }}:</span>
            <span :class="$style.item__value">{{ humanize('direction', offer.direction) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.distance">
            <span :class="$style.item__title">{{ mdl.distance.title }}:</span>
            <span :class="$style.item__value">{{ offer.distance }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.cadastral_number">
            <span :class="$style.item__title">{{ mdl.cadastral_number.title }}:</span>
            <span :class="$style.item__value">{{ offer.cadastral_number }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.cottage_type.title }}:</span>
            <span :class="$style.item__value">{{ humanize('cottage_type', offer.cottage_type) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.cottage_area.title }}:</span>
            <span :class="$style.item__value">{{ humanize('cottage_area', offer.cottage_area) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.material.title }}:</span>
            <span :class="$style.item__value">{{ offer.material }}</span>
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
            <span :class="$style.item__title">{{ mdl.floors.title }}:</span>
            <span :class="$style.item__value">{{ offer.floors }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">{{ mdl.area_full.title }}:</span>
            <span :class="$style.item__value">{{ offer.area_full }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!offer.furnish">
            <span :class="$style.item__title">{{ mdl.furnish.title }}:</span>
            <span :class="$style.item__value">{{ humanize('furnish', offer.furnish) }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item" v-if="!!cottageInfrastrucure">
            <span :class="$style.item__title">Инфраструктура:</span>
            <span :class="$style.item__value">{{ cottageInfrastrucure }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  
  import AppFilters from '../helpers/filters.js';
  import mdl from '../../models/offer.js';

  export default {
    name: 'offer-details-apartments',
    props: ['offer', 'company', 'author', 'ghostMode'],
    filters: AppFilters,
    computed: {
      cottageInfrastrucure() {
        let adds = [ 'cottage_gas', 'cottage_power', 'cottage_water',
          'cottage_sewer', 'internet', 'cottage_security', 'cottage_forest', 'cottage_entrance' , 'cottage_bus'];

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
        mdl: mdl.getModel(['meta', 'general', 'offer', 'address', 'params']),
        showPhone: false
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

<style lang="sass" module>
  @import "./assets/offer-details.sass";
</style>