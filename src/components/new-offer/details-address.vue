<template>
  <div :class="$style.address">
    <div :class="$style.address__row">
      <div :class="$style.row">
        <span :class="$style.validation" v-if="currentField === 'locality'"></span>
        <div :class="$style.row__100">
          <city-field v-model="local.locality"
            v-if="tmplt.includes('locality')"
            :label="mdl.locality.title"
            :validate="validation.locality"
            msg="Выберите город из списка"
            @citySelect="onObjectSelect"
          />
        </div>
      </div>
    </div>
    <div :class="$style.address__row">
      <div :class="$style.row">
        <div :class="$style.row__70">
          <span :class="$style.validation" v-if="currentField === 'street'"></span>
          <street-field v-model="local.street"
            v-if="tmplt.includes('street')"
            :label="mdl.street.title"
            :validate="validation.street"
            :parentId="local.localityId"
            msg="Выберите улицу из списка"
            @streetSelect="onObjectSelect"
          />
        </div>
        <div :class="$style.row__30">
          <span :class="$style.validation" v-if="currentField === 'building'"></span>
          <building-field v-model="local.building"
            v-if="tmplt.includes('building')"
            :label="mdl.building.title"
            :validate="validation.building"
            :parentId="local.streetId"
            msg="Выберите дом"
            @buildingSelect="onObjectSelect"
          />
        </div>
      </div>
    </div>
    <div :class="$style.address__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'district'"></span>
          <default-select v-model="local.district"
            v-if="tmplt.includes('district')"
            :label="mdl.district.title"
            :options="mdl.district.options"
            :validate="validation.district"
            msg="Выберите район"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-text v-model="local.waymark"
            v-if="tmplt.includes('waymark')"
            :label="mdl.waymark.title"
          />
        </div>
      </div>
    </div>
    <div :class="$style.address__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.direction"
            v-if="tmplt.includes('direction')"
            :label="mdl.direction.title"
            :options="mdl.direction.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-number v-model="local.distance"
            v-if="tmplt.includes('distance')"
            :label="mdl.distance.title"
          />
        </div>
      </div>
    </div>
    <div :class="$style.address__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-number v-model="local.cadastral_number"
            v-if="tmplt.includes('cadastral_number')"
            :label="mdl.cadastral_number.title"
          />
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.disposition"
            v-if="tmplt.includes('disposition')"
            :label="mdl.disposition.title"
            :options="mdl.disposition.options"
            nameField="title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .address { /* */}

  .address__row {
    position: relative;
    margin: 0 -10px;
  }

  .row {
    position: relative;
    &:after { @include clearfix }
  }

  .row__100 { position: relative; padding: 0 10px }
  .row__70 { position: relative; padding: 0 10px; float: left; width: 66.6666667% }
  .row__60 { position: relative; padding: 0 10px; float: left; width: 60% }
  .row__50 { position: relative; padding: 0 10px; float: left; width: 50% }
  .row__30 { position: relative; padding: 0 10px; float: left; width: 33.333333% }

  .validation {
    display: block;
    position: absolute;
    right: 10px;
    top: 28px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #ee6052;
    cursor: pointer;
    box-shadow: 0 0 0 rgba(204,169,44, 0.4);
    animation: pulse .75s infinite;
  }

  .validation:hover {
    animation: none;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(238,96,82, 0.4);
    }
    70% {
        -webkit-box-shadow: 0 0 0 10px rgba(238,96,82, 0);
    }
    100% {
        -webkit-box-shadow: 0 0 0 0 rgba(238,96,82, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(238,96,82, 0.4);
      box-shadow: 0 0 0 0 rgba(238,96,82, 0.4);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(238,96,82, 0);
        box-shadow: 0 0 0 10px rgba(238,96,82, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(238,96,82, 0);
        box-shadow: 0 0 0 0 rgba(238,96,82, 0);
    }
  }
</style>

<script>
  import DefaultSelect from '../default-inputs/default-select.vue';
  import DefaultText from '../default-inputs/default-text.vue';
  import DefaultNumber from '../default-inputs/default-number.vue';
  import CityField from '../address-inputs/city-field.vue';
  import StreetField from '../address-inputs/street-field.vue';
  import BuildingField from '../address-inputs/building-field.vue';
  import mdl from '../../models/offer.js';

  export default {
    name: 'details-address',
    props: ['value'],
    components: { DefaultSelect, DefaultText, DefaultNumber, CityField, StreetField, BuildingField },
    data() {
      return {
        mdl: {},
        local: this.value,
        localityObject: {},
        streetObject: {},
        buildingObject: {}
      }
    },
    watch: {
      value() {
        this.local = this.value;
      },
      isValid(value) {
        this.$emit('stateChange', value, 'address')
      }
    },
    methods: {
      onObjectSelect(object) {
        switch(object.contentType) {
          case 'city': {
            this.localityObject = object;
            this.local.localityType = object.typeShort;
            this.local.localityId = object.id;

            this.streetObject = {};
            this.local.street = '';
            this.local.streetType = '';
            this.local.streetId = '';

            this.buildingObject = {};
            this.local.building = '';
            this.local.buildingType = '';
            this.local.buildingId = '';
            break;
          }
          case 'street': {
            this.streetObject = object;
            this.local.streetType = object.typeShort;
            this.local.streetId = object.id;

            this.buildingObject = {};
            this.local.building = '';
            this.local.buildingType = '';
            this.local.buildingId = '';
            break;
          }
          case 'building': {
            this.buildingObject = object;
            this.local.buildingType = object.typeShort;
            this.local.buildingId = object.id;
            break;
          }
        } 
      }
    },
    created() {
      this.mdl = mdl.getModel( ['address'] );
    },
    computed: {
      tmplt: function () {
        return mdl.getFields(this.local.object);
      },
      validation: function () {
        return {
          locality: !!this.local.locality && !!this.local.localityType && !!this.local.localityId,
          street: this.local.object === 6 || !!this.local.street && !!this.local.streetType && !!this.local.streetId,
          building: this.local.object === 6 || this.local.object === 5 ||
            (!!this.local.building && !!this.local.buildingType && !!this.local.buildingId),
          district: this.local.object === 5 || this.local.object === 6 || !!this.local.district
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
      currentField: function() {
        let validation = this.validation;
        for ( let key in validation ) {
          if ( !validation[key] ) return key;
        }
      }
    }
  }
</script>