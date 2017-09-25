<template>
  <div :class="$style.overview">
    <div :class="$style.overview__images">
      <div :class="$style.wrapper">
        <div v-if="value.images.current.length === 0"
          :class="$style.images__item" 
          :style="{ 'background-image': 'url(/static/image-placeholder.png)' }">
        </div>
        <div v-for="image in value.images.current" v-else
            :class="$style.images__item" 
            :style="{ 'background-image': 'url(' + image.url + ')' }">
        </div>
      </div>
      <app-upload-images v-model="value.images.current" :class="$style.images__upload" :multiple="true">Добавить изображение</app-upload-images>
    </div>

    <div :class="$style.overview__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <span :class="$style.group__title">{{ value.type.title }}</span>
          
          <div :class="$style.group__row">
            <div :class="$style.row__item_50p" v-for="opt in value.type.items">
              <default-radio name="offerType"
                v-model="value.type.current"
                :option="opt.value"
                :label="opt.title"
              />
            </div>
          </div>
          <div :class="$style.group__row">
            <div :class="$style.row__item">
              <app-input v-model="value.price.current" type="number" :placeholder="value.price.title" />
            </div>
          </div>
          <div :class="$style.group__row">
            <select :class="$style.type__select" v-model="value.object.current">
              <option :class="$style.select__option" v-for="opt in value.object.items" :value="opt.value">{{ opt.title }}</option>
            </select>
          </div>
        </div>
        <div :class="$style.content__group">
          <span :class="$style.group__title">Описание</span>
          <textarea :class="$style.content__description" v-model="value.description.current" rows="7" :placeholder="value.description.title"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .wrapper {
    position: relative;
    background-color: #fff;
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
    margin-top: 20px;
  }

  .images__item {
    position: relative;
    width: 50%;
    min-height: 100px;
    float: left;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:first-child {
      width: 100%;
      min-height: 327px;
      border: 1px dashed #c2cad8;
    }
  }

  .overview__content {
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

  .type__select {
    width: 100%;
    border: none;
    border-bottom: 2px solid #27a4b0;
    outline: none;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    line-height: 1.42857;
    cursor: pointer;
    height: 34px;
    padding: 6px 12px;
  }

  .select__option {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    line-height: 1.42857;
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

</style>

<script>
  import AppInput from '../modules/inputs.vue';
  import AppUploadImages from '../modules/upload-images.vue';
  import DefaultRadio from '../default-inputs/default-radio.vue';

  export default {
    name: 'overview',
    components: { AppInput, AppUploadImages, DefaultRadio },
    props: ['value']
  }
</script>