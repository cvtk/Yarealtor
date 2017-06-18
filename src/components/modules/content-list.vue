<template>
  <ul :class="$style.content__list">
    <li v-for="item in data" :class="$style.list__item">
      <span :class="$style.item__type">Продажа</span>
      <div :class="$style.wrapper_image">
        <div :class="$style.item__image" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
      </div>
      <div :class="$style.item__content">
        <div :class="$style.row">
          <h3 :class="$style.content__title">{{ item.rooms }}-к квартира, {{ item.area }} м², {{ item.floor }}/{{ item.estate.floors }} эт.</h3>
          <span :class="$style.content__price">{{ item.price | price }} руб.</span>
        </div>
        <div :class="$style.row">
          <div :class="$style.content__meta">
            <a href="#" :class="$style.meta__author">Сергей Иванов</a>
            <a href="#" :class="$style.meta__company">ООО "Длинное название компании"</a>
          </div>
          <span :class="$style.content__date">Сегодня, 14:37</span>
        </div>
         <div :class="$style.content__description">Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!
         </div>
      </div>
    </li>
  </ul>
</template>
<style lang="scss" module>
  @import "../../assets/style.scss";

  .content__list {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    &:after { @include clearfix }
  }

  .list__item {
    display: block;
    position: relative;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 20px;
    &:after { @include clearfix }
  }

  .row {
    position: relative;
    &:after { @include clearfix }
  }

  .wrapper_image {
    position: relative;
    width: 25%;
    float: left;
    padding-top: 25%;
    overflow: hidden;
  }

  .item__image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    transition: transform .3s ease-in-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .item__type {
    position: absolute;
    left: 10px;
    background: #3e4b5c;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 3px 15px;
    top: 35px;
    line-height: 2;
    z-index: 1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.1);   
    &:after {
      position: absolute;
      left: 0;
      bottom: -5px;
      border-top: 5px solid #2b3643;
      width: 5px;
      content: " ";
      z-index: 1;
      display: block;
      border-left: 5px solid #f6f6f6;
    }
  }

  .item__content {
    width: 75%;
    float: left;
    padding-left: 15px;
  }

  .content__title {
    width: 66.666667%;
    float: left;
    color: #5a7391;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    margin-bottom: 5px;
  }

  .content__price {
    width: 33.333333%;
    float: right;
    text-align: right;
    color: #32c5d2;
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    margin-bottom: 5px;
  }

  .content__meta {
    width: 66.666667%;
    float: left;
    margin-bottom: 10px;
  }

  .meta__author, .meta__company {
    display: inline-block;
    color: #5b9bd1;
    transition: color .2s ease-in-out;
    text-decoration: none;
    white-space: pre;
    margin-right: 10px;
    &:hover { color: #578ebe }
    &:before {
      content: "\e005";
      font-family: "Icons";
      font-size: 13px;
      margin-right: 3px;
    }
  }

  .meta__company:before { content: "\e001" }

  .content__date {
    width: 33.333333%;
    float: right;
    text-align: right;
    margin-bottom: 10px;
  }

  .content__description {
    width: 100%;
    margin-bottom: 7px;
  }

</style>

<script>
  import AppFilters from '../helpers/filters.js';

  export default {
    name: 'app-content-list',
    props: ['data'],
    filters: AppFilters
  }
</script>