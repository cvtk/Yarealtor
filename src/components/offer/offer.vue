<template>
  <div :class="$style.offer" v-if="dataReady">
    <div :class="[$style.row, $style._shadow ]">
    
      <div :class="[ $style.offer__toggler, showMap && $style._pic ]" @click="showMap = !showMap"></div>
      <div :class="$style.offer__images" v-show="!showMap">
        <offer-images :images="offer.images" v-if="imagesAvailable" />
        <div :class="$style.images" v-else>
          <img :class="$style.images__placeholder" src="/static/image-not-found.png" alt="Изображение не добавлено">
        </div>
      </div>
      <div :class="$style.offer__map" v-show="showMap">
        <offer-map :description="offer.waymark"
          :address="[ offer.locality, offer.street, offer.building ]"
        />
      </div>
      <div :class="$style.offer__details">
        <div :class="$style.details">
          <offer-details-apartment :offer="offer" :company="company" :author="author" v-if="offer.object === 1" />
          <offer-details-room :offer="offer" :company="company" :author="author" v-if="offer.object === 2" />
          <offer-details-commercial :offer="offer" :company="company" :author="author" v-if="offer.object === 3" />
          <offer-details-cottage :offer="offer" :company="company" :author="author" v-if="offer.object === 4" />
          <offer-details-garage :offer="offer" :company="company" :author="author" v-if="offer.object === 5" />
          <offer-details-land :offer="offer" :company="company" :author="author" v-if="offer.object === 6" />
        </div>
      </div>
    </div>
    <div :class="$style.offer__description">
      <div :class="$style.description">
        <div :class="$style.description__waymark" v-if="!!offer.waymark">Ориентир: {{ offer.waymark }}</div>
        <div :class="$style.description__text" v-if="!!offer.description">Дополнительная информация: {{ offer.description }}</div>
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
        min-height: 60vh;
        background-color: #fff;
      }
    }
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
    background-color: #fff;
  }

  .offer__map, .offer__images {
    margin-left: 280px;
    height: 80vh;
  }

  .offer__toggler {
    position: absolute;
    top: 20px;
    left: 300px;
    height: 54px;
    cursor: pointer;
    padding: 12px 15px;
    text-align: center;
    background-color: #fff;
    background-color: #364150;
    opacity: 0.75;
    transition: opacity, .35s;
    z-index: 5;
    &:hover { opacity: .65 }
    &:after {
      content: "\e033";
      font-family: "Icons";
      font-size: 22px;
      color: #fff;
    }
    &._pic:after { content: "\e032" }
  }

  .images {
    position: relative;
    padding: 10px;
  }

  .images__placeholder {
    max-width: 100%;
    height: auto;
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

  .description__waymark { margin: 10px }
  .description__text { margin: 10px }

</style>

<script>
  import AppLoader from '../app-loader.vue';
  import OfferDetailsApartment from './offer-details-apartment.vue';
  import OfferDetailsRoom from './offer-details-room.vue';
  import OfferDetailsCommercial from './offer-details-commercial.vue';
  import OfferDetailsCottage from './offer-details-cottage.vue';
  import OfferDetailsGarage from './offer-details-garage.vue';
  import OfferDetailsLand from './offer-details-land.vue';
  import OfferImages from './offer-images.vue';
  import OfferMap from './offer-map.vue';
  import Icon from 'vue-awesome/components/Icon.vue';
  import 'vue-awesome/icons/map';
  import 'vue-awesome/icons/map-o';
  import 'vue-awesome/icons/comments';
  import 'vue-awesome/icons/comments-o';
  import 'vue-awesome/icons/star';
  import 'vue-awesome/icons/star-o';
  import firebase from '../../firebase.js';

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'offer',
    props: ['auth', 'user', 'offer'],
    components: { AppLoader, OfferDetailsApartment, OfferDetailsRoom, 
      OfferDetailsCommercial, OfferDetailsCottage, OfferDetailsGarage, OfferDetailsLand, Icon, OfferImages, OfferMap
    },
    data() {
      return {
        dataReady: false,
        showMap: false,
        author: {},
        company: {}
      }
    },
    computed: {
      imagesAvailable() {
        return !!this.offer.images.length;
      }
    },
    created() {
      usersRef.child(this.offer.author).once('value', author => this.author = author.val() );

      companiesRef.child(this.offer.company).once('value', company => {
        this.company = company.val();
        this.dataReady = true;
      });
    }
  }
</script>