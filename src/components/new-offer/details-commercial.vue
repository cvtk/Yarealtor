<template>
  <div :class="$style.commercial">
    <div :class="$style.commercial__row">
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Тип</h3>
          <span :class="[ $style.validation, $style._group]" v-if="currentField === 'commercial_type'"></span>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_retail" :label="mdl.commercial_retail.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_office" :label="mdl.commercial_office.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_industrial" :label="mdl.commercial_industrial.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_warehouse" :label="mdl.commercial_warehouse.title" />
            </div>
          </div>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_business" :label="mdl.commercial_business.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_land" :label="mdl.commercial_land.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.commercial_apartments" :label="mdl.commercial_apartments.title" />
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__33">
          <span :class="$style.validation" v-if="currentField === 'commercial_material'"></span>
          <default-select v-model="local.commercial_material"
            :label="mdl.commercial_material.title"
            :options="mdl.commercial_material.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__33">
          <default-select v-model="local.special_floor"
            :label="mdl.special_floor.title"
            :options="mdl.special_floor.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.price_permeter" 
            :label="mdl.price_permeter.title" 
          />
        </div>
      </div>
      <div :class="$style.row">
        
        <div :class="$style.row__33">
          <span :class="$style.validation" v-if="currentField === 'floor'"></span>
          <default-number v-model="local.floor"
            :label="mdl.floor.title"
            :validate="validation.floor"
            msg="Выберите этаж"
          />
        </div>
        <div :class="$style.row__33">
          <span :class="$style.validation" v-if="currentField === 'floors'"></span>
          <default-number v-model="local.floors"
            :label="mdl.floors.title"
            :validate="validation.floors"
            msg="Укажите этажность"
          />
        </div>
        <div :class="$style.row__33">
          <span :class="$style.validation" v-if="currentField === 'area_full'"></span>
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__33">
          <default-number v-model="local.minimal_area"
            :label="mdl.minimal_area.title"
          />
        </div>
        <div :class="$style.row__33">
          <default-select v-model="local.line"
            :label="mdl.line.title"
            :options="mdl.line.options"
            :validate="validation.line"
            msg="Обязательное поле"
            nameField="title"
          />
        </div>
        <div :class="$style.row__33">
          <default-select v-model="local.furnish"
            :label="mdl.furnish.title"
            :options="mdl.furnish.options"
            nameField="title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__33">
          <default-select v-model="local.planning"
            :label="mdl.planning.title"
            :options="mdl.planning.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.ceilings_height"
            :label="mdl.ceilings_height.title"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.power"
            :label="mdl.power.title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Дополнительно</h3>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.internet" :label="mdl.internet.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.security_alarm" :label="mdl.security_alarm.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.fire_alarm" :label="mdl.fire_alarm.title" />
            </div>
          </div>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.shutters" :label="mdl.shutters.title" />
            </div>
            <div :class="$style.item">
              <default-checkbox v-model="local.monument" :label="mdl.monument.title" />
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.windows"
            :label="mdl.windows.title"
            :options="mdl.windows.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.owner"
            :label="mdl.owner.title"
            :options="mdl.owner.options"
            nameField="title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";
  
  .commercial {
    @media(max-width: $bp-small) {
      label { font-size: 14px !important }
    }
  }

  .commercial__row {
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
  .row__33 { position: relative; padding: 0 10px; float: left; width: 33.333333% }
  .row__50 { position: relative; padding: 0 10px; float: left; width: 50% }
  .row__100 { position: relative; padding: 0 10px; width: 100% }

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
    &._group { top: 10px }
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
          commercial_type: !!this.local.commercial_retail || !!this.local.commercial_office || 
            !!this.local.commercial_industrial || !!this.local.commercial_warehouse || 
            !!this.local.commercial_business || !!this.local.commercial_land || 
            !!this.local.commercial_apartments,
          commercial_material: !!this.local.commercial_material,
          floor: !!this.local.floor,
          floors: !!this.local.floors,
          area_full: !!this.local.area_full
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