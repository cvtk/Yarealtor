<template>
  <transition name="fade">
    <div :class="$style.comment">
      <div :class="$style.comment__userpic">
        <div :style="{ 'background-image': 'url(' + comment.author.photo + ')' }"
          :class="$style.userpic__image">
        </div>
      </div>
      <div :class="$style.comment__body">
        <div :class="$style.body__header">
          <div :class="$style.header__meta">
            <router-link :to="{ name: 'user', params: { page: comment.author.page } }" :class="$style.meta__author">{{ comment.author.name }} {{ comment.author.surname }}</router-link>
            <span :class="$style.meta__date">{{ comment.created | unixToDate }}</span>
          </div>
          <div :class="$style.header__menu" v-show="isOwner" title="Удалить комментарий" @click="removeComment"><span :class="$style.menu__icon"></span></div>
        </div>
        <div :class="$style.body__content"> {{ comment.message }} </div>
        <div :class="$style.body__answer">
          <span :class="$style.answer__to">Ответ для <router-link :to="{ name: 'user', params: { page: comment.to.page } }" :class="$style.to__link">{{ comment.to.name }}</router-link>
          </span>
          <span :class="$style.answer__button" @click="leaveAnswer">Ответить</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>

<style lang="scss" module>
  @import "../../assets/style.scss";
    .comment {
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

    .comment__userpic {
      position: relative;
      float: left;
      width: 40px;
      height: 40px;
    }

    .userpic__image {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 4px solid #f5f6fa;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }

    .comment__body {
      position: relative;
      padding: 2px 0;
      padding-left: 10px;
      margin-left: 40px;
    }

    .body__header {
      overflow: hidden;
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
      line-height: 19px;
      padding-left: 5px;
      &:after {
        content: "\e054";
        font-family: "Icons";
        font-size: 14px;
        color: lighten(#364150, 35%);
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
      word-wrap: break-word;
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
</style>

<script>
  import AppFilters from '../helpers/filters.js';

  export default {
    name: 'comment',
    props: ['comment', 'auth'],
    filters: AppFilters,
    methods: {
      removeComment() {
        this.$emit('onCommentRemove', this.comment.key);
      },
      leaveAnswer() {
        this.$emit('onAnswerLeave', this.comment);
      }
      
    },
    computed: {
      isOwner() {
        return this.comment.author.key === this.auth.uid;
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>