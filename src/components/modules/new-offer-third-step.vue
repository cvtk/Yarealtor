<template>
  <div :class="$style.third">
    <div :class="$style.third__content">
      <div :class="$style.wrapper">
        <div :class="$style.group__images">
          <div v-for="image in value.images"
            :class="$style.images__item" 
            :style="{ 'background-image': 'url(' + image.url + ')' }">
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.third__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <div :class="$style.group__details">
            <ul :class="$style.details__list">
              <li :class="$style.list__item">
                <span :class="$style.item__title">Цена:</span>
                <span :class="$style.item__value">{{ value.price }} руб.</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Населенный пункт:</span>
                <span :class="$style.item__value">{{ value.house_city }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Адрес:</span>
                <span :class="$style.item__value">{{ value.house_address }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Район:</span>
                <span :class="$style.item__value">{{ value.house_district }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Тип:</span>
                <span :class="$style.item__value">{{ value.house_type }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Материал:</span>
                <span :class="$style.item__value">{{ value.house_material }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Комнат:</span>
                <span :class="$style.item__value">{{ value.apartment_rooms }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Этаж:</span>
                <span :class="$style.item__value">{{ value.apartment_floor }} / {{ value.house_floors }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Общая площадь:</span>
                <span :class="$style.item__value">{{ value.apartments_full_area }} м²</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Жилая площадь:</span>
                <span :class="$style.item__value">{{ value.apartments_living_area }} м²</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Площадь кухни:</span>
                <span :class="$style.item__value">10 м²</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Отделка:</span>
                <span :class="$style.item__value">{{ value.apartment_furnish }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Санузел:</span>
                <span :class="$style.item__value">{{ value.apartment_bathroom }}</span>
              </li>
              <li :class="$style.list__item">
                <span :class="$style.item__title">Балкон:</span>
                <span :class="$style.item__value">{{ value.apartment_balcony }}</span>
              </li>
            </ul>
          </div>
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

  /* third */
    .third {
      position: relative;
      margin: 20px -10px 0;
      &:after { @include clearfix }
    }

  /* third__content */
    .third__content {
      width: 50%;
      float: left;
      padding: 0 10px;
    }

  /* content__group */
    .content__group {
      position: relative;
      border: 1px solid #c2cad8;
      padding: 15px;
      margin: 15px;
      margin-top: 20px;
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

    .details__list {
      margin: 0;
      padding: 0;
      list-style: none;
      border: 7.5px solid #fff;
      > .list__item {
        border-bottom: 1px solid #f0f4f7;
        display: block;
        padding: 7.5px;
        cursor: default;
        transition: background-color .1s ease-in-out;
        &:hover { background-color: #eef1f5 }
        &:after { @include clearfix }
        > .item__title, .item__value { display: block; width: 50%; float: left; color: #5a7391; }
        > .item__value { text-align: right; color: #93a3b5; font-style: italic; }
      }
    }

    .group__images {
      position: relative;
      &:after { @include clearfix }
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
      }
    }

</style>

<script>
  import AppInput from './inputs.vue';
  import AppUploadImages from './upload-images.vue';

  export default {
    name: 'new-offer-third-step',
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