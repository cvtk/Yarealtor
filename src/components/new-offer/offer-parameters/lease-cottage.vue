<template>
  <div :class="$style.object">
    <div :class="$style.object__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'cottage_type'"></span>
          <default-select v-model="local.cottage_type"
            :label="mdl.cottage_type.title"
            :options="mdl.cottage_type.options"
            nameField="title"
          /> 
        </div>
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'rooms'"></span>
          <default-number v-model="local.rooms"
            :label="mdl.rooms.title"
            :validate="validation.rooms"
            msg="Количество комнат"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'cottage_area'"></span>
          <default-number v-model="local.cottage_area"
            :label="mdl.cottage_area.title"
            :validate="validation.cottage_area"
            msg="Выберите площадь"
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
        <div :class="$style.group">
          <h3 :class="$style.group__title">Дополнительно</h3>
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
                <default-checkbox v-model="local.television"
                  :label="mdl.television.title"
                />
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.washingMachine"
                  :label="mdl.washingMachine.title"
                />
              </div>
            </div>
            <div :class="$style.row__50">
              <div :class="$style.item">
                <default-checkbox v-model="local.refrigerator"
                  :label="mdl.refrigerator.title"
                />
              </div>
            </div>
          </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.group">
          <h3 :class="$style.group__title">Условия аренды</h3>
          <div :class="$style.row__33">
            <span :class="$style.validation" v-if="currentField === 'nationality'"></span>
            <default-select v-model="local.nationality"
              :label="mdl.nationality.title"
              :options="mdl.nationality.options"
              :validate="validation.nationality"
              msg="Обязательное поле"
              nameField="title"
            />
          </div>
          <div :class="$style.row__33">
            <span :class="$style.validation" v-if="currentField === 'leaseAddPayments'"></span>
            <default-select v-model="local.leaseAddPayments"
              :label="mdl.leaseAddPayments.title"
              :options="mdl.leaseAddPayments.options"
              :validate="validation.leaseAddPayments"
              msg="Обязательное поле"
              nameField="title"
            />
          </div>
          <div :class="$style.row__33">
            <default-select v-model="local.leaseType"
              :label="mdl.leaseType.title"
              :options="mdl.leaseType.options"
              nameField="title"
            />
          </div>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.businessTrip"
                :label="mdl.businessTrip.title"
              />
            </div>
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
          cottage_type: !!this.local.cottage_type,
          rooms: !!this.local.rooms,
          cottage_area: !!this.local.cottage_area,
          floors: !!this.local.floors,
          nationality: !!this.local.nationality,
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