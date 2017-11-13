<template>
  <div :class="$style.object">
    <div :class="$style.object__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <span :class="$style.validation" v-if="currentField === 'building_type'"></span>
          <default-select v-model="local.building_type"
            :label="mdl.building_type.title"
            :options="mdl.building_type.options"
            :validate="validation.building_type"
            msg="Выберите тип дома"
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
        <div :class="$style.row__33">
          <span :class="$style.validation" v-if="currentField === 'area_full'"></span>
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
          />
        </div>
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
      </div>
      <div :class="$style.row">
        <div :class="$style.row__100">
          <div :class="$style.wrapper">
            <default-checkbox v-model="local.balcony" :label="mdl.balcony.title" />
          </div>
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
                <default-checkbox v-model="local.kitchenFurniture"
                  :label="mdl.kitchenFurniture.title"
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
          <div :class="$style.row__50">
            <span :class="$style.validation" v-if="currentField === 'accommodation'"></span>
            <default-select v-model="local.accommodation"
              :label="mdl.accommodation.title"
              :options="mdl.accommodation.options"
              :validate="validation.accommodation"
              msg="Обязательное поле"
              nameField="title"
            />
          </div>
          <div :class="$style.row__50">
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
            <default-number v-model="local.couchettes"
              :label="mdl.couchettes.title"
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
              <default-checkbox v-model="local.kids"
                :label="mdl.kids.title"
              />
            </div>
          </div>
          <div :class="$style.row__50">
            <div :class="$style.item">
              <default-checkbox v-model="local.animals"
                :label="mdl.animals.title"
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
    name: 'lease-room',
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
          building_type: !!this.local.building_type,
          rooms: !!this.local.rooms,
          area_full: !!this.local.area_full,
          floor: !!this.local.floor,
          floors: !!this.local.floors,
          accommodation: !!this.local.accommodation,
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