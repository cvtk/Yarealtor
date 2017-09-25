<template>
  <div :class="$style.create">
    <div :class="$style.create__bar">
      <breadcrumbs :items="[{ text: 'Главная', to: 'root'}, { text: 'Предложения', to: 'offers'}, { text: 'Создать новое', to: ''}]" /> 
    </div>
    <div :class="$style.create__toolbar">
      <h1 :class="$style.toolbar__title">Создать<span :class="$style._small">новое предложение</span></h1>
      <div :class="$style.toolbar__actions"></div>
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
            <third-step :offer="offer" v-else-if="currentStep === 3"></third-step>
          </transition>  
        </div>

        <div :class="$style.main__actions">
          <div :class="$style.actions">
            <div :class="$style.actions__previos">
              <default-button icon="previos" label="Назад" />
            </div>
            <div :class="$style.actions__next">
              <default-button icon="next" label="Вперёд" />
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

  .toolbar__title {
    font-size: 24px;
    color: #666;
    margin: 0;
    padding: 0;
    letter-spacing: -1px;
    font-weight: 300;
    > ._small {
      font-size: 14px;
      letter-spacing: 0;
      text-transform: lowercase;
      margin-left: 5px;
    }
  }

  .main {
    position: relative;
    margin-right: 300px;
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
  
  .actions__next { float: right }
  .actions__previos { float: left }

</style>

<script>
  import model from '../models/offer.js';
  import AppLoader from './app-loader.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import Breadcrumbs from './breadcrumbs/breadcrumbs.vue'
  import StepsControls from './new-offer/steps-controls.vue';
  import FirstStep from './new-offer/overview.vue';
  import SecondStep from './new-offer/details.vue';
  import ThirdStep from './new-offer/final.vue';
  import DefaultButton from './default-inputs/default-button.vue';

  export default {
    name: 'new_offer',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, FirstStep, SecondStep, ThirdStep, Breadcrumbs, StepsControls, DefaultButton },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        currentStep: 1,
        stepsDirection: 'forward',
        offer: {}
      }
    },
    created() {
      Object.assign( this.offer, model.init() );
      this.dataReady = true;
    },
    methods: {
      currentField() {
        let curr = model.check(this.offer);
        console.log(curr)
        return curr;
      }
    }
  }
</script>