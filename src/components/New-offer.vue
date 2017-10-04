<template>
  <div :class="$style.create">
    <div :class="$style.create__bar">
      <breadcrumbs :items="[{ text: 'Главная', to: 'root'}, { text: 'Предложения', to: 'offers'}, { text: 'Создать новое', to: ''}]" /> 
    </div>
    <div :class="$style.create__toolbar">
      <toolbar title="Создать" sub="новое предложение"></toolbar>
    </div>
    <div :class="$style.create__main">
      <div :class="$style.main">
        <div :class="$style.main__steps_controls">
          <steps-controls v-model="currentStep" />
        </div>
        <div :class="$style.main__current_step">
          <transition :name="stepsDirection" mode="out-in">
            <overview-step v-model="offer" v-if="currentStep === 1" @stateChange="onStateChange" />
            <details-step v-model="offer" v-else-if="currentStep === 2" @stateChange="onStateChange" />
            <offer-preview :offer="offer" :user="user" v-else-if="currentStep === 3" />
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
              <default-button icon="next" label="Вперёд" :red="!isDone" @click="onNextStep" v-if="currentStep !== 3" />
            </div>
            <div :class="$style.actions__save">
              <default-button icon="save" label="Сохранить" :red="!isDone" @click="onSave" v-if="currentStep === 3" />
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
  .actions__next { float: right }
  .actions__previos { float: left }

</style>

<script>
  import mdl from '../models/offer.js';
  import firebase from '../firebase.js';
  import AppLoader from './app-loader.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import Breadcrumbs from './page-blocks/breadcrumbs.vue'
  import Toolbar from './page-blocks/toolbar.vue'
  import StepsControls from './new-offer/steps-controls.vue';
  import OverviewStep from './new-offer/overview.vue';
  import DetailsStep from './new-offer/new-offer-details.vue';
  import DefaultButton from './default-inputs/default-button.vue';
  import OfferPreview from './offer/offer.vue';

  const offersRef = firebase.database().ref('offers');

  export default {
    name: 'new_offer',
    props: ['auth', 'user'],
    components: { AppLoader, AppAdSidebar, AppInput, OverviewStep, 
      DetailsStep, OfferPreview, Breadcrumbs, Toolbar, StepsControls, DefaultButton },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        firstStepStatus: false,
        currentStep: 1,
        stepsDirection: 'forward',
        validateMsg: '',
        offer: {},
        stepsGroup: { overview: false, address: false, parameters: false }
      }
    },
    created() {
      this.dataReady = true;
      this.offer = mdl.init();
      this.offer.author = this.user.key;
      this.offer.company = this.user.company.key;
    },
    watch: {
      'offer.object': function(value) {
        Object.assign(this.offer, mdl.init('params'), mdl.init('address'));
        this.stepsGroup.address = false;
        this.stepsGroup.parameters = false;
      }
    },
    computed: {
      isDone() {
        return (this.currentStep === 1 && this.stepsGroup.overview) ||
                (this.currentStep === 2 && this.stepsGroup.address && this.stepsGroup.parameters ) ||
                  (this.stepsGroup.overview && this.stepsGroup.address && this.stepsGroup.parameters )
      }
    },
    methods: {
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
        this.offer.key = this.offer.key || offersRef.push().key;
        
        offersRef.child(this.offer.key).update(this.offer)
          .then( () => { console.log('Offer saved') })
          .catch( () => { console.log('Offer saved') })
      },
      onStateChange(value, group) {
        this.stepsGroup[group] = value;
      }
    }
  }
</script>