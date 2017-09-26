<template>
  <div :class="$style.offer">
    <div :class="$style.row">
      <div :class="$style.offer__details">
        <offer-details :offer="offer" />
      </div>
      <div :class="$style.offer__images">
        <offer-map :description="offer.house_waymark.current"
          :address="[ offer.house_city.current, offer.house_address.current, offer.house_number.current ]"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .offer {
    position: relative;
    height: 100%;
    margin: 20px 2px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .row {
    position: relative;
    &:after { @include clearfix }
  }

  .offer__details {
    position: absolute;
    width: 280px;
    height: 90vh;
    background-color: #fff;
  }

  .offer__images {
    margin-left: 280px;
    height: 90vh;
  }

</style>

<script>
  import AppLoader from '../app-loader.vue';
  import OfferDetails from './offer-details.vue';
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
    props: ['auth', 'offer'],
    components: { AppLoader, OfferDetails, Icon, OfferMap },
    data() {
      return {
        dataReady: false,
      }
    },
    created() {
      this.dataReady = true;
    }
  }
</script>