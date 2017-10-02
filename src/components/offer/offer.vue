<template>
  <div :class="$style.offer">
    <div :class="[$style.row, $style._shadow ]">
      <div :class="$style.offer__details">
        <offer-details :offer="offer" />
      </div>
      <div :class="$style.offer__images" v-if="!showMap">
        <offer-images :images="offer.images" />
      </div>
      <div :class="$style.offer__map" v-if="showMap">
        <offer-map :description="offer.waymark"
          :address="[ offer.locality, offer.street, offer.building ]"
        />
      </div>
    </div>
    <div :class="$style.row">
      <div :class="$style.offer__waymark">{{ offer.waymark }}</div>
    </div>
    <div :class="$style.row">
      <div :class="$style.offer__description">{{ offer.description }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .offer {
    position: relative;
    height: 100%;
    margin: 20px 2px;
  }

  .row {
    position: relative;
    margin-bottom: 20px;
    &:after { @include clearfix }
    &._shadow { box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12) }
  }

  .offer__details {
    position: absolute;
    width: 280px;
    height: 90vh;
    background-color: #fff;
  }

  .offer__map, .offer__images {
    margin-left: 280px;
    height: 90vh;
  }

</style>

<script>
  import AppLoader from '../app-loader.vue';
  import OfferDetails from './offer-details.vue';
  import OfferImages from './offer-images.vue';
  import OfferMap from './offer-map.vue';
  import Icon from 'vue-awesome/components/Icon.vue';
  import 'vue-awesome/icons/map';
  import 'vue-awesome/icons/map-o';
  import 'vue-awesome/icons/comments';
  import 'vue-awesome/icons/comments-o';
  import 'vue-awesome/icons/star';
  import 'vue-awesome/icons/star-o';

  export default {
    name: 'offer',
    props: ['auth', 'user', 'offer'],
    components: { AppLoader, OfferDetails, Icon, OfferImages, OfferMap },
    data() {
      return {
        dataReady: false,
        showMap: false
      }
    },
    created() {
      this.dataReady = true;
    }
  }
</script>