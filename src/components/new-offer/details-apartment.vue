<template>
  <div :class="$style.apartment">
    <div :class="$style.apartment__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.building_type"
            :label="mdl.building_type.title"
            :options="mdl.building_type.options"
            :validate="validation.building_type"
            msg="Выберите тип дома"
            nameField="title"
          />
          
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.material"
            :label="mdl.material.title"
            :options="mdl.material.options"
            :validate="validation.material"
            msg="Выберите материал дома"
            nameField="title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__33">
          <default-number v-model="local.rooms"
            :label="mdl.rooms.title"
            :validate="validation.rooms"
            msg="Количество комнат"
          />
          
        </div>
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
      </div>
      <div :class="$style.row">
        <div :class="$style.row__33">
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.area_living"
            :label="mdl.area_living.title"
            :validate="validation.area_living"
            msg="Обязательное поле"
          />
        </div>
        <div :class="$style.row__33">
          <default-number v-model="local.area_kitchen"
            :label="mdl.area_kitchen.title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.furnish"
            :label="mdl.furnish.title"
            :options="mdl.furnish.options"
            nameField="title"
          />
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.bath"
            :label="mdl.bath.title"
            :options="mdl.bath.options"
            :validate="validation.bath"
            msg="Обязательное поле"
            nameField="title"
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
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .apartment {
    @media(max-width: $bp-small) {
      label { font-size: 14px !important }
    }
  }

  .apartment__row {
    position: relative;
    margin: 0 -10px;
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
    name: 'details-apartment',
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
          material: !!this.local.material,
          rooms: !!this.local.rooms,
          floor: !!this.local.floor,
          floors: !!this.local.floors,
          area_full: !!this.local.area_full,
          area_living: !!this.local.area_living,
          bath: !!this.local.bath
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