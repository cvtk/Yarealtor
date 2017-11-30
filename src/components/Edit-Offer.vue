<template>
  <div :class="$style.create">
    <div :class="$style.create__bar">
      <breadcrumbs :items="[{ text: 'Главная', to: 'root'}, { text: 'Предложения', to: 'offers'}, { text: 'Изменить предложение', to: ''}]" /> 
    </div>
    <div :class="$style.create__toolbar">
      <toolbar title="Правка" sub="изменить предложение"></toolbar>
    </div>
    <div :class="$style.create__main">
      <div :class="$style.main">
        <div :class="$style.main__steps_controls">
          <steps-controls v-model="currentStep" />
        </div>
        <div :class="$style.main__current_step" v-if="dataReady">
          <transition :name="stepsDirection" mode="out-in">
            <overview-step v-model="offer" v-if="currentStep === 1"
              @stateChange="onStateChange"
              @objectChanged="onObjectChange"
            />
            <details-step v-model="offer" v-else-if="currentStep === 2" @stateChange="onStateChange" />
          </transition>  
        </div>
        <div :class="$style.main__validate">
          <transition name="backward" mode="out-in">
            <div :class="$style.validate" v-if="validateMsg">
              <div :class="$style.validate__text">{{ validateMsg }}</div>
            </div>
          </transition>
        </div>
        <div :class="$style.main__actions">
          <div :class="$style.actions">
            <div :class="$style.actions__previos">
              <default-button icon="previos" label="Назад" @click="onPreviosStep" v-if="currentStep !== 1"/>
            </div>
            <div :class="$style.actions__next">
              <default-button icon="next" label="Вперёд" :red="!isDone" @click="onNextStep" v-if="currentStep !== 2" />
            </div>
            <div :class="$style.actions__save">
              <default-button icon="save" label="Сохранить" :red="!canSave" @click="onSave" />
            </div>
          </div>
        </div>
      </div> 
    <app-ad-sidebar :class="$style.create__ad"></app-ad-sidebar>
    </div>
  </div>
</template>
<style>
  .forward-enter-active {
    transition: right .5s ease-in-out, opacity .45s ease-in-out;
  }
  .forward-leave-active {
    transition: left .5s ease-in-out, opacity .45s ease-in-out;
  }
  .forward-leave { left: 0; opacity: 1; }
  .forward-leave-to { left: -100%; opacity: 0; }
  .forward-enter { right: -100%; opacity: 0; }
  .forward-enter-to { right: 0; opacity: 1; }

  .backward-enter-active {
    transition: left .5s ease-in-out, opacity .45s ease-in-out;
  }
  .backward-leave-active {
    transition: right .5s ease-in-out, opacity .45s ease-in-out;
  }
  .backward-leave { right: 0; opacity: 1; }
  .backward-leave-to { right: -100%; opacity: 0; }
  .backward-enter { left: -100%; opacity: 0; }
  .backward-enter-to { left: 0; opacity: 1; }

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

  .main__actions { position: relative }

  .main__validate{ position: relative }

  .main {
    position: relative;
    margin-right: 300px;
    overflow: hidden;
  }
  
  .validate {
    position: relative;
    padding: 12px 0;
    margin-top: 20px;
    border-right: 4px solid #ee6052;
    text-align: right;
    color: #ee6052;
  }

  .validate__text {
    padding: 0 15px;
  }

  .main__steps_controls {
    position: relative;
  }

  .main__current_step {
    position: relative;
  }

  .actions {
    &:after { @include clearfix }
    position: relative;
    padding: 12px 0;
    margin-top: 20px;
  }
  
  .actions__save { float: right }
  .actions__next { float: right; margin-left: 20px; }
  .actions__previos { float: left }

</style>

<script>
  import mdl from '../models/offer.js';
  import Firebase from 'firebase';
  import firebase from '../firebase.js';
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import Breadcrumbs from './page-blocks/breadcrumbs.vue'
  import Toolbar from './page-blocks/toolbar.vue'
  import StepsControls from './new-offer/steps-controls.vue';
  import OverviewStep from './new-offer/overview.vue';
  import DetailsStep from './new-offer/new-offer-details.vue';
  import DefaultButton from './default-inputs/default-button.vue';

  const offersRef = firebase.database().ref('offers');

  export default {
    name: 'edit-offer',
    props: ['auth', 'user'],
    components: { AppLoader, AppInput, OverviewStep, 
      DetailsStep, Breadcrumbs, Toolbar, StepsControls, DefaultButton },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        firstStepStatus: false,
        currentStep: 1,
        stepsDirection: 'forward',
        validateMsg: '',
        offer: {},
        stepsGroup: { overview: true, address: true, parameters: true }
      }
    },
    created() {
      offersRef.child(this.$route.params.id).once('value', (offer) => {
        if ( offer.exists() ) {
          this.offer = offer.val();
          this.dataReady = true;
        }
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.id } });
        }
      });
    },
    computed: {
      canSave() {
        return this.stepsGroup.overview && this.stepsGroup.address && this.stepsGroup.parameters;
      },
      isDone() {
        return (this.currentStep === 1 && this.stepsGroup.overview) ||
                (this.currentStep === 2 && this.stepsGroup.address && this.stepsGroup.parameters ) ||
                  (this.stepsGroup.overview && this.stepsGroup.address && this.stepsGroup.parameters )
      }
    },
    methods: {
      onObjectChange() {
        Object.assign(this.offer, mdl.init('params'), mdl.init('address'));
        this.stepsGroup.address = false;
        this.stepsGroup.parameters = false;
      },

      onNextStep() {
        if ( !this.isDone ) return false;
        this.stepsDirection = 'forward';
        this.currentStep += 1;
      },

      onPreviosStep() {
        this.stepsDirection = 'backward';
        this.currentStep -= 1;
      },

      onSave() {
        if ( !this.canSave ) return;
        let unix = Firebase.database.ServerValue.TIMESTAMP;
        this.offer.modified = unix;
        offersRef.child(this.offer.key).update(this.offer)
          .then( () => {
            this.$parent.$refs.notify.createSnackbar({
              message: 'Предложение изменено',
            });
            this.$router.push({ name: 'offer', params: { id: this.offer.key } });
          })
          .catch( error => {
            this.$parent.$refs.notify.createSnackbar({
              message: `Ошибка сети: ${error.message}`,
            });
          })
      },
      onStateChange(value, group) {
        this.stepsGroup[group] = value;
      }
    }
  }
</script>