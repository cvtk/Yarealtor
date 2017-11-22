<template>
  <div :class="$style.create">
    <div :class="$style.create__bar">
      <breadcrumbs :items="[{ text: 'Главная', to: 'root'}, { text: 'Спрос', to: 'requests'}, { text: 'Изменить заявку', to: ''}]" /> 
    </div>
    <div :class="$style.create__toolbar">
      <toolbar title="Правка" sub="изменить заявку"></toolbar>
    </div>
    <div :class="$style.create__main" v-if="dataReady">
      <div :class="$style.main">
        <div :class="$style.main__fieldgroups">
          <transition name="fade">
            <div :class="$style.row">
              <div :class="$style.col_resp">
                <div :class="$style.fieldgroups">
                  <div :class="$style.fieldgroups__group">
                    <div :class="$style.group">
                      <span :class="$style.group__title">Основные настройки</span>
                      <div :class="$style.group__row">
                        <div :class="$style.row">
                          <div :class="$style.col">
                            <span :class="$style.validation" v-if="currentField === 'op'"></span>
                            <ui-select floating-label
                              :label="mdl.op.title"
                              :options="mdl.op.options"
                              v-model="request.op">
                            </ui-select>
                          </div>
                          <div :class="$style.col">
                            <span :class="$style.validation" v-if="currentField === 'object'"></span>
                            <ui-select floating-label
                              :disabled="true"
                              :label="mdl.object.title"
                              :options="mdl.object.options"
                              v-model="request.object">  
                            </ui-select>
                          </div>
                        </div>
                        <div :class="$style.row">
                          <div :class="$style.col">
                            <span :class="$style.validation" v-if="currentField === 'price_from'"></span>
                            <ui-textbox floating-label
                              type="number"
                              :min=1000
                              :label="mdl.price_from.title"
                              v-model="request.price_from">
                            </ui-textbox>
                          </div>
                          <div :class="$style.col">
                            <span :class="$style.validation" v-if="currentField === 'price_to'"></span>
                            <ui-textbox floating-label
                              type="number"
                              :min=0
                              :label="mdl.price_to.title"
                              v-model="request.price_to">
                            </ui-textbox>
                          </div>
                        </div>
                        <div :class="$style.row">
                          <div :class="$style.col_full">
                            <ui-textbox floating-label
                              type="text"
                              :multiLine="true"
                              :label="mdl.description.title"
                              v-model="request.description">
                            </ui-textbox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.col_resp">
                <request-apartment 
                  @stateChange="onStateChange"
                  v-model="request"
                  v-if="request.object.value === 1"
                />
                <request-room 
                  @stateChange="onStateChange"
                  v-model="request"
                  v-if="request.object.value === 2"
                />
                <request-commercial
                  @stateChange="onStateChange"
                  v-model="request"
                  v-if="request.object.value === 3"
                />
                <request-cottage
                  @stateChange="onStateChange"
                  v-model="request"
                  v-if="request.object.value === 4"
                />
                <request-garage
                  @stateChange="onStateChange"
                  v-model="request"
                  v-if="request.object.value === 5"
                />
                <request-land
                  @stateChange="onStateChange"
                  v-model="request"
                  v-if="request.object.value === 6"
                />
              </div>
            </div>
          </transition>  
        </div>
        <div :class="$style.main__actions">
          <div :class="$style.actions">
            <div :class="$style.actions__save">
              <ui-button :color="!isValid && 'red' || 'green'" :loading="saving" @click="onSave">
                Сохранить
              </ui-button>
            </div>
          </div>
        </div>
      </div> 
    <app-ad-sidebar :class="$style.create__ad"></app-ad-sidebar>
    </div>
  </div>
</template>
<style>
  .fade-enter-active, .fade-leave-active { transition: opacity .5s }
  .fade-enter, .fade-leave-to { opacity: 0 }
