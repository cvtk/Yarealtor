<template>
  <div :class="$style.apartments_filter">
    <div :class="$style.filter__option">
      <dropdown-menu>
        <div :class="$style.dropdown_menu__content">
          <app-input type="radio" name="type" :option="value" 
            v-model="filter.type"
            v-for="value in filter_options.type"
            :class="$style.content__radio">{{ value }}</app-input>
        </div>
      </dropdown-menu>
      <span :class="$style.option__title">{{ filter.type }}</span>
      <span :class="$style.option__arrow_down"></span>
    </div>
    <div :class="$style.filter__option">
      <dropdown-menu>
        <div :class="$style.dropdown_menu__content">
          <app-input type="radio" name="object_type" :option="value" 
            v-model="filter.object_type"
            v-for="value in filter_options.object_type"
            :class="$style.content__radio">{{ value }}</app-input>
        </div>
      </dropdown-menu>
      <span :class="$style.option__title">{{ filter.object_type }}</span>
      <span :class="$style.option__arrow_down"></span>
    </div>
    <div :class="$style.filter__option">
      <dropdown-menu>
        <div :class="$style.dropdown_menu__content">
          <app-input type="radio" name="rooms" :option="value" 
            v-model="filter.rooms"
            v-for="value in filter_options.rooms"
            :class="$style.content__radio">{{ value }}</app-input>
        </div>
      </dropdown-menu>
      <span :class="$style.option__title">{{ filter.rooms }}</span>
      <span :class="$style.option__arrow_down"></span>
    </div>
    <div :class="$style.filter__option">
      <input :class="$style.option_price__input" v-model="filter.price_from" placeholder="от" type="text" />
    </div>
    <div :class="$style.filter__option">
      <input :class="$style.option_price__input" v-model="filter.price_to" placeholder="до" type="text" />
    </div>
    <div :class="$style.filter__option">
      <dropdown-menu>
        <div :class="$style.dropdown_menu__content">
          <app-input type="radio" name="district" :option="value" 
            v-model="filter.district"
            v-for="value in filter_options.district"
            :class="$style.content__radio">{{ value }}</app-input>
        </div>
      </dropdown-menu>
      <span :class="$style.option__title">{{ filter.district }}</span>
      <span :class="$style.option__arrow_down"></span>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  .apartments_filter {
    position: relative;
    background-color: #fff;
    white-space: nowrap;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 0;
    min-width: 750px;
  }

  .filter__option {
    position: relative;
    display: inline-block;
    font-size: 14px;
    padding: 10px 15px;
    text-align: center;
    transition: background-color .2s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #eef1f5;
    }
    &:last-child:after { display: none }
    &:after {
      position: absolute;
      content: "";
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: #eef1f5;
    }
  }
  .option__title {
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  }
  .option__arrow_down {
    display: inline-block;
    margin-left: 5px;
    font-size: 10px;
    vertical-align: bottom;
    &:after {
      content: "\e604";
      font-family: "Icons";
    }
  }
  .option_price__input {
    &::-webkit-input-placeholder { color: #333; font-family: "Roboto", sans-serif; font-weight: 300; text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2); }
    &::-moz-placeholder { color: #333; font-family: "Roboto", sans-serif; font-weight: 300; text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2); }
    &:-ms-input-placeholder { color: #333; font-family: "Roboto", sans-serif; font-weight: 300; text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2); }
    &:-moz-placeholder { color: #333; font-family: "Roboto", sans-serif; font-weight: 300; text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2); }
    border: none; outline: none;
    background-color: transparent;
    height: 100%;
    max-width: 65px;
    cursor: pointer;
    &:focus { cursor: text }
  }

  .dropdown_menu__content {
    position: relative;
    padding: 10px 15px;
  }

  .content__radio {
    display: block;
    margin-bottom: 5px;
    &:last-child { margin-bottom: 0 }
  }
</style>

<script>
  import AppInput from '../modules/inputs.vue';
  import DropdownMenu from '../modules/dropdown-menu.vue';

  export default {
    name: 'apartments',
    props: ['auth'],
    components: { AppInput, DropdownMenu },
    data() {
      return {
        currentMenu: '',
        filter: {
          type: 'Продажа',
          object_type: 'Квартира',
          rooms: '1-комнатная',
          price_from: '',
          price_to: '',
          district: 'Дзержинский район'
        },
        filter_options: {
          type: ['Продажа', 'Аренда'],
          object_type: ['Квартира', 'Комната', 'Коммерческая недвижимость', 'Дом или дача', 'Гараж или хозблок', 'Земельный участок'],
          rooms: ['Студия', '1-комнатная', '2-комнатная', '3-комнатная', '4-комнатная', '5-комнатная', '6-комнатная'],
          district: ['Дзержинский район', 'Заволжский район', 'Кировский район', 'Красноперекопский район', 'Ленинский район', 'Ярославский район', 'Ярославская область'],
        }
      }
    }

  }
</script>