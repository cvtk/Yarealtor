<template>
  <div :class="$style.overview">
    <div :class="$style.row">
      <div :class="$style.overview__images">
        <div :class="$style.images">
          <div v-if="images.length === 0"
            :class="$style.images__item" 
            :style="{ 'background-image': 'url(/static/image-placeholder.png)' }">
          </div>
          <div v-for="(image, index) in images" v-else
              :class="$style.images__item"
              @click="moveToFrontImage(index)"
              :style="{ 'background-image': 'url(' + image.url + ')' }">
            <div :class="$style.images__remove" @click.stop="removeImage(index)" title="Удалить изображение"></div>
          </div>
        </div>
        <app-upload-images @imageLoaded="onImageLoaded" :class="$style.images__upload" :multiple="true">Добавить изображение</app-upload-images>
      </div>

      <div :class="$style.overview__content">
        <div :class="$style.row">
          <div :class="$style.content__group">
            <span :class="$style.group__title">{{ mdl.type.title }}</span>
            
            <div :class="$style.group__row">
              <div :class="$style.row__item_50p" v-for="opt in mdl.type.options">
                <default-radio name="offerType"
                  v-model="type"
                  :option="opt.value"
                  :label="opt.title"
                  :validate="validateType"
                  msg="Обязательное поле"
                />
              </div>
            </div>
            <div :class="$style.group__row">
              <default-number v-model="price" :label="mdl.price.title" :validate="validatePrice" msg="Обязательное поле (минимум тысяча рублей)" />
            </div>
            <div :class="$style.group__row">
              <default-select nameField="title" v-model="object" 
                :label="mdl.object.title"
                :options="mdl.object.options"
                :validate="validateObject"
                msg="Обязательное поле"
              />
            </div>
          </div>
          <div :class="$style.content__group">
            <span :class="$style.group__title">{{ mdl.description.title }}</span>
            <textarea :class="$style.content__description" v-model="description" rows="7"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.overview__actions">
      <div :class="$style.actions">
        <div :class="$style.actions__next">
          <default-button icon="next" label="Вперёд" :red="!done" @click="onNextStep" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .row {
    position: relative;
    background-color: #fff;
    overflow: auto;
    &:after { @include clearfix }
  }

  .images {
    position: relative;
    background-color: #eef1f5;
    overflow: auto;
    &:after { @include clearfix }
  }

  .overview {
    position: relative;
    margin-top: 20px;
    &:after { @include clearfix }
    @media (max-width: $bp-medium) {
      .overview__images { width: 100%; padding-right: 0 }
      .overview__content {
        width: 100%;
        padding-left: 0;
        margin-top: 20px;
      }
    }
    @media (max-width: $bp-small) {
      .row__item_50p { width: 100% }
    }
  }

  .overview__images {
    position: relative;
    width: 33.333333%;
    float: left;
    padding-right: 10px;
    &:after { @include clearfix }
  }


  .images__upload {
    position: relative;
    margin-top: 20px;
  }

  .images__item {
    position: relative;
    width: 50%;
    min-height: 120px;
    float: left;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #eef1f5;
    border: 2.5px solid transparent;
    margin-bottom: 5px; 
    filter: grayscale(1);
    opacity: .75;
    cursor: pointer;
    transition: filter .35s, opacity .35s;
    &:hover { filter: grayscale(0); opacity: 1; }

    &:first-child {
      width: 100%;
      filter: grayscale(0);
      opacity: 1;
      min-height: 327px;
      border: 1px dashed #c2cad8;
      margin-bottom: 15px;
    }
  }

  .images__remove {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    opacity: .75;
    transition: opacity .35s;
    text-align: center;
    &:hover { opacity: 1 }
    &:after {
      content: "\e082";
      font-family: "Icons";
      display: block;
      font-size: 24px;
      width: 28px;
      height: 28px;
      color: #fff;
      line-height: 28px;
      transition: color .2s ease-in-out;
    }
    
  }

  .overview__content {
    &:after { @include clearfix }
    width: 66.666667%;
    float: left;
    padding-left: 10px;
  }

  .content__group {
    &:after { @include clearfix }
    position: relative;
    border: 1px solid #c2cad8;
    padding: 15px;
    margin: 15px;
    margin-top: 30px;
  }

  .content__group:first-child {
    margin-top: 15px;
  }
      
  .group__title {
    position: absolute;
    color: #c2cad8;
    top: -10px;
    left: 15px;
    background-color: #fff;
    padding: 0 5px;
    font-style: italic;
  }

  .group__row {
    &:after { @include clearfix }
  }

  .row__item_50p {
    width: 50%;
    float: left;
    margin-bottom: 15px;
  }
  
  .row__item {
    margin-bottom: 15px;
  }

  .content__description {
    border: none;
    border-bottom: 1px solid #c2cad8;
    outline: none;
    width: 100%;
    padding: 6px 0;
    &::-webkit-input-placeholder { color: #c2cad8; font-family: "Roboto", sans-serif; font-style: italic; font-weight: 300; }
    &::-moz-placeholder          { color: #c2cad8; font-family: "Roboto", sans-serif; font-style: italic; font-weight: 300; }
    &:-moz-placeholder           { color: #c2cad8; font-family: "Roboto", sans-serif; font-style: italic; font-weight: 300; }
    &:-ms-input-placeholder      { color: #c2cad8; font-family: "Roboto", sans-serif; font-style: italic; font-weight: 300; }
  }

  .overview__actions {
    margin-top: 20px;
    position: relative
  }

  .actions {
    &:after { @include clearfix }
    position: relative;
    padding: 12px 0;
  }
  
  .actions__next { float: right }

</style>

<script>
  import mdl from '../../models/offer.js';
  import AppInput from '../modules/inputs.vue';
  import AppUploadImages from '../modules/upload-images.vue';
  import DefaultRadio from '../default-inputs/default-radio.vue';
  import DefaultSelect from '../default-inputs/default-select.vue';
  import DefaultNumber from '../default-inputs/default-number.vue';
  import DefaultButton from '../default-inputs/default-button.vue';

  export default {
    name: 'overview',
    components: { AppInput, AppUploadImages, DefaultRadio, DefaultSelect, DefaultNumber, DefaultButton },
    data() {
      return {
        mdl: {},
        type: '',
        price: '',
        object: '',
        images: [],
        description: ''
      }
    },
    computed: {
      validateType() { return !!this.type },
      validatePrice() { return !!this.price && this.price > 1000 },
      validateObject() { return !!this.object },
      done() { return  !!this.type && ( !!this.price && this.price > 1000 ) && !!this.object  }
    },

    created() {
      this.mdl = mdl.getModel( ['offer', 'general'] );
    },

    methods: {
      modelSelect() {
        console.log('ok!');
      },
      moveToFrontImage(index) {
        if (!!index) {
          let first = this.images[0];
          this.$set(this.images, 0, this.images[index]);
          this.$set(this.images, index, first);
        }
      },

      removeImage(index) {
        let imgs = this.images.splice(index, 1);
        this.$set( this.images, imgs );
      },

      onImageLoaded(image) {
        let name = image.name, url = image.url;
        images.push({ name, url });
      },

      onNextStep() {
        if ( this.done ) {
          let dataPrepare = {}
          for ( let field in this.mdl ) {
            dataPrepare[field] = this[field];
          }
          this.$emit('dataEntered', dataPrepare);
        } 
      }
    }
  }
</script>