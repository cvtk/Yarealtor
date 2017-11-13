<template>
  <div :class="$style.object">
    <div :class="$style.object__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'area_full'"></span>
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
          />
        </div>
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'garage_material'"></span>
          <default-select v-model="local.garage_material"
            :label="mdl.garage_material.title"
            :options="mdl.garage_material.options"
            :validate="validation.garage_material"
            msg="Выберите этаж"
            nameField="title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Условия аренды</h3>
          <div :class="$style.row__100">
            <span :class="$style.validation" v-if="currentField === 'leaseAddPayments'"></span>
            <default-select v-model="local.leaseAddPayments"
              :label="mdl.leaseAddPayments.title"
              :options="mdl.leaseAddPayments.options"
              :validate="validation.leaseAddPayments"
              msg="Обязательное поле"
              nameField="title"
            />
          </div>
          <div :class="$style.row__100">
            <default-select v-model="local.leaseType"
              :label="mdl.leaseType.title"
              :options="mdl.leaseType.options"
              nameField="title"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DefaultSelect from '../../default-inputs/default-select.vue';
  import DefaultNumber from '../../default-inputs/default-number.vue';
  import DefaultCheckbox from '../../default-inputs/default-checkbox.vue';
  import mdl from '../../../models/offer.js';

  export default {
    name: 'lease-garage',
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
          area_full: !!this.local.area_full,
          garage_material: !!this.local.garage_material,
          leaseAddPayments: !!this.local.leaseAddPayments
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

<style lang="sass" module>
  @import "../assets/parameters.sass";
</style>