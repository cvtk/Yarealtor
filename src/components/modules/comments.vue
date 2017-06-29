<template>
  <div :class="$style.comments">
    <div :class="$style.comments__roll_down" @click="rollDown = !rollDown">Показать все комментарии ({{ comments.length }})</div>
    <div :class="$style.comments__item" v-for="(comment, index) in commentsByTimestamp" v-show="isLast(index) || rollDown">
      <div :class="$style.item__userpic">
        <img :src="comment.author.photo" :class="$style.userpic__image">
      </div>
      <div :class="$style.comments__body">
        <div :class="$style.body__header">
          <div :class="$style.header__meta">
            <router-link :to="{ name: 'user', params: { page: comment.author.page } }" :class="$style.meta__author">{{ comment.author.name }}</router-link>
            <span :class="$style.meta__date">{{ comment.created | unixToDate }}</span>
          </div>
          <!-- <div :class="$style.header__menu"><span :class="$style.menu__icon"></span></div> -->
        </div>
        <div :class="$style.body__content"> {{ comment.message }} </div>
        <div :class="$style.body__answer">
          <span :class="$style.answer__to">Ответ для <router-link :to="{ name: 'user', params: { page: comment.to.page } }" :class="$style.to__link">{{ comment.to.name }}</router-link>
          </span>
          <span :class="$style.answer__button">Ответить</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";
  /* comments */
    .comments {
      background-color: #fff;
      padding: 0 20px;
      border: 1px solid lighten(#b4bcc8, 15%);
      border-top: none;
    }

    .comments__item {
      padding-top: 10px;
      &:last-child:after { margin: 0; height: 0; margin-bottom: 10px; }
      &:after {
        margin-top: 5px;
        width: 100%;
        height: 2px;
        background-color: #f5f6fa;
        @include clearfix;
      }
    }

    .item__userpic {
      position: relative;
      float: left;
      width: 40px;
      height: 40px;
    }

    .userpic__image {
      max-width: 100%;
      border: 4px solid #f5f6fa;
      border-radius: 50%;
    }

    .comments__body {
      position: relative;
      padding: 2px 10px;
      margin-left: 40px;
    }

    .body__header {
      overflow: auto;
      &:after { @include clearfix }
    }
    .header__meta {
      float: left;
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
    }
    .header__menu {
      float: right;
      width: 10%;
      text-align: right;
    }
    
    .menu__icon {
      display: inline-block;
      cursor: pointer;
      padding: 0 5px;
      line-height: 19px;
      &:after {
        content: "\e603";
        font-family: "Icons";
        font-size: 16px;
        color: lighten(#364150, 25%);
        vertical-align: middle;
        transition: color .2s ease-in-out;
      }
      &:hover:after { color: lighten(#364150, 5%) }
    }
    .meta__author {
      font-weight: 400;
      color: #578ebe;
      text-decoration: none;
      transition: color .2s ease-in-out;
      &:hover {
        text-decoration: underline;
        color: #23527c;
      }
    }
    .meta__date {
      font-size: 12px;
      margin-left: 5px;
      color: #95A5A6;
    }
    .body__content {
      color: #777;
    }
    .body__answer {
      position: relative;
      margin-top: 5px;
      &:after { @include clearfix }
    }
    .answer__to {
      font-size: 12px;
      color: #95A5A6;
      float: left;
    }

    .to__link {
      color: #95A5A6;
      text-decoration: none;
      transition: color .2s ease-in-out;
      &:hover { text-decoration: underline }
    }

    .answer__button {
      display: inline-block;
      float: right;
      font-size: 12px;
      color: #578ebe;
      cursor: pointer;
      transition: color .2s ease-in-out;
      &:hover { text-decoration: underline; color: #23527c; }
    }
    .comments__roll_down {
      padding: 10px;
      margin: 0 -21px;
      color: #f1f1f1;
      text-align: center;
      background-color: #b4bcc8;
      cursor: pointer;
      transition: background-color .2s ease-in-out;
      &:hover {
        background-color: #3e4b5c;
      }
    }
</style>

<script>
  import AppFilters from '../helpers/filters.js';

  export default {
    name: 'comments',
    props: ['comments'],
    filters: AppFilters,
    methods: {
      isLast(index) {
        return this.comments.length === index + 1;
      }
    },
    computed: {
      commentsByTimestamp: function() {
        return this.comments.sort(function(x, y) {
          return x.timestamp - y.timestamp;
        });
      }
    },
    data() {
      return {
        rollDown: false
      }
    }
  }
</script>