<template>
  <div :class="$style.timeline_post">
    <div :class="$style.timeline_post_wrapper">

      <div :class="[$style.dropdown_wrapper, dropdownToggled || $style.__hidden]" @mouseleave="dropdownToggled = false">
        <ul :class="$style.timeline_post__dropdown">
          <li :class="$style.dropdown__item" v-if="isOwner" @click="removePost">
            <span :class="$style.item__title">Удалить</span>
          </li>
          <li :class="$style.dropdown__item" @click="focusCommentField">
            <span :class="$style.item__title">Комментировать</span>
          </li>
          <li :class="$style.dropdown__item" v-if="!isOwner">
            <span :class="$style.item__title">Пожаловаться</span>
          </li>
        </ul>
      </div>

      <div :class="$style.timeline_post__userpic">
        <img :src="post.author.photo" :class="$style.userpic__image">
      </div>

      <div :class="$style.timeline_post__body">
        <div :class="$style.body__header">
          <div :class="$style.header__meta">
            <router-link :class="$style.meta__author"
              :to="{ name: 'user', params: { page: post.author.page } }">{{ post.author.name }}</router-link>
            <span :class="$style.meta__date">{{ post.created | unixToDate }}</span>
          </div>
          <div :class="$style.header__menu" @click="dropdownToggled = !dropdownToggled">
            <span :class="$style.menu__icon"></span>
          </div>
        </div>
        <div :class="$style.body__content">{{ post.message }}</div>
      </div>

      <div :class="$style.timeline_post__comments">
        <div :class="$style.comments__roll_down" v-if="commentsCount > 1" @click="rollDown = !rollDown">Показать все комментарии ({{ commentsCount }})</div>
          <app-comment
            @onAnswerLeave="leaveAnswer"
            @onCommentRemove="removeComment"
            :comment="comment" 
            :key="comment.key"
            :auth="auth"
            v-show="isLastComment(index) || rollDown"
            v-for="(comment, key, index) in post.comments">    
          </app-comment>
        <div :class="$style.comments__publish">
          <textarea rows="1" :class="$style.publish__input" :placeholder="'Ваш ответ для ' + commentTo" v-model="newComment.message"
            @keyup="fieldAutoResize" @keydown.enter.prevent="leaveComment" @keydown.enter.ctrl="newLineCommentField" ref="commentField">
          </textarea>
          <div :class="$style.publish__button" @click="leaveComment"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>

