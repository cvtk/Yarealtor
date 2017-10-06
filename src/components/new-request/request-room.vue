<template>
  <div :class="$style.room">
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
                  <span :class="$style.validation" v-if="currentField === 'area_from'"></span>
                  <ui-textbox floating-label
                    type="number"
                    :min=0
                    :label="mdl.area_from.title"
                    v-model="local.area_from">
                  </ui-textbox>
                </div>
                <div :class="$style.col">
                  <span :class="$style.validation" v-if="currentField === 'area_to'"></span>
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
                  <span :class="$style.validation" v-if="currentField === 'rooms'"></span>
                  <ui-select multiple
                    floating-label
                    :label="mdl.rooms.title"
                    :options="mdl.rooms.options"
                    v-model="local.rooms">
                  </ui-select>
                </div>
                <div :class="$style.col">
                  <ui-select multiple
                    floating-label
                    :label="mdl.type.title"
                    :options="mdl.type.options"
                    v-model="local.type">
                  </ui-select>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <ui-select multiple
                    floating-label
                    :label="mdl.material.title"
                    :options="mdl.material.options"
                    v-model="local.material">  
                  </ui-select>
                </div>
                <div :class="$style.col">
                  <ui-select multiple
                    floating-label
                    :label="mdl.furnish.title"
                    :options="mdl.furnish.options"
                    v-model="local.furnish">
                  </ui-select>
                </div>
              </div>
              <div :class="$style.row">
                <div :class="$style.col">
                  <ui-select multiple
                    floating-label
                    :label="mdl.bath.title"
                    :options="mdl.bath.options"
                    v-model="local.bath">  
                  </ui-select>
                </div>
                <div :class="$style.col">
                  <ui-select floating-label
                    :label="mdl.floor.title"
                    :options="mdl.floor.options"
                    v-model="local.floor">
                  </ui-select>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  
  @import "../../assets/style.scss";

  .room {
    position: relative;
  }
  
  .fieldgroups { position: relative }

  .fieldgroups__group {
    position: relative;
    background-color: #fff;
    padding: 20px;
  }

  .group {
    position: relative;
    border: 1px solid #c2cad8;
    padding: 10px;
    padding-top: 20px;
  }

  .group__title {
    position: absolute;
    color: #c2cad8;
    top: -10px;
    left: 15px;
    background-color: #fff;
    padding: 0 5px;
    font-style: italic;
    margin: 0;
  }

  .group__row {
    position: relative;
  }

  .row {
    position: relative;
    margin: 0 -10px;
    margin-bottom: 15px;
    &:after { @include clearfix }
  }

  .col {
    position: relative;
    float: left;
    width: 50%;
    padding: 0 10px;
    @media( max-width: $bp-small ) {
      float: none;
      width: 100%;
    }
  }

  .col_full {
    position: relative;
    padding: 0 10px;
  }

  .validation {
    display: block;
    position: absolute;
    right: 12px;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ee6052;
    cursor: pointer;
    box-shadow: 0 0 0 rgba(204,169,44, 0.4);
    animation: pulse .75s infinite;
  }

  .validation:hover {
    animation: none;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(238,96,82, 0.4);
    }
    70% {
        -webkit-box-shadow: 0 0 0 10px rgba(238,96,82, 0);
    }
    100% {
        -webkit-box-shadow: 0 0 0 0 rgba(238,96,82, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(238,96,82, 0.4);
      box-shadow: 0 0 0 0 rgba(238,96,82, 0.4);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(238,96,82, 0);
        box-shadow: 0 0 0 10px rgba(238,96,82, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(238,96,82, 0);
        box-shadow: 0 0 0 0 rgba(238,96,82, 0);
    }
  }
</style>

<script>
  
  import mdl from '../../models/request.js';
  import geo from '../helpers/geo.js';

  export default {
    name: 'request-room',
    props: ['value'],
    components: { },
    data() {
      return {
        mdl: mdl.model(['room']),
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
          locality: !!this.local.locality && this.local.locality === this.selected.name,
          district: !!this.local.district.length,
          area_from: this.local.area_from > 0,
          area_to: this.local.area_to > 0,
          rooms: !!this.local.rooms.length
          //description: !!this.local.description.trim(),
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