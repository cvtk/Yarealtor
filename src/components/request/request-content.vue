<template>
  <div :class="$style.offer" v-if="dataReady">
    <div :class="[$style.row, $style._shadow ]">
    
      <div :class="$style.offer__map">
        <offer-map :address="[ request.locality, request.district ]"
        />
      </div>
      <div :class="$style.offer__details">
        <div :class="$style.details">
          
        </div>
      </div>
    </div>
    <div :class="$style.offer__description">
      <div :class="$style.description">
        <div :class="$style.description__text" v-if="!!request.description">Дополнительная информация: {{ reauest.description }}</div>
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
  import OfferMap from '../offer/offer-map.vue';
  import firebase from '../../firebase.js';

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'request',
    props: ['auth', 'user', 'request'],
    components: { AppLoader, OfferMap },
    data() {
      return {
        dataReady: false,
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
      usersRef.child(this.request.author).once('value', author => this.author = author.val() );

      companiesRef.child(this.request.company).once('value', company => {
        this.company = company.val();
        this.dataReady = true;
      });
    }
  }
</script>