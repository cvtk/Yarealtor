<template>
  <div :class="$style.create">
    <div :class="$style.create__bar">
      <breadcrumbs :items="[{ text: 'Главная', to: 'root'}, { text: 'Спрос', to: 'requests'}, { text: 'Создать заявку', to: ''}]" /> 
    </div>
    <div :class="$style.create__toolbar">
      <toolbar title="Создать" sub="новую заявку"></toolbar>
    </div>
    <div :class="$style.create__main">
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
                              v-model="general.op">
                            </ui-select>
                          </div>
                          <div :class="$style.col">
                            <span :class="$style.validation" v-if="currentField === 'object'"></span>
                            <ui-select floating-label
                              :label="mdl.object.title"
                              :options="mdl.object.options"
                              v-model="general.object">  
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
                              v-model="general.price_from">
                            </ui-textbox>
                          </div>
                          <div :class="$style.col">
                            <span :class="$style.validation" v-if="currentField === 'price_to'"></span>
                            <ui-textbox floating-label
                              type="number"
                              :min=0
                              :label="mdl.price_to.title"
                              v-model="general.price_to">
                            </ui-textbox>
                          </div>
                        </div>
                        <div :class="$style.row">
                          <div :class="$style.col_full">
                            <ui-textbox floating-label
                              type="text"
                              :multiLine="true"
                              :label="mdl.description.title"
                              v-model="general.description">
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
                  v-model="object"
                  v-if="general.object.value === 1"
                />
                <request-room 
                  @stateChange="onStateChange"
                  v-model="object"
                  v-if="general.object.value === 2"
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
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import Breadcrumbs from './page-blocks/breadcrumbs.vue'
  import Toolbar from './page-blocks/toolbar.vue'
  import RequestApartment from './new-request/request-apartment.vue';
  import RequestRoom from './new-request/request-room.vue';

  const requestsRef = firebase.database().ref('requests');

  export default {
    name: 'new-request',
    props: ['auth', 'user'],
    components: { AppLoader, AppAdSidebar, Breadcrumbs, Toolbar, RequestApartment, RequestRoom },
    data() {
      return {
        dataReady: false,
        mdl: mdl.model(['meta', 'general']),
        general: {},
        meta: {},
        object: {},
        saving: false,
        objectState: false
      }
    },
    created() {
      this.initData();
      this.dataReady = true;
    },
    watch: {
      'general.object': function(object) {
        this.initModel(object);
      }
    },

    computed: {
      validation: function () {
        return {
          op: !!this.general.op.value,
          price_from: parseInt(this.general.price_from) > 1000,
          price_to: parseInt(this.general.price_to) > parseInt(this.general.price_from),
          object: !!this.general.object.value
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
      initData() {
        this.general = mdl.init('general');
        this.meta = mdl.init('meta');
        this.meta.author = this.user.key;
        this.meta.company = this.user.company.key;
        this.initModel(this.general.object);
      },
      initModel(object) {
        let type = [ '', 'apartment', 'room', 'commercial' ][object.value];
        this.object = mdl.init(type);
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
        this.meta.key = this.meta.key || requestsRef.push().key;

        if ( !this.meta.created ) {
          this.meta.created = unix;
        } else {
          this.meta.modified = unix;
        }

        let prep = {};
        Object.assign(prep, this.meta, this.general, this.object);

        requestsRef.child(this.meta.key).update(prep)
          .then( () => {
            this.$parent.$refs.notify.createSnackbar({
              message: 'Создана новая заявка',
            });
            this.initData();
            this.saving = false;
            this.$router.push({name: 'requests'});
          })
          .catch( error => console.log('Request save error: ', error) );
        
      },

    }
  }
</script>