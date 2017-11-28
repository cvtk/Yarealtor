<template>
  <div :class="$style.object">
    <div :class="$style.fieldgroups">
      <div :class="$style.fieldgroups__group">
        <div :class="$style.group">
          <span :class="$style.group__title">Параметры</span>
            <div :class="$style.group__row">
              <div :class="$style.row">
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'locality'"></span>
                  <ui-autocomplete floating-label
                    @input="onInput"
                    @select="onSelect"
                    :filter="filter"
                    :suggestions="suggestions"
                    :label="mdl.locality.title"
                    v-model="local.locality">
                  </ui-autocomplete>
                </div>
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'district'"></span>
                  <ui-select multiple
                    floating-label
                    :label="mdl.district.title"
                    :options="mdl.district.options"
                    v-model="local.district">  
                  </ui-select>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.area_from.title"
                    v-model="local.area_from">
                  </ui-textbox>
                </div>
                <div :class="$style.col">
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.area_to.title"
                    v-model="local.area_to">
                  </ui-textbox>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'floor_from'"></span>
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.floor_from.title"
                    v-model="local.floor_from">
                  </ui-textbox>
                </div>
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'floor_to'"></span>
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.floor_to.title"
                    v-model="local.floor_to">
                  </ui-textbox>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'cottage_area_from'"></span>
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.cottage_area_from.title"
                    v-model="local.cottage_area_from">
                  </ui-textbox>
                </div>
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'cottage_area_to'"></span>
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.cottage_area_to.title"
                    v-model="local.cottage_area_to">
                  </ui-textbox>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'type'"></span>
                  <ui-select multiple
                    floating-label
                    :label="mdl.type.title"
                    :options="mdl.type.options"
                    v-model="local.type">
                  </ui-select>
                </div>
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'roomFurniture'"></span>
                  <ui-select floating-label
                    :label="mdl.roomFurniture.title"
                    :options="mdl.roomFurniture.options"
                    v-model="local.roomFurniture">  
                  </ui-select>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'leaseType'"></span>
                  <ui-select
                    floating-label
                    :label="mdl.leaseType.title"
                    :options="mdl.leaseType.options"
                    v-model="local.leaseType">  
                  </ui-select>
                </div>
                <div :class="$style.col">
                  <ui-select multiple
                    floating-label
                    :label="mdl.infra.title"
                    :options="mdl.infra.options"
                    v-model="local.infra">
                  </ui-select>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <ui-select multiple
                    floating-label
                    :label="mdl.rooms.title"
                    :options="mdl.rooms.options"
                    v-model="local.rooms">  
                  </ui-select>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import mdl from '../../models/request.js';
  import geo from '../helpers/geo.js';

  export default {
    name: 'lease-cottage',
    props: ['value'],
    components: { },
    data() {
      return {
        mdl: mdl.model(['cottage_lease']),
        local: this.value,
        results: {}, selected: {}
      }
    },
    watch: {
      value() {
        this.local = this.value;
      },
      isValid(state) {
        this.$emit('stateChange', state);
      },
      selected(item) {
        this.local.locality = item.name;
        this.local.localityId = item.id;
        this.local.localityType = item.typeShort;
      }
    },
    computed: {
      validation: function () {
        return {
          locality: !!this.local.locality,
          district: !!this.local.district.length,
          type: !!this.local.type.length,
          roomFurniture: typeof this.local.roomFurniture.value !== 'undefined',
          leaseType: typeof this.local.leaseType.value !== 'undefined'
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
      suggestions: function() {
        if ( !this.results.length ) return [];
        return this.results.map( (e, i) => ({ value: i, label: `${e.typeShort}. ${e.name}` }) );
      },
      currentField: function() {
        let validation = this.validation;
        for ( let key in validation ) {
          if ( !validation[key] ) return key;
        }
      }
    },
    methods: {
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
        this.selected = this.results[value];
      }
    }
  }
</script>

<style lang="sass" module>
  
  @import "./assets/parameters.sass";

</style>