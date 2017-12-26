<template>
  <div :class="$style.offer" v-if="dataReady">
    <div :class="[$style.row, $style._shadow ]">
    
      <div :class="$style.offer__map">
        <offer-map :address="[ request.locality, request.district[0].label + ' район' ]" />
      </div>
      <div :class="$style.offer__details">
        <request-details-apartment :author="author" :request="request" :company="company" :ghostMode="ghostMode" v-if="request.object.value === 1" />
        <request-details-room :author="author" :request="request" :company="company" :ghostMode="ghostMode" v-if="request.object.value === 2" />
        <request-details-commercial :author="author" :request="request" :company="company" :ghostMode="ghostMode" v-if="request.object.value === 3" />
        <request-details-cottage :author="author" :request="request" :company="company" :ghostMode="ghostMode" v-if="request.object.value === 4" />
        <request-details-garage :author="author" :request="request" :company="company" :ghostMode="ghostMode" v-if="request.object.value === 5" />
        <request-details-land :author="author" :request="request" :company="company" :ghostMode="ghostMode" v-if="request.object.value === 6" />
      </div>
    </div>
    <div :class="$style.offer__description">
      <div :class="$style.description">
        <div :class="$style.description__text" v-if="!!request.description">Дополнительная информация: {{ request.description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .offer {
    position: relative;
    height: 100%;
    margin: 2px;
    @media (max-width: $bp-medium) {
      .offer__toggler { left: 20px }
      .offer__map, .offer__images {
        margin-left: 0;
      }
      .offer__details {
        position: relative;
        width: 100%;
        min-height: 70vh;
        background-color: #fff;
      }
    }
  }


  .offer__map {
    position: relative;
    height: 90vh;
    margin-left: 280px;
  }

  .row {
    position: relative;
    margin-bottom: 20px;
    background-color: #fff;
    &:after { @include clearfix }
    &._shadow { box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12) }
  }

  .offer__details {
    position: absolute;
    top: 0;
    width: 280px;
    height: 80vh;
    background-color: #fff;
  }

  .offer__description {
    position: relative;
    margin: 10px 0;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .description {
    position: relative;
  }

  .description__waymark { margin: 10px; font-size: 16px }
  .description__text { margin: 10px; font-size: 16px }

</style>

<script>
  import AppLoader from '../app-loader.vue';
  import OfferMap from '../offer/offer-map.vue';
  import firebase from '../../firebase.js';
  import RequestDetailsApartment from './request-details-apartment.vue';
  import RequestDetailsRoom from './request-details-room.vue';
  import RequestDetailsCommercial from './request-details-commercial.vue';
  import RequestDetailsCottage from './request-details-cottage.vue';
  import RequestDetailsGarage from './request-details-garage.vue';
  import RequestDetailsLand from './request-details-land.vue';

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'request',
    props: ['auth', 'user', 'request', 'model', 'ghostMode'],
    components: { AppLoader, OfferMap, RequestDetailsApartment, RequestDetailsRoom, RequestDetailsCommercial, RequestDetailsCottage, RequestDetailsGarage, RequestDetailsLand },
    data() {
      return {
        dataReady: false,
        author: {},
        company: {}
      }
    },
    created() {
      usersRef.child(this.request.author).once('value', author => this.author = author.val() );

      companiesRef.child(this.request.company).once('value', company => {
        this.company = company.val();
        this.dataReady = true;
      });
    },
    methods: {
      map(arr) {
        return arr.map( e => e.label ).join(', ');
      }
    }
  }
</script>