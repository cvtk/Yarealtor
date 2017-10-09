<template>
  <div :class="$style.apartments_filter">
    <div :class="$style.filter">
      <div :class="$style.filter__option">
        <ui-select
          @input="filterByGeneralFields"
          placeholder="Предложение"
          :options="[ { value: 1, label: 'Покупка' }, { value: 2, label: 'Аренда' },]"
          v-model="general.op">
        </ui-select>
      </div>
      <div :class="$style.filter__option">
        <ui-select
          @input="filterByGeneralFields"
          :placeholder="mdl.object.title"
          :options="mdl.object.options"
          v-model="general.object">  
        </ui-select>
      </div>
      <div :class="$style.filter__option">
        <ui-textbox
          @input="filterByGeneralFields"
          type="number"
          :min=1000
          :placeholder="mdl.price_from.title"
          v-model="general.price_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option">
        <ui-textbox
          @input="filterByGeneralFields"
          type="number"
          :min=0
          :placeholder="mdl.price_to.title"
          v-model="general.price_to">
        </ui-textbox>
      </div>

      <div :class="$style.filter__option" v-if="general.object.value <= 6">
        <ui-autocomplete
          @input="onInput"
          @select="onSelect"
          :filter="filter"
          :suggestions="suggestions"
          :placeholder="obj.locality.title"
          v-model="object.locality">
        </ui-autocomplete>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value <= 6">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.district.title"
          :options="obj.district.options"
          v-model="object.district">  
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 6">
        <ui-textbox
          @input="filterByObjectFields"
          type="number"
          :min=0
          :placeholder="obj.area_from.title"
          v-model="object.area_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value < 6">
        <ui-textbox
          @input="filterByObjectFields"
          type="number"
          :min=0
          :placeholder="obj.area_to.title"
          v-model="object.area_to">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value === 4 || general.object.value === 6">
        <ui-textbox
          @input="filterByObjectFields"
          type="number"
          :min=0
          :placeholder="obj.cottage_area_from.title"
          v-model="object.cottage_area_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value === 4 || general.object.value === 6">
        <ui-textbox
          @input="filterByObjectFields"
          type="number"
          :min=0
          :placeholder="obj.cottage_area_to.title"
          v-model="object.cottage_area_to">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value === 4">
        <ui-textbox
          @input="filterByObjectFields"
          type="number"
          :min=0
          :placeholder="obj.floor_from.title"
          v-model="object.floor_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value === 4">
        <ui-textbox
          @input="filterByObjectFields"
          type="number"
          :min=0
          :placeholder="obj.floor_to.title"
          v-model="object.floor_to">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 3 || general.object.value === 4">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.rooms.title"
          :options="obj.rooms.options"
          v-model="object.rooms">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value <= 6">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.type.title"
          :options="obj.type.options"
          v-model="object.type">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 3 || general.object.value === 4 || general.object.value === 5">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.material.title"
          :options="obj.material.options"
          v-model="object.material">  
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 3">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.furnish.title"
          :options="obj.furnish.options"
          v-model="object.furnish">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value === 4 || general.object.value === 6">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.infra.title"
          :options="obj.infra.options"
          v-model="object.infra">  
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value === 4 || general.object.value === 6">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.direction.title"
          :options="obj.direction.options"
          v-model="object.direction">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 3">
        <ui-select multiple
          @input="filterByObjectFields"
          :placeholder="obj.bath.title"
          :options="obj.bath.options"
          v-model="object.bath">  
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 4">
        <ui-select
          @input="filterByObjectFields"
          :placeholder="obj.floor.title"
          :options="obj.floor.options"
          v-model="object.floor">
        </ui-select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .apartments_filter {
    position: relative;
    background-color: #fff;
    white-space: nowrap;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 0;
    min-width: 280px;
    padding: 10px 15px 0;
  }
  .filter {
    position: relative;
    margin: 0 -15px;
    &:after { @include clearfix }
  }

  .filter__option {
    position: relative;
    display: block;
    min-height: 48px;
    float: left;
    padding: 0 15px;
  }

</style>

<script>
  import AppInput from '../modules/inputs.vue';
  import DropdownMenu from '../modules/dropdown-menu.vue';
  import mdl from '../../models/request.js';
  import geo from '../helpers/geo.js';

  export default {
    name: 'apartments-filter',
    props: ['auth', 'data'],
    components: { AppInput, DropdownMenu },
    data() {
      return {
        mdl: mdl.model(['general']),
        obj: {},
        object: {}, general: {},
        results: {},
        local: this.data
      }
    },
    created() {
      this.general = mdl.init('general');
      this.initModel(this.general.object);
    },
    watch: {
      'general.object': function(object) {
        this.initModel(object);
      },
      data() {
        this.local = this.data;
      }
    },
    computed: {
      suggestions: function() {
        if ( !this.results.length ) return [];
        return this.results.map( (e, i) => ({ value: i, label: `${e.typeShort}. ${e.name}` }) );
      }
    },
    methods: {
      initModel(object) {
        let type = mdl.objectTypes()[object.value];
        this.obj = mdl.model([type]);
        this.object = mdl.init(type);
      },
      filter(suggestion, query) {
        return true;
      },

      onInput(value) {
        geo.getCity(value, (err, data) => {
          this.results = data.result;
        });
      },
      onSelect(item) {
        let value = item.value;
        this.object.locality = this.results[value].name;
      },
      filterByGeneralFields() {
        this.local = this.data.filter( e => {
          return ( e.op.value === this.general.op.value || typeof this.general.op.value === 'undefined') &&
            ( this.general.object.value === e.object.value || typeof this.general.object.value === 'undefined') &&
              ( e.price_from >= parseInt(this.general.price_from) || !this.general.price_from ) && 
                ( e.price_to <= parseInt(this.general.price_to) || !this.general.price_to )
        })
        this.$emit('change', this.local)
      },
      filterByObjectFields() {
      }
    }
  }
</script>