<template>
  <div :class="$style.news">
    <div :class="$style.news__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Новости</li>
      </ul>
    </div>
    <div :class="$style.news__toolbar">
      <h1 :class="$style.toolbar__title">Новости<span :class="$style._small">лента событий</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    
    <div :class="$style.news__main">
      <div :class="$style.main_wrapper">
        <div :class="$style.main__post">
          <div :class="$style.post__userpic">
            <img src="/static/users/default-3.svg" :class="$style.userpic__image">
          </div>
          <div :class="$style.post__message">
            <textarea rows="1" :class="$style.message__input" v-model="newPost.message" @keydown.ctrl.enter="publish" placeholder="Ваши новости..."></textarea>
          </div>
          <div :class="$style.post__actions">
            <app-input :class="$style.actions__send" type="button" @click="publish">Отправить</app-input>
          </div>
        </div>
        <div :class="$style.main__timeline" v-if="dataReady">
          <div :class="$style.timeline__item" v-for="post in postsByTimestamp" :key="post.key">
            <div :class="$style.item__userpic">
              <img :src="post.user.photo" :class="$style.userpic__image">
            </div>
            <div :class="$style.timeline__body">
              <div :class="$style.body__header">
                <div :class="$style.header__meta">
                  <router-link :to="{ name: 'user', params: { page: post.user.page } }" :class="$style.meta__author">{{ post.user.name }}</router-link>
                  <span :class="$style.meta__date">{{ post.timestamp | unixToDate }}</span>
                </div>
                <div :class="$style.header__menu"><span :class="$style.menu__icon"></span></div>
              </div>
              <div :class="$style.body__content"> {{ post.message }} </div>
            </div>
            <div :class="$style.item__comments">
              <app-comments :comments="post.comments"></app-comments>
              <div :class="$style.comments__publish">
                <textarea rows="2" :class="$style.publish__input" @keydown.ctrl.enter="comment(post, $event)"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <app-ad-sidebar :class="$style.main__ad"></app-ad-sidebar>
    </div>
  </div>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>

<style lang="scss" module>
  @import "../assets/style.scss";
  /* news */
    .news {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* news__main */
    .news__main {
      position: relative;
    }

  /* main_wrapper */
    .main_wrapper {
      position: relative;
      margin-right: 300px;
    }

  .main__timeline {
    position: relative;
    padding: 0 20px;
    overflow: hidden;
    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 4px;
      background: #f5f6fa;
      top: 0;
      bottom: 0;
      margin-left: 38px;
    }

    .timeline__item {
      margin-top: 20px;
      &:after { @include clearfix }
    }

    .item__userpic {
      position: relative;
      float: left;
      width: 80px;
      height: 80px;
    }

    .userpic__image {
      max-width: 100%;
      border: 4px solid #f5f6fa;
      border-radius: 50%;
    }

    .timeline__body {
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
    .item__comments {
      position: relative;
      margin-left: 110px;
    }
  }

  .main__post {
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

    .post__actions {
      padding-top: 15px;
      &:after { @include clearfix }
    }

    .actions__send {
      padding: 7px 10px;
      color: #f1f1f1;
      font-size: 14px;
      float: right;
    }
  }

  /* news__bar */
    .news__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* news__toolbar */
    .news__toolbar { margin: 25px 0 }

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
    }
  
  /* main__content */
    .main__content {
      position: relative;
      margin-right: 300px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      height: auto;
      overflow: hidden;
      &:after { @include clearfix }
    }

  /* bar__breadcrumbs */
    .bar__breadcrumbs {
      padding: 11px 0;
      display: inline-block;
      float: left;
      margin: 0;
      list-style: none;
    }
    .breadcrumbs__item {
      display: inline-block;
      color: #888;
      cursor: pointer;
      line-height: 14px;
      &:last-child {
        cursor: default;
      }
    }
    .breadcrumbs__icon {
      color: #888;
      cursor: default;
      line-height: 14px;
      &:after {
        content: "\e606";
        display: inline-block;
        font-family: "Icons";
        cursor: default;
        font-size: 7px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }

  /* responsive */
    .news {
      @media (max-width: $bp-medium) {
        .main__ad { display: none }
        .main__content { margin-right: 0 }
      }
      @media (max-width: $bp-small) {
        ._small { display: none }
        .breadcrumbs__item:first-child { display: none }
      }
    }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppAdSidebar from './modules/ad-sidebar.vue';
  import AppComments from './modules/comments.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import Firebase from 'firebase';
  import firebase from '../firebase.js';

  const postsRef = firebase.database().ref('posts');
  const usersRef = firebase.database().ref('users');
  const commentsRef = firebase.database().ref('comments');

  export default {
    name: 'news',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, AppComments },
    filters: AppFilters,
    data() {
      return {
        dataReady: false,
        newPost: {
          message: '',
          user: this.auth.uid,
          comments: ''
        },
        posts: []
      }
    },
    mounted() {
      
      postsRef.on('child_added', snapshot => this.onPostAdded(snapshot));
      // postsRef.on('child_changed', snapshot => this.onChildChanged(snapshot));
    },
    computed: {
      postsByTimestamp: function() {
        return this.posts.sort( (a, b) => {
          a.timestamp - b.timestamp;
        });
      }
    },
    methods: {
      onPostAdded(snapshot) {
        let post = snapshot.val(), key = snapshot.key;
        post.key = key;
        post.comments = [];

        commentsRef.orderByChild('post').equalTo(key).limitToLast(100).on('child_added', commentSnapshot => {
          let comment = commentSnapshot.val();
          usersRef.child(comment.author).once('value')
            .then( commentAuthor => {
              comment.author = commentAuthor.val();
            })
            .then( () => {
              usersRef.child(comment.to).once('value', commentTo => {
                comment.to = commentTo.val();
                post.comments.push(comment);
              })
            })
        })

        usersRef.child(post.user).once('value')
          .then(user => {
            post.user = user.val();
            post.user.key = user.key;
            // this.$set( this.posts, key, post )
            this.dataReady = true;
            this.posts.push(post);
          })
            
      },
      comment(post, event) {
        if ( event.target.value ) {
          let timestamp = Firebase.database.ServerValue.TIMESTAMP,
              comment = { 
                post: post.key, 
                to: post.user.key, 
                created: timestamp,
                message: event.target.value,
                author: this.auth.uid
              }
          commentsRef.push(comment, () => event.target.value = '');
        }
      },
      publish() {
        if (this.newPost.message) {
          this.newPost.timestamp = Firebase.database.ServerValue.TIMESTAMP;
          postsRef.push(this.newPost, () => this.newPost.message = '' );
        }
      }
    }
  }
</script>