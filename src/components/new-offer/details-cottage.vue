<template>
  <div :class="$style.cottage">
    <div :class="$style.cottage__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.cottage_type"
            :label="mdl.cottage_type.title"
            :options="mdl.cottage_type.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-number v-model="local.cottage_area"
            :label="mdl.cottage_area.title"
            :validate="validation.cottage_area"
            msg="Выберите площадь"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.material"
            :label="mdl.material.title"
            :options="mdl.material.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.furnish"
            :label="mdl.furnish.title"
            :options="mdl.furnish.options"
            nameField="title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__33">
          <default-number v-model="local.rooms"
            :label="mdl.rooms.title"
            :validate="validation.rooms"
            msg="Выберите этаж"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.floors"
            :label="mdl.floors.title"
            :validate="validation.floors"
            msg="Укажите этажность"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
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
  
  .cottage {
    @media(max-width: $bp-small) {
      label { font-size: 14px !important }
    }
  }

  .cottage__row {
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
  .row__33 { padding: 0 10px; float: left; width: 33.333333% }
  .row__50 { padding: 0 10px; float: left; width: 50% }
  .row__100 { padding: 0 10px; width: 100% }

  .wrapper {
    padding: 12px 0;
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

        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    }
  }
</script>