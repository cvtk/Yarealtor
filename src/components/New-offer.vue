<template>
  <div :class="$style.new_offer">
    <div :class="$style.new_offer__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li><span :class="$style.breadcrumbs__icon"></span>
        <router-link tag="li" :to="{ name: 'offers' }" :class="$style.breadcrumbs__item">Предложения</router-link >
        <span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item">Создать новое</li>
      </ul>
    </div>
    <div :class="$style.new_offer__toolbar">
      <h1 :class="$style.toolbar__title">Создать<span :class="$style._small">новое предложение</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    
    <div :class="$style.new_offer__main">
      <div :class="$style.main_wrapper">
        <div :class="$style.main__steps">
          <div :class="[ $style.steps__item, currentStep === 1 && $style._active ]" @click="currentStep=1">
            <div :class="$style.item__number">1</div>
            <div :class="$style.item__title">Общие</div>
            <div :class="$style.item__content">Тип предложения и описание</div>
          </div>
          <div :class="[ $style.steps__item, $style._color_red, currentStep === 2 && $style._active ]" @click="currentStep=2">
            <div :class="$style.item__number">2</div>
            <div :class="$style.item__title">Детали</div>
            <div :class="$style.item__content">Подробная информация</div>
          </div>
          <div :class="[ $style.steps__item, $style._color_green, currentStep === 3 && $style._active ]" @click="currentStep=3">
            <div :class="$style.item__number">3</div>
            <div :class="$style.item__title">Финиш</div>
            <div :class="$style.item__content">Проверка данных</div>
          </div>
        </div>
        <div :class="$style.main__current_step">
          <transition :name="stepsDirection" mode="out-in">
            <app-new-offer-first-step v-model="newOffer" v-if="currentStep === 1"></app-new-offer-first-step>
            <app-new-offer-second-step v-model="newOffer" v-else-if="currentStep === 2"></app-new-offer-second-step>
            <div :class="$style.current_step__third" v-else-if="currentStep === 3">3</div>
          </transition>  
        </div>
        <app-input type="button" :class="$style.main__prev_step" v-show="allowPrevStep" @click="prevStep">
          <span :class="$style.prev_step__icon"></span>
          Предыдущий шаг
        </app-input>
        <app-input type="button" :class="$style.main__next_step" v-show="allowNextStep" @click="nextStep">
          Следующий шаг
          <span :class="$style.next_step__icon"></span>
        </app-input>
      </div>
      
      <app-ad-sidebar :class="$style.main__ad"></app-ad-sidebar>
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
  /* new_offer */
    .new_offer {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* new_offer__main */
    .new_offer__main {
      position: relative;
    }

  /* main_wrapper */
    .main_wrapper {
      position: relative;
      margin-right: 300px;
    }
  /* main__steps */
    .main__steps {
      position: relative;
      background-color: #2f353b;
      overflow: hidden;
      &:after { @include clearfix }
    }
    
    .steps__item {
      position: relative;
      width: 33.333333%;
      float: left;
      padding: 20px 30px;
      cursor: pointer;
      transition: background-color .2s ease-in-out;
      &._color_red > .item__number,
      &._color_red > .item__title,
      &._color_red > .item__content { color: #E7505A; border-color: #E7505A; }
      &._color_green > .item__number,
      &._color_green > .item__title,
      &._color_green > .item__content { color: #26C281; border-color: #26C281; }
      &:hover, &._active { background-color: #364150; &:after { border-left-color: #364150 } }
    }

    .item__number {
      font-size: 26px;
      color: #e5e5e5;
      border-radius: 50%!important;
      float: left;
      margin: auto;
      padding: 3px 14px;
      border: 1px solid #e5e5e5;
    }

    .item__title {
      font-size: 24px;
      color: #e5e5e5;
      font-weight: 100;
      margin-left: 60px;
      margin-top: -4px;
      text-transform: uppercase;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .item__content {
      font-weight: 300;
      margin-left: 60px;
      margin-top: -5px;
      color: #95A5A6;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }

  /* main__current_step */
    .main__current_step {
      position: relative;
      overflow: hidden;
    }

    .current_step__second {}
    
    .current_step__third {}

  /* main__next_step */
    .main__next_step {
      padding: 12px;
      font-size: 14px;
      margin-top: 20px;
      float: right;
    }

    .next_step__icon {
      display: inline-block;
      margin-left: 5px;
      vertical-align: middle;
      &:after {
        content: "\e079";
        font-family: "Icons";
        font-size: 16px;
      }
    }

  /* main__prev_step */
    .main__prev_step {
      padding: 12px;
      font-size: 14px;
      margin-top: 20px;
      float: left;
    }

    .prev_step__icon {
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
      &:after {
        content: "\e07a";
        font-family: "Icons";
        font-size: 16px;
      }
    }
  /* new_offer__bar */
    .new_offer__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* new_offer__toolbar */
    .new_offer__toolbar { margin: 25px 0 }

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
    }
  
  /* main__content */
    .main__content {
      position: relative;
      margin-right: 300px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      height: auto;
      overflow: hidden;
      &:after { @include clearfix }
    }

  /* bar__breadcrumbs */
    .bar__breadcrumbs {
      padding: 11px 0;
      display: inline-block;
      float: left;
      margin: 0;
      list-style: none;
    }
    .breadcrumbs__item {
      display: inline-block;
      color: #888;
      cursor: pointer;
      line-height: 14px;
      &:last-child {
        cursor: default;
      }
    }
    .breadcrumbs__icon {
      color: #888;
      cursor: default;
      line-height: 14px;
      &:after {
        content: "\e606";
        display: inline-block;
        font-family: "Icons";
        cursor: default;
        font-size: 7px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }

  /* responsive */
    .new_offer {
      @media (max-width: $bp-medium) {
        .main__ad { display: none }
        .main__content { margin-right: 0 }
      }
      @media (max-width: $bp-small) {
        ._small { display: none }
        .breadcrumbs__item:first-child { display: none }
      }
    }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import AppNewOfferFirstStep from './modules/new-offer-first-step.vue';
  import AppNewOfferSecondStep from './modules/new-offer-second-step.vue';

  export default {
    name: 'new_offer',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, AppNewOfferFirstStep, AppNewOfferSecondStep },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        currentStep: 1,
        stepsDirection: 'forward',
        newOffer: {
          type: '',
          object: '',
          description: '',
          images: [],
          house_city: '',
          house_address: '',
          house_number: '',
          house_district: '',
          house_waymark: '',
          house_type: '',
          house_material: '',
          house_floors: '',
          apartment_rooms: '',
          apartment_floor: '',
          apartment_furnish: '',
          apartment_bathroom: '',
          apartment_balcony: '',
          apartments_full_area: '',
          apartments_living_area: ''
        }
      }
    },
    created() {
      this.dataReady = true;
    },
    methods: {
      nextStep() {
        if ( this.allowNextStep && this.currentStep === 1 ) {
          this.currentStep = 2;
          this.stepsDirection = 'forward';
        }
        else if ( this.allowNextStep && this.currentStep === 2 ) {
          this.currentStep = 3;
          this.stepsDirection = 'forward';
        }
      },
      prevStep() {
        if ( this.allowPrevStep && this.currentStep > 1 ) {
          this.currentStep -= 1;
          this.stepsDirection = 'backward';
        }
      }
    },
    computed: {
      allowNextStep() {
        if ( this.currentStep === 1 ) {
          return ( this.newOffer.type && this.newOffer.object && this.newOffer.description && Object.keys(this.newOffer.images).length !== 0 );
        }
        else if ( this.currentStep === 2 ) {
          return ( this.newOffer.house_city && this.newOffer.house_address && this.newOffer.house_number 
            && this.newOffer.house_district && this.newOffer.house_type && this.newOffer.house_material && this.newOffer.house_floors )
        }
        
      },
      allowPrevStep() {
        return ( this.currentStep != 1 );
      }
    }
  }
</script>