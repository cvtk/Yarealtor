<template>
  <div :class="$style.offer" v-if="dataReady">
    <div :class="[$style.row, $style._shadow ]">
    
      <div :class="$style.offer__map">
        <offer-map :address="[ request.locality ]"
        />
      </div>
      <div :class="$style.offer__details">
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
                  <span :class="$style.item__title">Заявка:</span>
                  <span :class="$style.item__value">{{ request.op.label }}, {{ request.object.label }}</span>
                </div>
              </li>
              <li :class="$style.list__item">
                <div :class="$style.item">
                  <span :class="$style.item__title">Адрес:</span>
                  <span :class="$style.item__value">{{ request.localityType }}. {{ request.locality }}, {{ map(request.district) }}</span>
                </div>
              </li>
              <li :class="$style.list__item">
                <div :class="$style.item">
                  <span :class="$style.item__title">Комнат:</span>
                  <span :class="$style.item__value">{{ map(request.rooms) }}</span>
                </div>
              </li>
              <li :class="$style.list__item">
                <div :class="$style.item">
                  <span :class="$style.item__title">Площадь:</span>
                  <span :class="$style.item__value">{{ request.area_from }} - {{ request.area_to }} м²</span>
                </div>
              </li>
              <li :class="$style.list__item">
                <div :class="$style.item">
                  <span :class="$style.item__title">Санузел:</span>
                  <span :class="$style.item__value">{{ request.area_from }} - {{ request.area_to }} м²</span>
                </div>
              </li>
            </ul>
          </div>
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


  .offer__map {
    position: relative;
    height: 80vh;
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

  .details {
    position: absolute;
    height: 80vh;
    width: 100%;
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
    props: ['auth', 'user', 'request', 'model'],
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
    },
    methods: {
      map(arr) {
        return arr.map( e => e.label ).join(', ');
      }
    }
  }
</script>