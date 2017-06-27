<template>
  <div :class="$style.second">
    <div :class="$style.second__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <span :class="$style.group__title">Адрес</span>
          <app-input v-model="value.house_city" placeholder="Населенный пункт" />
          <div :class="$style.wrapper">
            <app-input :class="$style.group__address" v-model="value.house_address" placeholder="Улица" />
            <app-input :class="$style.group__house_number" v-model="value.house_number" placeholder="Дом" />
          </div>
          <select :class="$style.group__district" v-model="value.house_district">
            <option :class="$style.district__option" value="1">Дзержинский район</option>
            <option :class="$style.district__option" value="2">Заволжский район</option>
            <option :class="$style.district__option" value="3">Кировский район</option>
            <option :class="$style.district__option" value="4">Красноперекопский район</option>
            <option :class="$style.district__option" value="5">Ленинский район</option>
            <option :class="$style.district__option" value="6">Ярославский район</option>
            <option :class="$style.district__option" value="7">Ярославская область</option>
          </select>
          <textarea :class="$style.group__waymark" v-model="value.house_waymark" rows="5" placeholder="Дополнительные ориентиры"></textarea>
        </div>
      </div>
    </div>
    <div :class="$style.second__content">
      <div :class="$style.wrapper">
        <div :class="$style.content__group">
          <span :class="$style.group__title">Параметры дома</span>
          <div :class="$style.group__type">
            <div :class="$style.type__label">Тип:</div>
            <div :class="$style.type__options">
              <app-input :class="$style.options__item" v-model="value.house_type" option="secondary" name="houseType" type="radio">вторичное
              </app-input><app-input :class="$style.options__item" v-model="value.house_type" option="new" name="houseType" type="radio">новостройка</app-input>
            </div>
          </div>
          <div :class="$style.group__material">
            <div :class="$style.material__label">Материал:</div>
            <div :class="$style.material__options">
              <app-input :class="$style.options__item" v-model="value.house_material" option="block" name="houseMaterial" type="radio">блочный
              </app-input><app-input :class="$style.options__item" v-model="value.house_material" option="wood" name="houseMaterial" type="radio">деревянный
              </app-input><app-input :class="$style.options__item" v-model="value.house_material" option="brick" name="houseMaterial" type="radio">кирпич
              </app-input><app-input :class="$style.options__item" v-model="value.house_material" option="monolith" name="houseMaterial" type="radio">монолит
              </app-input><app-input :class="$style.options__item" v-model="value.house_material" option="panel" name="houseMaterial" type="radio">панель</app-input>
            </div>
          </div>
        </div>
        <div :class="$style.content__group">
          <span :class="$style.group__title">Параметры квартиры</span>
          <div :class="$style.group__main_params">
            <div :class="$style.main_params__rooms">
              <div :class="$style.rooms__label">Комнат:</div>
              <select :class="$style.rooms__options" v-model="value.apartment_rooms">
                <option :class="$style.options__item" value=1>1</option>
                <option :class="$style.options__item" value=2>2</option>
                <option :class="$style.options__item" value=3>3</option>
                <option :class="$style.options__item" value=4>4</option>
                <option :class="$style.options__item" value=5>5</option>
                <option :class="$style.options__item" value=6>6</option>
                <option :class="$style.options__item" value=7>7</option>
              </select>
            </div>
            <div :class="$style.main_params__floor">
              <div :class="$style.floor__label">Этаж:</div>
              <select :class="$style.floor__options" v-model="value.apartment_floor">
                <option :class="$style.options__item" value=1>1</option>
                <option :class="$style.options__item" value=2>2</option>
                <option :class="$style.options__item" value=3>3</option>
                <option :class="$style.options__item" value=4>4</option>
                <option :class="$style.options__item" value=5>5</option>
                <option :class="$style.options__item" value=6>6</option>
                <option :class="$style.options__item" value=7>7</option>
                <option :class="$style.options__item" value=8>8</option>
                <option :class="$style.options__item" value=9>9</option>
                <option :class="$style.options__item" value=10>10</option>
                <option :class="$style.options__item" value=11>11</option>
                <option :class="$style.options__item" value=12>12</option>
                <option :class="$style.options__item" value=13>13</option>
                <option :class="$style.options__item" value=14>14</option>
                <option :class="$style.options__item" value=15>15</option>
                <option :class="$style.options__item" value=16>16</option>
                <option :class="$style.options__item" value=17>17</option>
                <option :class="$style.options__item" value=18>18</option>
                <option :class="$style.options__item" value=19>19</option>
                <option :class="$style.options__item" value=20>20</option>
              </select>
              <div :class="$style.floors__label">/</div>
              <select :class="$style.floors__options" v-model="value.house_floors">
                <option :class="$style.options__item" value=1>1</option>
                <option :class="$style.options__item" value=2>2</option>
                <option :class="$style.options__item" value=3>3</option>
                <option :class="$style.options__item" value=4>4</option>
                <option :class="$style.options__item" value=5>5</option>
                <option :class="$style.options__item" value=6>6</option>
                <option :class="$style.options__item" value=7>7</option>
                <option :class="$style.options__item" value=8>8</option>
                <option :class="$style.options__item" value=9>9</option>
                <option :class="$style.options__item" value=10>10</option>
                <option :class="$style.options__item" value=11>11</option>
                <option :class="$style.options__item" value=12>12</option>
                <option :class="$style.options__item" value=13>13</option>
                <option :class="$style.options__item" value=14>14</option>
                <option :class="$style.options__item" value=15>15</option>
                <option :class="$style.options__item" value=16>16</option>
                <option :class="$style.options__item" value=17>17</option>
                <option :class="$style.options__item" value=18>18</option>
                <option :class="$style.options__item" value=19>19</option>
                <option :class="$style.options__item" value=20>20</option>
              </select>
            </div>
          </div>
          <div :class="$style.group__area">
            <div :class="$style.area__full">
              <div :class="$style.full__label">Общая площадь:</div>
              <app-input :class="$style.full__input" v-model="value.apartments_full_area" type="number" />
            </div>
            <div :class="$style.area__living">
              <div :class="$style.living__label">Жилая площадь:</div>
              <app-input :class="$style.living__input" v-model="value.apartments_living_area" type="number" />
            </div>
            
          </div>
          <div :class="$style.group__furnish">
            <div :class="$style.furnish__label">Отделка:</div>
            <div :class="$style.furnish__options">
              <app-input :class="$style.options__item" v-model="value.apartment_furnish" option="1" name="apartmentFurnish" type="radio">требует ремонта
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_furnish" option="2" name="apartmentFurnish" type="radio">черновая
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_furnish" option="3" name="apartmentFurnish" type="radio">от застройщика
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_furnish" option="4" name="apartmentFurnish" type="radio">жилое состояние
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_furnish" option="5" name="apartmentFurnish" type="radio">косметика
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_furnish" option="6" name="apartmentFurnish" type="radio">евро</app-input>
            </div>
          </div>
          <div :class="$style.group__bathroom">
            <div :class="$style.bathroom__label">Санузел:</div>
            <div :class="$style.bathroom__options">
              <app-input :class="$style.options__item" v-model="value.apartment_bathroom" option="1" name="apartmentBathroom" type="radio">без удобств
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_bathroom" option="2" name="apartmentBathroom" type="radio">раздельный
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_bathroom" option="3" name="apartmentBathroom" type="radio">совмещенный
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_bathroom" option="4" name="apartmentBathroom" type="radio">только душ / ванна</app-input>
            </div>
          </div>
          <div :class="$style.group__balcony">
            <div :class="$style.balcony__label">Балкон:</div>
            <div :class="$style.balcony__options">
              <app-input :class="$style.options__item" v-model="value.apartment_balcony" option="true" name="apartmentBalcony" type="radio">есть
              </app-input><app-input :class="$style.options__item" v-model="value.apartment_balcony" option="false" name="apartmentBalcony" type="radio">отсутствует</app-input>
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
      width: 80%;
      float: left;
      > .options__item { width: 50% }
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
      > .options__item { width: 50%; margin-bottom: 5px; }
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
      > .options__item { width: 50%; margin-bottom: 5px; }
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
      > .options__item { width: 50%; margin-bottom: 5px; }
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
  import AppInput from './inputs.vue';
  import AppUploadImages from './upload-images.vue';

  export default {
    name: 'new-offer-second-step',
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