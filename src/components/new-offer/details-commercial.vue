<template>
  <div :class="$style.commercial">
    <div :class="$style.commercial__row">
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Тип</h3>
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
        <div :class="$style.row__50">
          <default-select v-model="local.commercial_material"
            :label="mdl.commercial_material.title"
            :options="mdl.commercial_material.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.special_floor"
            :label="mdl.special_floor.title"
            :options="mdl.special_floor.options"
            nameField="title"
          />
        </div>
      </div>
      <div :class="$style.row">
        
        <div :class="$style.row__33">
          <default-number v-model="local.floor"
            :label="mdl.floor.title"
            :validate="validation.floor"
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