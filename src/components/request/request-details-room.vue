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
            <span :class="$style.item__title">Заявка:</span>
            <span :class="$style.item__value">{{ request.op.label }}, {{ request.object.label }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Цена:</span>
            <span :class="$style.item__value">{{ request.price_from | price }} − {{ request.price_to | price }} руб. </span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Город:</span>
            <span :class="$style.item__value">{{ request.localityType }}. {{ request.locality }}</span>
          </div>
        </li>
        <li :class="$style.list__item">
          <div :class="$style.item">
            <span :class="$style.item__title">Районы:</span>
            <span :class="$style.item__value">{{ map(request.district) }}</span>
          </div>
        </li>
        <li :class="$style.list__item"  v-if="isNotEmpty(request.area_from) || isNotEmpty(request.area_to)">
          <div :class="$style.item">
            <span :class="$style.item__title">Площадь:</span>
            <span :class="$style.item__value">{{ request.area_from }} − {{ request.area_to }} м²</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="isNotEmpty(request.rooms)">
          <div :class="$style.item">
            <span :class="$style.item__title">Комнат:</span>
            <span :class="$style.item__value">{{ map(request.rooms) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="isNotEmpty(request.type)">
          <div :class="$style.item">
            <span :class="$style.item__title">Тип:</span>
            <span :class="$style.item__value">{{ map(request.type) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="isNotEmpty(request.material)">
          <div :class="$style.item">
            <span :class="$style.item__title">Материал дома:</span>
            <span :class="$style.item__value">{{ map(request.material) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="isNotEmpty(request.furnish)">
          <div :class="$style.item">
            <span :class="$style.item__title">Отделка:</span>
            <span :class="$style.item__value">{{ map(request.furnish) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="isNotEmpty(request.bath)">
          <div :class="$style.item">
            <span :class="$style.item__title">Санузел:</span>
            <span :class="$style.item__value">{{ map(request.bath) }}</span>
          </div>
        </li>
        <li :class="$style.list__item" v-if="isNotEmpty(request.floor)">
          <div :class="$style.item">
            <span :class="$style.item__title">Этаж:</span>
            <span :class="$style.item__value">{{ request.floor.label }}</span>
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
    name: 'request-details-apartment',
    props: ['request', 'company', 'author', 'ghostMode'],
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
        showPhone: false
      }
    },
    methods: {
      isNotEmpty(value) {
        return typeof value !== 'undefined' && !!value.length && !!value;
      },
      map(arr) {
        return arr.map( e => e.label ).join(', ');
      }
      
    }
  }
</script>

<style lang="sass" module>
  @import "./assets/request-details.sass";
</style>