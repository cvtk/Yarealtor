<template>
  <div :class="$style.object">
    <div :class="$style.object__row">
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
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'area_full'"></span>
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
          />
        </div>
        <div :class="$style.row__50">
          <default-number v-model="local.minimal_area"
            :label="mdl.minimal_area.title"
            msg="Обязательное поле"
          />
        </div>
        <div :class="$style.row__50">
          <default-number v-model="local.floor"
            :label="mdl.floor.title"
            msg="Выберите этаж"
          />
        </div>
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'floors'"></span>
          <default-number v-model="local.floors"
            :label="mdl.floors.title"
            :validate="validation.floors"
            msg="Укажите этажность"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__100">
          <div :class="$style.wrapper">
            <default-checkbox v-model="local.leaseAllBuilding" :label="mdl.leaseAllBuilding.title" />
          </div>
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Дополнительно</h3>
            <div :class="$style.row__100">
              <default-select v-model="local.parking"
                :label="mdl.parking.title"
                :options="mdl.parking.options"
                nameField="title"
              />
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.roomFurniture"
                  :label="mdl.roomFurniture.title"
                />
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.phone"
                  :label="mdl.phone.title"
                /> 
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.internet"
                  :label="mdl.internet.title"
                />
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.security_alarm"
                  :label="mdl.security_alarm.title"
                />
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.fire_alarm"
                  :label="mdl.fire_alarm.title"
                />
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.accessSystem"
                  :label="mdl.accessSystem.title"
                />
              </div>
            </div>
          </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Условия аренды</h3>
          <div :class="$style.row__50">
            <default-select v-model="local.leaseType"
              :label="mdl.leaseType.title"
              :options="mdl.leaseType.options"
              nameField="title"
            />
          </div>
          <div :class="$style.row__50">
            <span :class="$style.validation" v-if="currentField === 'leaseAddPayments'"></span>
            <default-select v-model="local.leaseAddPayments"
              :label="mdl.leaseAddPayments.title"
              :options="mdl.leaseAddPayments.options"
              :validate="validation.leaseAddPayments"
              msg="Обязательное поле"
              nameField="title"
            />
          </div>
          <div :class="$style.row__50">
            <default-number v-model="local.communalPaymentsSummer"
            :label="mdl.communalPaymentsSummer.title"
          />
          </div>
          <div :class="$style.row__50">
            <default-number v-model="local.communalPaymentsWinter"
            :label="mdl.communalPaymentsWinter.title"
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
    name: 'lease-apartment',
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
          area_full: !!this.local.area_full,
          floors: !!this.local.floors,
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