</style>
<style lang="scss" module>

  @import "../assets/style.scss";

  .create {
    position: relative;
    height: 100%;
    padding: 20px;
    @media (max-width: $bp-small) {
      .main { margin-right: 0 }
      .create__ad {
        position: relative;
        margin: 20px auto 0;
      }
    }
  }

  .create__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
    &:after { @include clearfix }
  }

  .create__toolbar { margin: 25px 0 }
  
  .create__main { position: relative }
  .main__fieldgroups { position: relative }

  .main__actions { position: relative }

  .main {
    position: relative;
    margin-right: 300px;
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
    margin-bottom: 10px;
    &:after { @include clearfix }
  }

  .col {
    position: relative;
    float: left;
    width: 50%;
    padding: 0 10px;
  }

  .col_resp {
    position: relative;
    float: left;
    width: 50%;
    padding: 0 10px;
    @media( max-width: $bp-large ) {
      float: none;
      width: 100%;
    }
  }

  .col_full {
    position: relative;
    padding: 0 10px;
  }

  .actions {
    &:after { @include clearfix }
    position: relative;
    padding: 12px 0;
    margin-top: 20px;
  }
  
  .actions__save { float: right }

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

  import mdl from '../models/request.js';
  import Firebase from 'firebase';
  import firebase from '../firebase.js';
  import AppLoader from './app-loader.vue';
  import Breadcrumbs from './page-blocks/breadcrumbs.vue'
  import Toolbar from './page-blocks/toolbar.vue'
  import RequestApartment from './new-request/request-apartment.vue';
  import RequestRoom from './new-request/request-room.vue';
  import RequestCommercial from './new-request/request-commercial.vue';
  import RequestCottage from './new-request/request-cottage.vue';
  import RequestGarage from './new-request/request-garage.vue';
  import RequestLand from './new-request/request-land.vue';

  const requestsRef = firebase.database().ref('requests');

  export default {
    name: 'new-request',
    props: ['auth', 'user'],
    components: { AppLoader, Breadcrumbs, Toolbar, RequestApartment, RequestRoom, RequestCommercial, RequestCottage, RequestGarage, RequestLand },
    data() {
      return {
        dataReady: false,
        mdl: mdl.model(['meta', 'general']),
        request: {},
        saving: false,
        objectState: true
      }
    },
    created() {
      requestsRef.child(this.$route.params.id).once('value', (request) => {
        if ( request.exists() ) {
          this.request = request.val();
          this.dataReady = true;
        }
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.id } });
        }
      });
    },

    computed: {
      validation: function () {
        return {
          op: !!this.request.op.value,
          price_from: parseInt(this.request.price_from) > 1000,
          price_to: parseInt(this.request.price_to) > parseInt(this.request.price_from),
          object: !!this.request.object.value
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        }) && this.objectState;
      },
      currentField: function() {
        let validation = this.validation;
        for ( let key in validation ) {
          if ( !validation[key] ) return key;
        }
      }
    },

    methods: {
      onStateChange(state) {
        this.objectState = state;
      },
      onSave() {
        if ( !this.isValid ) {
          this.$parent.$refs.notify.createSnackbar({
            message: 'Заполните все необходимые поля (отмечены красным индикатором)',
          });
          return;
        }
        this.saving = true;
        let unix = Firebase.database.ServerValue.TIMESTAMP;
        this.request.modified = unix;

        let prep = Object.assign({}, this.request);

        for ( let field in prep ) {
          if ( typeof prep[field] !== 'undefined' && typeof prep[field] === 'object' ) {
            if ( prep[field].length === 0 ) { prep[field] = '' }
          }
        }

        requestsRef.child(this.request.key).update(prep)
          .then( () => {
            this.$parent.$refs.notify.createSnackbar({
              message: 'Заявка изменена',
            });
            this.saving = false;
            this.$router.push({ name: 'requests'});
          })
          .catch( error => {
            this.$parent.$refs.notify.createSnackbar({
              message: `Ошибка сети: ${error.message}`,
            });
          })
      },

    }
  }
</script>