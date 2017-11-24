<template>
  <div :class="$style.apartments_filter">
    <div :class="$style.filter">
      <div :class="$style.filter__option">
        <ui-select
          @input="filterBy"
          placeholder="Предложение"
          :options="[ { value: 1, label: 'Продажа' }, { value: 2, label: 'Аренда' },]"
          v-model="general.op">
        </ui-select>
      </div>
      <div :class="$style.filter__option">
        <ui-select
          @input="filterBy"
          :placeholder="mdl.object.title"
          :options="mdl.object.options"
          v-model="general.object">  
        </ui-select>
      </div>
      <div :class="$style.filter__option">
        <ui-textbox
          @input="filterBy"
          type="number"
          :min=0
          step=5000
          :placeholder="mdl.price_from.title"
          v-model="general.price_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option">
        <ui-textbox
          @input="filterBy"
          type="number"
          :min=0
          step=5000
          :placeholder="mdl.price_to.title"
          v-model="general.price_to">
        </ui-textbox>
      </div>

      <div :class="$style.filter__option" v-if="general.object.value <= 6">
        <ui-autocomplete
          @input="onInput"
          @select="onSelect"
          @change="filterBy"
          :filter="filter"
          :suggestions="suggestions"
          :placeholder="obj.locality.title"
          v-model="object.locality">
        </ui-autocomplete>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value <= 6 && general.object.value !== 5">
        <ui-select multiple
          @input="filterBy"
          :placeholder="obj.district.title"
          :options="obj.district.options"
          v-model="object.district">  
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value <= 6 && general.object.value !== 5">
        <ui-select multiple
          @input="filterBy"
          :placeholder="obj.type.title"
          :options="obj.type.options"
          v-model="object.type">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value === 4 || general.object.value === 6">
        <ui-select multiple
          @input="filterBy"
          :placeholder="obj.direction.title"
          :options="obj.direction.options"
          v-model="object.direction">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 6">
        <ui-textbox
          @input="filterBy"
          type="number"
          :min=0
          :placeholder="obj.area_from.title"
          v-model="object.area_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value < 6">
        <ui-textbox
          @input="filterBy"
          type="number"
          :min=0
          :placeholder="obj.area_to.title"
          v-model="object.area_to">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value === 4 || general.object.value === 6">
        <ui-textbox
          @input="filterBy"
          type="number"
          :min=0
          :placeholder="obj.cottage_area_from.title"
          v-model="object.cottage_area_from">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option"  v-if="general.object.value === 4 || general.object.value === 6">
        <ui-textbox
          @input="filterBy"
          type="number"
          :min=0
          :placeholder="obj.cottage_area_to.title"
          v-model="object.cottage_area_to">
        </ui-textbox>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value === 1 || general.object.value === 4">
        <ui-select multiple
          @input="filterBy"
          :placeholder="obj.rooms.title"
          :options="obj.rooms.options"
          v-model="object.rooms">
        </ui-select>
      </div>
      <div :class="$style.filter__option" v-if="general.object.value < 6 && general.object.value !== 3">
        <ui-select multiple
          @input="filterBy"
          :placeholder="obj.material.title"
          :options="obj.material.options"
          v-model="object.material">  
        </ui-select>
      </div>
    </div>
  </div>
</template>

<script>
  import AppInput from '../modules/inputs.vue';
  import DropdownMenu from '../modules/dropdown-menu.vue';
  import mdl from '../../models/request.js';
  import geo from '../helpers/geo.js';

  export default {
    name: 'object-filter',
    props: ['auth', 'data'],
    components: { AppInput, DropdownMenu },
    data() {
      return {
        mdl: mdl.model(['general']),
        obj: {},
        object: {}, general: {},
        results: {},
        local: this.data,
        mappingVars: {
          type: 'general.op.value',
          object: 'general.object.value',
          price: { from: 'general.price_from', to: 'general.price_to' }
        }
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
        if ( !value ) this.filterBy();
        geo.getCity(value, (err, data) => {
          this.results = data.result;
        });
      },
      onSelect(item) {
        let value = item.value;
        this.object.locality = this.results[value].name;
        this.filterBy();
      },

      isEmpty(v) {
        return ( typeof v === 'undefined' || !v );
      },

      isEqual(a, b) {
        if ( this.isEmpty(b) || this.isEmpty(a) ) return true;
        return a === b;
      },

      inRange(a, from, to) {
        return ( a >= from || this.isEmpty(from) ) && ( a <= to || this.isEmpty(to) );
      },
      inList(array, value) {
        if ( typeof array === 'undefined' || !array.length ) return true;
        return array.some( e => e.value === value );
      },
      typesList() {
        switch(this.general.object.value) {
          case 1: return 'building_type';
          case 2: return 'placement_type';
          case 3: return 'placement_type';
          case 4: return 'cottage_type';
          case 6: return 'land_type';
        }
      },
      materialList() {
        switch(this.general.object.value) {
          case 5: return 'garage_material';
          default: return 'material';
        }
      },
      iterateFields(obj) {
        return this.isEqual( obj.type, this.general.op.value ) &&
                this.isEqual( obj.object, this.general.object.value ) &&
                this.inRange( obj.price, parseInt(this.general.price_from), parseInt(this.general.price_to) ) &&
                this.isEqual( obj.locality, this.object.locality ) &&
                this.inList( this.object.district, obj.district ) &&
                this.inRange( obj.area_full, parseInt(this.object.area_from), parseInt(this.object.area_to) ) &&
                this.inRange( obj.cottage_area, parseInt(this.object.cottage_area_from), parseInt(this.object.cottage_area_to) ) &&
                ( this.inList( this.object.rooms, obj.rooms ) || ( this.inList( this.object.rooms, 7 ) && obj.rooms >= 7 ) ) &&
                this.inList( this.object.type, obj[this.typesList()] ) &&
                this.inList( this.object.material, obj[this.materialList()] )

      },

      filterBy() {
        this.$emit( 'change', this.data.filter( e => this.iterateFields(e) ) )
      },
    }
  }
</script>

<style lang="sass" module>
  @import "../../assets/style.scss";
  .apartments_filter
    position: relative
    background-color: #fff
    white-space: nowrap
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)
    font-size: 0
    min-width: 280px
    padding: 10px 15px 0

  .filter
    position: relative
    margin: 0 -15px
    &:after
      @include clearfix

  .filter__option
    position: relative
    display: block
    min-height: 50px
    float: left
    padding: 0 15px

</style>