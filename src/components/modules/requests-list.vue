<template>
  <ul :class="$style.content__list">
    <li v-for="item in data" :class="$style.list__item">
      <div :class="$style.item__content">
        <div :class="$style.row">
          <h2 :class="$style.content__title">
            Ищу: {{ item.rooms }}-к квартиру, от {{ item.area }} м², этаж неважен
          </h2>
          <span :class="$style.content__price">до {{ item.price | price }} руб.</span>
        </div>
        <div :class="$style.row">
          <div :class="$style.content__meta">
            <div :class="$style.meta__address">г. {{ item.estate.city }}, {{ item.estate.address }}</div>
          </div>
          <span :class="$style.content__date">{{ item.date | unixToDate }}</span>
        </div>
         <div :class="$style.content__description">Сообщенние дополняющие заявку. Любая необходимая дополнительная информация, которая может потребоваться.Сообщенние дополняющие заявку. Любая необходимая дополнительная информация, которая может потребоваться.</div>
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

  .item__content {
    width: 100%;
    position: relative;
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

    @media (max-width: $bp-extra-small) {
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