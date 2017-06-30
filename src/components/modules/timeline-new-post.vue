<template>
  <div :class="$style.new_post">
    <div :class="$style.post__userpic">
      <img src="/static/users/default-3.svg" :class="$style.userpic__image">
    </div>
    <div :class="$style.post__message">
      <textarea rows="1" :class="$style.message__input" v-model="newPost.message" @keydown.ctrl.enter="publish" placeholder="Сообщение..."></textarea>
    </div>
    <div :class="$style.post__poll" v-if="includePoll">
      <div :class="$style.poll_wrapper" v-for="(answer, index) in newPost.includes.poll">
        <app-input @keydown.enter.native="newPost.includes.poll.push('Следующий вариант ответа')" v-model="newPost.includes.poll[index]" placeholder="answer"></app-input>
      </div>
      
    </div>
    <div :class="$style.post__actions">
      <app-input :class="$style.actions__send" type="button" @click="publish">Отправить</app-input>
      <div :class="[$style.actions__add_poll, includePoll && $style._active]" title="Добавить опрос" @click="includePoll = !includePoll"></div>
      <app-upload-images type="hidden" :class="$style.actions__add_images" v-model="newPost.includes.images" title="Добавить фото" ></app-upload-images>
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
  .new_post {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    overflow: auto;
    &:after { @include clearfix }

    .post__userpic {
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

    .post__message {
      position: relative;
      margin-left: 60px;
    }

    .message__input {
      width: 100%;
      border: none;
      outline: none;
      padding: 12px 10px;
      color: #364150;
      border: 1px solid #c2cad8;
      &::-webkit-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
      &::-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
      &:-ms-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
      &:-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
      resize: vertical;
      transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
      &:focus {
        border-color: #93a1bb;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
      }
    }
    .post__poll {
      position: relative;
      padding-top: 15px;
      margin-left: 60px;
    }
    .post__actions {
      padding-top: 15px;
      margin-left: 60px;
      &:after { @include clearfix }
    }
    .actions__add_poll {
      display: inline-block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      float: left;
      &:after {
        display: inline-block;
        width: 40px;
        height: 40px;
        content: "\e077";
        font-family: "Icons";
        color: #b4bcc8;
        font-size: 20px;
        transition: color .2s ease-in-out
      }
      &:hover:after, &._active:after { color: #3e4b5c }
    }
    .actions__add_images {
      display: inline-block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      float: left;
      &:after {
        display: inline-block;
        width: 40px;
        height: 40px;
        content: "\e07f";
        font-family: "Icons";
        color: #b4bcc8;
        font-size: 20px;
        transition: color .2s ease-in-out
      }
      &:hover:after { color: #3e4b5c }
    }
    .actions__send {
      padding: 7px 10px;
      color: #f1f1f1;
      font-size: 14px;
      float: right;
    }
  }
  
</style>

<script>

  import Firebase from 'firebase';
  import firebase from '../../firebase.js';

  const usersRef = firebase.database().ref('users');
  const postsRef = firebase.database().ref('posts');

  export default {
    name: 'timeline-post',
    props: ['auth'],
    components: { AppLoader, AppComment },
    filters: AppFilters,
    methods: {
      leavePost() {

      }
    },
    data() {
      return {
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