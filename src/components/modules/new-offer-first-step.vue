<template>
  <div :class="$style.first">
    <div :class="$style.first__images">
      <div :class="$style.wrapper">
        <div v-if="value.images.length === 0"
          :class="$style.images__item" 
          :style="{ 'background-image': 'url(/static/image-placeholder.png)' }">
        </div>
        <div v-for="image in value.images" v-else
            :class="$style.images__item" 
            :style="{ 'background-image': 'url(' + image.url + ')' }">
        </div>
      </div>
      <app-upload-images v-model="value.images" :class="$style.images__upload" :multiple="true">Добавить изображение</app-upload-images>
    </div>
    <div :class="$style.first__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <span :class="$style.group__title">Тип предложения</span>
          <app-input type="radio" v-model="value.type" name="offerType" option="sell" :class="$style.type__checkbox">Продать недвижимость
          </app-input><app-input type="radio" v-model="value.type" name="offerType" option="rent" :class="$style.type__checkbox">Сдать в аренду</app-input>
          <app-input v-model="value.price" type="number" placeholder="Цена" />
          <select :class="$style.type__select" v-model="value.object">
            <option :class="$style.select__option" value="apartment">Квартира</option>
            <option :class="$style.select__option" value="room">Комната</option>
            <option :class="$style.select__option" value="commercial">Коммерческая недвижимость</option>
            <option :class="$style.select__option" value="house">Дом или дача</option>
            <option :class="$style.select__option" value="garage">Гараж или хозблок</option>
            <option :class="$style.select__option" value="stead">Земельный участок</option>
          </select>
        </div>
        <div :class="$style.content__group">
          <span :class="$style.group__title">Описание</span>
          <textarea :class="$style.content__description" v-model="value.description" rows="7" placeholder="Дополнительная информация о предложении"></textarea>
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

    /* first */
      .first {
        position: relative;
        margin-top: 20px;
        &:after { @include clearfix }
      }

    /* first__images */

      .first__images {
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

    /* first__content */

      .first__content {
        width: 66.666667%;
        float: left;
        padding-left: 10px;
      }

      .content__group {
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

      .type__checkbox {
        width: 50%;
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
  import AppInput from './inputs.vue';
  import AppUploadImages from './upload-images.vue';

  export default {
    name: 'new-offer-first-step',
    components: { AppInput, AppUploadImages },
    props: ['value'],
    computed: {
      allowNextStep() {
        if ( this.value.type && this.value.object && this.value.description && this.value.images ) {
          this.$emit('input', this.value);
        }
      }
    }
  }
</script>