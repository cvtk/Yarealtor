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
            <div :class="$style.item__content">Адрес и тип предложения</div>
          </div>
          <div :class="[ $style.steps__item, $style._color_red, currentStep === 2 && $style._active ]" @click="currentStep=2">
            <div :class="$style.item__number">2</div>
            <div :class="$style.item__title">Детали</div>
            <div :class="$style.item__content">Подробное описание</div>
          </div>
          <div :class="[ $style.steps__item, $style._color_green, currentStep === 3 && $style._active ]" @click="currentStep=3">
            <div :class="$style.item__number">3</div>
            <div :class="$style.item__title">Финиш</div>
            <div :class="$style.item__content">Еще немного текста</div>
          </div>
        </div>
        <div :class="$style.main__current_step">
          <div :class="$style.current_step__first" v-if="currentStep === 1">
            <div :class="$style.first__images">
              <app-upload-images v-model="newOffer.images">Добавить изображение</app-upload-images>
              <div v-for="image in newOffer.images"
                  :class="$style.images__item" 
                  :style="{ 'background-image': 'url(' + image.url + ')' }">
              </div>
            </div>
            <div :class="$style.first__content"></div>
          </div>
          <div :class="$style.current_step__second" v-else-if="currentStep === 2">2</div>
          <div :class="$style.current_step__third" v-else-if="currentStep === 3">3</div>
        </div>
      </div>
      
      <app-ad-sidebar :class="$style.main__ad"></app-ad-sidebar>
    </div>
  </div>
</template>

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
    }

    .current_step__first {
      position: relative;
      margin-top: 20px;
      &:after { @include clearfix }
    }
    .first__images {
      position: relative;
      width: 33.333333%;
      float: left;
      background-color: #fff;
      &:after { @include clearfix }
    }

    .images__item {
      width: 50%;
      min-height: 100px;
      float: left;
      background-size: cover;
    }

    .images__upload_image {
      height: 60px;
      padding-bottom: 20px;
      float: left;
      border: 1px dashed #364150;
      cursor: pointer;
      color: #364150;
      font-style: italic;
      font-size: 16px;
      text-align: center;
      background-image: url(/static/image-placeholder.png);
      background-size: contain;
      background-position: left;
      background-repeat: no-repeat;
      opacity: .75;
    }

    .upload_image__input { visibility: hidden }

    .first__content {
      width: 66.666667%;
      height: 45vh;
      float: left;
      background-color: #fff;
    }
    
    .current_step__second {}
    
    .current_step__third {}

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
  import AppUploadImages from './modules/upload-images.vue';
  import AppFilters from './helpers/filters.js';
  import firebase from '../firebase.js';

  const storage = firebase.storage(),
        ref = storage.ref();

  export default {
    name: 'new_offer',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppUploadImages },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        currentStep: 1,
        hash: this.randomHash(),
        newOffer: { images: [] }
      }
    },
    created() {
      this.dataReady = true;
    },
    methods: {
      randomHash() {
        let hash = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for( var i=0; i < 20; i++ )
        hash += possible.charAt(Math.floor(Math.random() * possible.length));

        return hash;
      },
      uploadImage(e) {
        let tmpPath = 'offers/tmp/' + this.hash + '/',
            files = e.target.files;

        Array.prototype.forEach.call(files, file => {
          ref.child(tmpPath + file.name).put(file).then( data => this.newOffer.images.push(data.downloadURL) )
        });
      }
    }
  }
</script>