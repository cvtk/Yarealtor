<template>
  <div :class="$style.land">
    <div :class="$style.land__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'land_type'"></span>
          <default-select v-model="local.land_type"
            :label="mdl.land_type.title"
            :options="mdl.land_type.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'cottage_area'"></span>
          <default-number v-model="local.cottage_area"
            :label="mdl.cottage_area.title"
            :validate="validation.cottage_area"
            msg="Выберите площадь"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Инфраструктура</h3>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_gas" :label="mdl.cottage_gas.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_power" :label="mdl.cottage_power.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_water" :label="mdl.cottage_water.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_sewer" :label="mdl.cottage_sewer.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.internet" :label="mdl.internet.title" />
            </div>
          </div>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_security" :label="mdl.cottage_security.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_forest" :label="mdl.cottage_forest.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_entrance" :label="mdl.cottage_entrance.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.cottage_bus" :label="mdl.cottage_bus.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";
  
  .land {
    @media(max-width: $bp-small) {
      label { font-size: 14px !important }
    }
  }

  .land__row {
    position: relative;
    margin: 0 -10px;
  }

  .group {
    position: relative;
    border: 1px solid #c2cad8;
    padding: 10px;
    margin: 10px;
    margin-top: 20px;
    background-color: #fff;
    &:after { @include clearfix }
  }

  .group__title {
    position: absolute;
    left: 10px;
    top: -12px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 300;
    margin: 0;
    padding: 0 10px;
  }

  .item {
    padding: 10px 0;
  }

  .row {
    position: relative;
    &:after { @include clearfix }
  }
  .row__33 {  position: relative; padding: 0 10px; float: left; width: 33.333333% }
  .row__50 {  position: relative; padding: 0 10px; float: left; width: 50% }
  .row__100 {  position: relative; padding: 0 10px; width: 100% }

  .wrapper {
    padding: 12px 0;
  }

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
  import DefaultNumber from '../default-inputs/default-number.vue';
  import DefaultCheckbox from '../default-inputs/default-checkbox.vue';
  import mdl from '../../models/offer.js';

  export default {
    name: 'details-commercial',
    props: ['value'],
    components: { DefaultSelect, DefaultNumber, DefaultCheckbox },
    data() {
      return {
        mdl: {},
        local: this.value
      }
    },
    watch: {
      value() {
        this.local = this.value;
      },
      isValid(value) {
        this.$emit('stateChange', value, 'parameters')
      }
    },
    methods: {
    },
    created() {
      this.mdl = mdl.getModel( ['params'] );
    },
    computed: {
      validation: function () {
        return {
          land_type: !!this.local.land_type,
          cottage_area: !!this.local.cottage_area
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