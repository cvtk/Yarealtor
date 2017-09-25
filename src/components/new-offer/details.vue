<template>
  <div :class="$style.second">
    <div :class="$style.second__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <span :class="$style.group__title">Адрес</span>
          <app-input v-model="value.house_city.current" :placeholder="value.house_city.title" />
          <div :class="$style.wrapper">
            <app-input :class="$style.group__address" v-model="value.house_address.current" :placeholder="value.house_address.title" />
            <app-input :class="$style.group__house_number" v-model="value.house_number.current" :placeholder="value.house_number.title" />
          </div>
          <select :class="$style.group__district" v-model="value.house_district.current">
            <option :class="$style.district__option" v-for="opt in value.house_district.items" :value="opt.value">{{ opt.title }}</option>
          </select>
          <textarea :class="$style.group__waymark" v-model="value.house_waymark.current" rows="5" :placeholder="value.house_waymark.title"></textarea>
        </div>
      </div>
    </div>
    <div :class="$style.second__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <span :class="$style.group__title">Параметры дома</span>
          <div :class="$style.group__type">
            <div :class="$style.type__label">{{ value.house_type.title }}:</div>
            <div :class="$style.type__options">
              <div :class="$style.options__item" v-for="opt in value.house_type.items">
                <default-radio name="houseType"
                  v-model="value.house_type.current"
                  :option="opt.value"
                  :label="opt.title"
                />
              </div>
            </div>
          </div>
          <div :class="$style.group__material">
            <div :class="$style.material__label">{{ value.house_material.title }}:</div>
            <div :class="$style.material__options">
              <div :class="$style.options__item" v-for="opt in value.house_material.items">
                <default-radio name="houseMaterial"
                  v-model="value.house_material.current"
                  :option="opt.value"
                  :label="opt.title"
                />
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.content__group">
          <span :class="$style.group__title">Параметры квартиры</span>
          <div :class="$style.group__main_params">
            <div :class="$style.main_params__rooms">
              <div :class="$style.rooms__label">{{ value.apartment_rooms.title }}:</div>
              <select :class="$style.rooms__options" v-model="value.apartment_rooms.current">
                <option :class="$style.options__item" v-for="rooms in 9" :value="rooms">{{ rooms }}</option>
              </select>
            </div>
            <div :class="$style.main_params__floor">
              <div :class="$style.floor__label">{{ value.apartment_floor.title }}:</div>
              <select :class="$style.floor__options" v-model="value.apartment_floor.current">
                <option :class="$style.options__item" v-for="floor in 20" :value="floor - 2">{{ floor - 2 }}</option>
              </select>
              <div :class="$style.floors__label">/</div>
              <select :class="$style.floors__options" v-model="value.house_floors.current">
                <option :class="$style.options__item" v-for="floors in 20" :value="floors">{{ floors }}</option>
              </select>
            </div>
          </div>
          <div :class="$style.group__area">
            <div :class="$style.area__full">
              <div :class="$style.full__label">{{ value.apartments_full_area.title }}: </div>
              <app-input :class="$style.full__input" v-model="value.apartments_full_area.current" type="number" />
            </div>
            <div :class="$style.area__living">
              <div :class="$style.living__label">{{ value.apartments_living_area.title }}:</div>
              <app-input :class="$style.living__input" v-model="value.apartments_living_area.current" type="number" />
            </div>
            
          </div>
          <div :class="$style.group__furnish">
            <div :class="$style.furnish__label">{{ value.apartment_furnish.title }}:</div>
            <div :class="$style.furnish__options">
              <div :class="$style.options__item" v-for="opt in value.apartment_furnish.items">
                <default-radio name="apartmentFurnish"
                  v-model="value.apartment_furnish.current"
                  :option="opt.value"
                  :label="opt.title"
                />
              </div>
            </div>
          </div>
          <div :class="$style.group__bathroom">
            <div :class="$style.bathroom__label">{{ value.apartment_bathroom.title }}:</div>
            <div :class="$style.bathroom__options">
              <div :class="$style.options__item" v-for="opt in value.apartment_bathroom.items">
                <default-radio name="apartmentBathroom"
                  v-model="value.apartment_bathroom.current"
                  :option="opt.value"
                  :label="opt.title"
                />
              </div>
            </div>
          </div>
          <div :class="$style.group__balcony">
            <div :class="$style.balcony__label">{{ value.apartment_balcony.title }}:</div>
            <div :class="$style.balcony__options">
              <default-checkbox v-model="value.apartment_balcony.current" />
            </div>
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

  /* second */
    .second {
      position: relative;
      margin: 20px -10px 0;
      &:after { @include clearfix }
    }

  /* second__content */
    .second__content {
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

  /* group__address */
    .group__address {
      float: left;
      width: 82.5%;
      margin-right: 2.5%;
    }

  /* group__house_number */
    .group__house_number {
      float: left;
      width: 15%;
    }

  /* group__district */
    .group__district {
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
      margin-bottom: 15px;
    }

    .district__option {
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      line-height: 1.42857;
    }

  /* group__waymark */
    .group__waymark {
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

  /* group__type */
    .group__type {
      margin-bottom: 25px;
      &:after { @include clearfix }
    }
    .type__label {
      width: 20%;
      float: left;
      line-height: 24px;
    }
    .type__options {
      &:after { @include clearfix }
      width: 80%;
      float: left;
      > .options__item { width: 50%; float: left }
    }

  /* group__material */
    .group__material:after { @include clearfix }
    .material__label {
      width: 20%;
      float: left;
      line-height: 24px;
    }
    .material__options {
      width: 80%;
      float: left;
      > .options__item { width: 50%; float: left; margin-bottom: 10px; }
    }
  
  /* group__main_params */
    .group__main_params {
      margin-bottom: 25px;
      &:after { @include clearfix }
    }
    .main_params__rooms, .main_params__floor {
      width: 50%;
      float: left;
      &:after { @include clearfix }
    }
    .rooms__label, .floors__label, .floor__label {
      width: 60%;
      float: left;
      line-height: 34px;
    }
    .floors__label, .floor__label { width: 40%; text-align: center }
    .floors__label { font-size: 24px; width: 10%; font-weight: 100; }

    .rooms__options, .floors__options, .floor__options {
      width: 40%;
      float: left;
      border: none;
      border-bottom: 2px solid #27a4b0;
      outline: none;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      line-height: 1.42857;
      cursor: pointer;
      height: 34px;
      padding: 5px;
      > .options__item {
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        line-height: 1.42857;
      }
    }
    .floors__options, .floor__options {
      width: 25%;
    }

  /* group__furnish */
    .group__furnish {
      margin-bottom: 25px;
      &:after { @include clearfix }
    }
    .furnish__label {
      width: 20%;
      float: left;
      line-height: 24px;
    }
    .furnish__options {
      width: 80%;
      float: left;
      > .options__item { width: 50%; float: left; margin-bottom: 10px; }
    }

  /* group__bathroom */
    .group__bathroom {
      margin-bottom: 25px;
      &:after { @include clearfix }
    }
    .bathroom__label {
      width: 20%;
      float: left;
      line-height: 24px;
    }
    .bathroom__options {
      width: 80%;
      float: left;
      > .options__item { width: 50%; float: left; margin-bottom: 10px; }
    }

  /* group__balcony */
    .group__balcony:after { @include clearfix }
    .balcony__label {
      width: 20%;
      float: left;
      line-height: 24px;
    }
    .balcony__options {
      width: 80%;
      float: left;
      > .options__item { width: 50%; margin-bottom: 5px; }
    }

  /* group__full_area */
    .group__area {
      margin-bottom: 25px;
      &:after { @include clearfix }
    }
    .area__full {
      width: 50%;
      float: left;
      padding-right: 5px;
      &:after { @include clearfix }
    }
    .full__label {
      width: 65%;
      float: left;
      line-height: 34px;
      &::last-child { padding-left: 20px }
    }

    .full__input {
      width: 35%;
      float: left;
      margin-bottom: 0;
    }

    .area__living {
      width: 50%;
      float: left;
      padding-left: 5px;
      &:after { @include clearfix }
    }
    .living__label {
      width: 65%;
      float: left;
      line-height: 34px;
      &::last-child { padding-left: 20px }
    }

    .living__input {
      width: 35%;
      float: left;
      margin-bottom: 0;
    }
</style>

<script>
  import AppInput from '../modules/inputs.vue';
  import AppUploadImages from '../modules/upload-images.vue';
  import DefaultCheckbox from '../default-inputs/default-checkbox.vue';
  import DefaultRadio from '../default-inputs/default-radio.vue';

  export default {
    name: 'details',
    components: { AppInput, AppUploadImages, DefaultCheckbox, DefaultRadio },
    props: ['value']
  }
</script>