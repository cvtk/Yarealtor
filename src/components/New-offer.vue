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
            <first-step v-model="offer" v-if="currentStep === 1"></first-step>
            <second-step v-model="offer" v-else-if="currentStep === 2"></second-step>
            <offer-preview :offer="offer" v-else-if="currentStep === 3" />
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
              <default-button icon="previos" label="Назад" v-if="currentStep !== 1" @click="onPreviosStep" />
            </div>
            <div :class="$style.actions__next">
              <default-button icon="next" label="Вперёд" v-if="currentStep !== 3" @click="onNextStep" />
            </div>
            <div :class="$style.actions__save">
              <default-button label="Сохранить" @click="onSave" v-if="currentStep === 3" />
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
    overflow: hidden;
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
  import AppLoader from './app-loader.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import Breadcrumbs from './page-blocks/breadcrumbs.vue'
  import Toolbar from './page-blocks/toolbar.vue'
  import StepsControls from './new-offer/steps-controls.vue';
  import FirstStep from './new-offer/overview.vue';
  import SecondStep from './new-offer/details.vue';
  import DefaultButton from './default-inputs/default-button.vue';
  import OfferPreview from './offer/offer.vue';

  const overviewFields = ['type', 'price', 'object', 'description'];
  const detailsFields = ['house_city', 'house_address', 'house_number', 'house_district', 'house_waymark', 'house_type', 'house_material', 'apartment_floor', 'house_floors', 'apartment_rooms', 'apartment_furnish', 'apartment_bathroom','apartments_full_area', 'apartments_living_area' ];

  export default {
    name: 'new_offer',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, FirstStep, SecondStep, OfferPreview, Breadcrumbs, Toolbar, StepsControls, DefaultButton },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        currentStep: 1,
        stepsDirection: 'forward',
        validateMsg: '',
        offer: {}
      }
    },
    created() {
      Object.assign( this.offer, mdl.init() );
      this.dataReady = true;
    },
    methods: {
      currentField() {
        let curr = mdl.check(this.offer);
        return curr;
      },
      currentFullfilled() {
        switch(this.currentStep) {
          case 1: return !overviewFields.includes( this.currentField() ); break;
          case 2: return !detailsFields.includes( this.currentField() ); break;
        }
      },
      onNextStep() {
        if ( this.currentFullfilled() ) {
          this.validateMsg= '';
          this.stepsDirection = 'forward';
          this.currentStep += 1;
        } else {
          let curr = this.offer[this.currentField()].title;
          this.validateMsg = 'Поле \"' + curr + '\" обязательно к заполнению.'
        }
      },

      onPreviosStep() {
        this.stepsDirection = 'backward';
        this.currentStep -= 1;
      },

      onSave() {

      }
    }
  }
</script>