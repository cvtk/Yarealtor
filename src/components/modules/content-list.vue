<template>
  <ul :class="$style.content__list">
    <li v-for="item in data" :class="$style.list__item">
      <span :class="$style.item__type">Продажа</span>
      <router-link :to="{ name: 'offer', params: { id: item.id } }" :class="$style.wrapper_image">
        <nav :class="$style.item__thumbnails_navigation">
          <div :class="$style.thumbnails_navigation__item"
            v-for="index in [0,1,2,3]"
            @mouseover="item.image = item.thumbs[index]">    
          </div>
        </nav>
        <div :class="$style.item__image" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
      </router-link>
      <div :class="$style.item__content">
        <div :class="$style.row">
          <router-link :class="$style.content__title" :to="{ name: 'offer', params: { id: item.id } }">
            {{ item.rooms }}-к квартира, {{ item.area }} м², {{ item.floor }}/{{ item.estate.floors }} эт.
          </router-link>
          <span :class="$style.content__price">{{ item.price | price }} руб.</span>
        </div>
        <div :class="$style.row">
          <div :class="$style.content__meta">
            <div :class="$style.meta__address">г. Ярославль, ул. Бабича, 7</div>
          </div>
          <span :class="$style.content__date">{{ item.date | unixToDate }}</span>
        </div>
         <div :class="$style.content__description">Вам будут завидовать! Невероятный жилой комплекс БИЗНЕС-КЛАССА на улице Савушкина с видами на Финский залив! Элитное расположение вблизи центра! Евродвушка с кухней-гостиной 19.58 м2, раздельным санузлом и большим застекленным балконом 7.26 м2! Отличный 11й этаж!
         </div>
         <div :class="$style.content__foot">
           <router-link :to="{ name: 'offer', params: { id: item.id } }" :class="[$style.foot__item, $style._favorites]">43</router-link>
           <router-link :to="{ name: 'user', params: { page: 'ivanov' } }"  :class="[$style.foot__item, $style._author]">Дмитрий Петров</router-link>
           <router-link :to="{ name: 'company', params: { page: 'gazprom' } }"  :class="[$style.foot__item, $style._company]">ЗАО «ГАЗПРОМ»</router-link>
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
    width: 10%;
    float: left;
    padding-top: 10%;
  }
  .item__thumbnails_navigation {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    opacity: .9;
    z-index: 1;
    margin-bottom: -4px;
    &:after { @include clearfix }

    .thumbnails_navigation__item {
      width: 25%;
      height: 100%;
      float: left;
      border-bottom: 4px solid transparent;
      transition: border-color .2s ease-in-out;
      &:hover { border-bottom: 4px solid #32c5d2 }
    }
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
    width: 90%;
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
    text-decoration: none;
    transition: color .2s ease-in-out;
    &:hover { color: #3e4b5c }
  }

  .content__price {
    display: block;
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

  .meta__address {
    display: inline-block;
    color: #5b9bd1;
    white-space: pre;
    margin-right: 10px;
    &:before {
      content: "\e096";
      font-family: "Icons";
      font-size: 13px;
      margin-right: 3px;
    }
  }

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

  .content__foot {
    border-top: 1px solid #f0f1f2;
    padding-top: 20px;
    margin-top: 20px;
    text-align: right;
    > .foot__item {
      display: inline-block;
      color: #5a7391;
      transition: color .2s ease-in-out;
      text-decoration: none;
      white-space: pre;
      font-weight: 400;
      margin-right: 15px;
      &:hover { color: lighten(#5a7391, 10%) }
      &:before {
        content: "";
        font-family: "Icons";
        font-size: 13px;
        margin-right: 3px;
      }
    }
    > ._author:before { content: "\e005"; }
    > ._company:before { content: "\e001" }
    > ._favorites:before { content: "\e09b" }
    > ._comments:before { content: "\e04a" }
  }


  .content__list {
    @media (max-width: $bp-extra-large) {
      .wrapper_image { width: 15%; padding-top: 15%; }
      .item__content { width: 85% }
    }
    @media (max-width: $bp-large) {
      .wrapper_image { width: 20%; padding-top: 20%; }
      .item__content { width: 80% }
    }
    @media (max-width: $bp-medium) {
      .wrapper_image { width: 30%; padding-top: 30%; }
      .item__content { width: 70% }
    }
    @media (max-width: $bp-small) {
      .wrapper_image { width: 40%; padding-top: 40%; }
      .item__content { width: 60% }
    }
    @media (max-width: $bp-extra-small) {
      .wrapper_image { width: 100%; padding-top: 80%; }
      .item__content {
        width: 100%;
        padding-left: 0;
        padding-top: 10px;
      }
      .content__title {
        width: 100%;
        margin-bottom: 0;
        float: none;
        font-weight: 400;
        font-size: 18px
      }
      .content__price {
        width: 100%;
        float: none;
        text-align: left;
        margin-bottom: 0;
      }
      .content__meta { width: 100%; margin-bottom: 0; }
      .content__date {
        width: 100%;
        display: inline-block;
        color: #5b9bd1;
        transition: color .2s ease-in-out;
        white-space: pre;
        text-align: left;
        &:hover { color: #578ebe }
        &:before {
          content: "\e081";
          font-family: "Icons";
          font-size: 13px;
          margin-right: 3px;
        }
      }
      .content__description {  }
    }
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