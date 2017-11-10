<template>
  <div :class="$style.map" v-if="dataReady">
    <app-loader v-if="!mapReady" />
    <yandex-map
      :coords="pos"
      zoom="16"
      style="width: 100%; height: 100%;"
      map-type="map"
    >

    <ymap-marker 
      marker-type="placemark"
      :coords="pos"
      :balloon="{ header: name, body: description }"
      :hint-content="name"
      :icon="{ color: 'night', glyph: 'home' }"
      cluster-name="1"
    ></ymap-marker>

  </yandex-map>
  </div>
</template>

<style lang="scss" module>
  .map {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import Vue from 'vue';
  import { yandexMap, ymapMarker } from 'vue-yandex-maps';
  import VueResource from 'vue-resource';
  Vue.use(VueResource);

  const apiUrl = 'https://geocode-maps.yandex.ru/1.x/?';

  export default {
    name: 'offer-map',
    components: { yandexMap, ymapMarker },
    props: {
      address: { type: Array, default: ['Ярославль'] },
      description: { type: String, default: ''}
    },
    data() {
      return {
        dataReady: false,
        mapReady: false,
        pos: '', name: ''
      }
    },
    methods: {
      showMap() {
        this.mapReady = true;
      }
    },
    created() {
      let params = {
        geocode: this.address.join(' '),
        results: 1,
        format: 'json'
      }
      this.$http.jsonp(apiUrl, { params }).then( (response)=> {
        let results = response.body.response.GeoObjectCollection.featureMember[0];
        if ( !!results ) {
          this.pos = results.GeoObject.Point.pos.split(' ').reverse();
          this.name = results.GeoObject.name;
          this.dataReady = true;
          setTimeout( this.showMap, 2500 );
        }
      })
    }
  }
</script>