<style lang="scss" module>
  @import "../../assets/style.scss";

  .timeline_post {
    position: relative;
    margin-top: 20px;
    &:last-child { margin-bottom: 20px }
    &:after { @include clearfix }
    .timeline_post_wrapper { /* */ }

    .dropdown_wrapper {
      opacity: 1;
      visibility: visible;
      position: absolute;
      padding: 25px;
      right: -5px;
      top: 20px;
      z-index: 1;
      transition: visibility .2s ease-in-out, opacity .2s ease-in-out, top .2s ease-in-out;
      &.__hidden { visibility: hidden; opacity: 0; top: 55px; }
    }

    .timeline_post__dropdown {
      position: relative;
      text-align: left;
      width: 155px;
      background-color: #fff;
      margin: 0;
      padding: 0;
      list-style: none;
      line-height: 0;
      border: 1px solid #c2cad8;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
      &:after {
        position: absolute;
        top: -6px;
        right: 7px;
        display: block;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
        border-left: 6px solid transparent;
        content: '';
      }
      &:before {
        position: absolute;
        top: -8px;
        right: 6px;
        display: block;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #c2cad8;
        border-left: 7px solid transparent;
        content: '';
      }

      .dropdown__item {
        color: #555;
        cursor: pointer;
        padding: 8px 16px;
        line-height: 18px;
        transition: background-color .1s ease-in-out;
        &:hover { background-color: #f6f6f6 }
      }
    }

    .timeline_post__userpic {
      position: relative;
      float: left;
      width: 80px;
      height: 80px;

      .userpic__image {
        max-width: 100%;
        border: 4px solid #f5f6fa;
        border-radius: 50%;
      }
    }

    .timeline_post__body {
      position: relative;
      padding: 20px;
      margin-left: 110px;
      background-color: #f5f6fa;
      &:before {
        content: "";
        position: absolute;
        top: 30px;
        left: -14px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 14px 14px 14px 0;
        border-color: transparent #f5f6fa transparent transparent;
      }
      .body__header {
        margin-bottom: 10px;
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
        position: relative;
        float: right;
        width: 10%;
        text-align: right;
      }
      
      .menu__icon {
        display: inline-block;
        cursor: pointer;
        padding: 0 5px;
        line-height: 22px;
        &:after {
          content: "\e603";
          font-family: "Icons";
          font-size: 18px;
          color: lighten(#364150, 25%);
          vertical-align: middle;
          transition: color .2s ease-in-out;
        }
        &:hover:after { color: lighten(#364150, 5%) }
      }
      .meta__author {
        font-size: 16px;
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
        margin-left: 10px;
        color: #95A5A6;
      }
      .body__content {
        color: #777;
      }
    }

    .timeline_post__comments {
      position: relative;
      margin-left: 110px;
      background-color: #fff;
      padding: 0 20px;
      border: 1px solid lighten(#b4bcc8, 15%);

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

      .comments__publish {
        position: relative;
        margin: -1px -20px 0;
        line-height: 0;
        &:after { @include clearfix }
      }
      .publish__input {
        display: block;
        width: 100%;
        outline: none;
        padding: 12px 10px;
        padding-right: 40px;
        color: #364150;
        border: 1px solid #c2cad8;
        min-height: 42px;
        max-height: 100px;
        &::-webkit-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        &::-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        &:-ms-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        &:-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        resize: none;
        transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
        overflow: hidden;
        &:focus {
          border-color: #93a1bb;
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
        }
      }

      .publish__button {
        position: absolute;
        right: 1px;
        top: 1px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        &:after {
          display: inline-block;
          width: 40px;
          height: 40px;
          content: "\e02c";
          font-family: "Icons";
          color: lighten(#3e4b5c, 15%);
          font-size: 20px;
          transition: color .2s ease-in-out
        }
        &:hover:after { color: #3e4b5c }
      }
    }
  }
</style>

<script>
  import AppLoader from '../app-loader.vue';
  import AppComment from './comment.vue';
  import AppFilters from '../helpers/filters.js';
  import Firebase from 'firebase';
  import firebase from '../../firebase.js';

  const usersRef = firebase.database().ref('users');
  const commentsRef = firebase.database().ref('comments');

  export default {
    name: 'timeline-post',
    props: ['post', 'auth'],
    components: { AppLoader, AppComment },
    filters: AppFilters,
    methods: {
      leaveAnswer(comment) {
        this.commentTo = comment.author.name;
        this.newComment.to = comment.author.key;
        this.focusCommentField();
      },
      removeComment(key) {
        commentsRef.child(key).remove();
      },
      newLineCommentField(event) {
        let field = event.target,
            value = field.value;
        field.value = value + '\n';
      },
      focusCommentField() {
        this.dropdownToggled = false;
        this.$refs.commentField.focus();
      },
      removePost() {
        this.dropdownToggled = false;
        this.$emit('onPostRemove', this.post.key)
      },
      leaveComment() {
        this.dropdownToggled = false;
        if ( this.newComment.message ) {
          this.$emit('onCommentLeave', this.newComment);
          this.newComment.message = '';
          this.commentTo = this.post.author.name;
          this.newComment.to = this.post.author.key;
        }
      },
      isLastComment(index) {
        return this.commentsCount === index + 1;
      },
      fieldAutoResize(event) {
        let field = event.target;
        field.style.height = "5px";
        field.style.height = (field.scrollHeight)+"px";
      },
    },
    computed: {
      isOwner() {
        return this.post.author.key === this.auth.uid;
      }
    },
    data() {
      return {
        rollDown: false,
        dropdownToggled: false,
        commentsCount: 0,
        dataReady: false,
        commentTo: this.post.author.name,
        newComment: {
          message: '',
          post: this.post.key,
          to: this.post.author.key,
          author: this.auth.uid
        }
      }
    },
    mounted() {
      commentsRef.orderByChild('post').equalTo(this.post.key).on('value', comments => {
        let tmpComments = {};
        if ( comments.exists() ) {
          tmpComments = comments.val();
          comments.forEach(comment => {
            usersRef.child(comment.child('author').val()).once('value', author => tmpComments[comment.key].author = author.val());
            usersRef.child(comment.child('to').val()).once('value', to => tmpComments[comment.key].to = to.val());
          })
        }
        this.$set( this.post, 'comments', tmpComments );
        this.dataReady = true;
      })
      commentsRef.orderByChild('post').equalTo(this.post.key).on('child_added', () => this.commentsCount += 1)
      commentsRef.orderByChild('post').equalTo(this.post.key).on('child_removed', comment => {
        this.$delete(this.post.comments, comment.key);
        this.commentsCount -= 1;
      })
    }
  }
</script>