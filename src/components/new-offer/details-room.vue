<template>
  <div :class="$style.room">
    <div :class="$style.room__row">
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.placement_type"
            :label="mdl.placement_type.title"
            :options="mdl.placement_type.options"
            :validate="validation.placement_type"
            msg="Выберите тип помещения"
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
            label="Всего комнат"
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
            msg="Этажность"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-select v-model="local.condition_room"
            :label="mdl.condition_room.title"
            :options="mdl.condition_room.options"
            nameField="title"
          />
          
        </div>
        <div :class="$style.row__50">
          <default-select v-model="local.condition_bath"
            :label="mdl.condition_bath.title"
            :options="mdl.condition_bath.options"
            nameField="title"
          />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.row__50">
          <default-number v-model="local.area_full"
            :label="mdl.area_full.title"
            :validate="validation.area_full"
            msg="Обязательное поле"
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
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .room {
    @media(max-width: $bp-small) {
      label { font-size: 14px !important }
    }
  }

  .room__row {
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
  import mdl from '../../models/offer.js';

  export default {
    name: 'details-room',
    props: ['value'],
    components: { DefaultSelect, DefaultNumber },
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
          placement_type: !!this.local.placement_type,
          material: !!this.local.material,
          rooms: !!this.local.rooms,
          floor: !!this.local.floor,
          floors: !!this.local.floors,
          area_full: !!this.local.area_full,
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