<template>
  <div :class="$style.garage">
    <div :class="$style.garage__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
          />
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.garage_material"
            :label="mdl.garage_material.title"
            :options="mdl.garage_material.options"
            :validate="validation.garage_material"
            msg="Выберите этаж"
            nameField="title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";
  
  .garage {
    @media(max-width: $bp-small) {
      label { font-size: 14px !important }
    }
  }

  .garage__row {
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