<template>
  <div :class="$style.news">
    <div :class="$style.news__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Новости</li>
      </ul>
    </div>
    <div :class="$style.news__toolbar">
      <h1 :class="$style.toolbar__title">Новости<span :class="$style._small">лента событий</span></h1>
      <div :class="$style.toolbar__actions">
        <div :class="[$style.actions__buttons, filter === 'all' && $style._active]" @click="filter='all'">Все</div>
        <div :class="$style.actions__buttons">Руководители</div>
        <div :class="[$style.actions__buttons, filter === 'company' && $style._active]" @click="filter='company'">Моя компания</div>
        <div :class="[$style.actions__buttons, filter === 'personal' && $style._active]" @click="filter='personal'">Мои посты</div>
      </div>
    </div>
    
    <div :class="$style.news__main">
      <div :class="$style.main_wrapper">
        <div :class="$style.main__post">
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
        <div :class="$style.main__timeline" v-if="dataReady">
          <div :class="$style.timeline__item" v-for="post in postsByTimestamp" :key="post.key">
            <transition name="fade">
            <div :class="$style.timeline_wrapper">
                <div :class="[$style.dropdown_wrapper, $style.__hidden]" :data-menu-key="post.key" @mouseleave="hideMenu(post.key)">
                  <ul :class="$style.menu__dropdown">
                    <li :class="$style.dropdown__item" v-if="post.author.key === auth.uid" @click="removePost(post.key); hideMenu(post.key)">
                      <span :class="$style.item__title">Удалить</span>
                    </li>
                    <li :class="$style.dropdown__item" @click="typeComment(post); hideMenu(post.key)">
                      <span :class="$style.item__title">Комментировать</span>
                    </li>
                    <li :class="$style.dropdown__item">
                      <span :class="$style.item__title">Пожаловаться</span>
                    </li>
                  </ul>
                </div>
              <div :class="$style.item__userpic">
                <img :src="post.author.photo" :class="$style.userpic__image">
              </div>
              <div :class="$style.timeline__body">
                <div :class="$style.body__header">
                  <div :class="$style.header__meta">
                    <router-link :to="{ name: 'user', params: { page: post.author.page } }" :class="$style.meta__author">{{ post.author.name }}</router-link>
                    <span :class="$style.meta__date">{{ post.created | unixToDate }}</span>
                  </div>
                  <div :class="$style.header__menu" @click="toggleMenu(post.key)">
                    <span :class="$style.menu__icon"></span>
                  </div>
                </div>
                <div :class="$style.body__content"> {{ post.message }} </div>
              </div>
              <div :class="$style.item__comments">
                <div :class="$style.comments__roll_down" v-if="objectToArray(post.comments).length != 0" @click="rollDown = !rollDown">Показать все комментарии ({{ objectToArray(post.comments).length }})</div>
                  <app-comment
                    :comment="comment" 
                    :key="comment.key"
                    v-show="isLast(index, objectToArray(post.comments)) || rollDown"
                    v-for="(comment, index) in objectToArray(post.comments)">    
                  </app-comment>
                <div :class="$style.comments__publish">
                  <textarea rows="1" :class="$style.publish__input" placeholder="Ваш комментарий" :data-answer-key="post.key"
                    @keyup="autoGrow($event.target)"
                    @keydown.ctrl.enter="publishComment(post.key)">
                  </textarea>
                  <div :class="$style.publish__button" @click="publishComment(post.key)"></div>
                </div>
              </div>
            </div>
            </transition>
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
    background-color: #fff;
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
      position: relative;
      margin-top: 20px;
      &:last-child { margin-bottom: 20px }
      &:after { @include clearfix }

      .dropdown_wrapper {
        opacity: 1;
        visibility: visible;
        position: absolute;
        padding: 30px;
        right: -10px;
        top: 15px;
        z-index: 1;
        transition: visibility .2s ease-in-out, opacity .2s ease-in-out, top .2s ease-in-out;
        &.__hidden { visibility: hidden; opacity: 0; top: 55px; }
      }
      .menu__dropdown {
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

  .item__comments {
    position: relative;
    margin-left: 110px;
    background-color: #fff;
    padding: 0 20px;
    border: 1px solid lighten(#b4bcc8, 15%);
    border-top: none;

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
    .news__toolbar {
      margin: 25px 0;
      &:after { @include clearfix }
    }

    .toolbar__title {
      float: left;
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small { font-size: 14px; letter-spacing: 0; text-transform: lowercase; margin-left: 5px; }
    }
    .toolbar__actions {
      float: right;
    }

    .actions__buttons {
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      border: 1px solid #32c5d2;
      white-space: nowrap;
      padding: 6px 12px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 4px 10px;
      font-size: 13px;
      color: #fff;
      background-color: #32c5d2;
      border-radius: 25px;
      transition: color .2s ease-in-out, background-color .2s ease-in-out;
      &:hover, &._active {
        color: #32c5d2;
        background-color: #fff;
      }
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
  import AppComment from './modules/comment.vue';
  import AppInput from './modules/inputs.vue';
  import AppFilters from './helpers/filters.js';
  import AppUploadImages from './modules/upload-images.vue';
  import Firebase from 'firebase';
  import firebase from '../firebase.js';

  const postsRef = firebase.database().ref('posts');
  const usersRef = firebase.database().ref('users');
  const commentsRef = firebase.database().ref('comments');

  export default {
    name: 'news',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, AppComment, AppUploadImages },
    filters: AppFilters,
    data() {
      return {
        includePoll: false,
        filter: 'all',
        rollDown: false,
        dataReady: false,
        newPost: {
          message: '',
          author: this.auth.uid,
          comments: {},
          includes: { poll: ['Первый вариант ответа'], images: [] }
        },
        posts: {}
      }
    },
    mounted() {
      postsRef.on('value', posts => {
        posts.forEach(post => this.onPostAdded(post));
        this.dataReady = true;
      })
      // postsRef.on('child_added', snapshot => this.onPostAdded(snapshot));
      // postsRef.on('child_changed', snapshot => this.onPostAdded(snapshot));
      postsRef.on('child_removed', post => this.$delete(this.posts, post.key));
      
    },
    computed: {
      postsByTimestamp: function() {
        let arr = Object.keys(this.posts).map(key => this.posts[key] );
        return arr.sort((x, y) => y.created - x.created);
      }
    },
    methods: {
      typeComment(post) {
        let textarea = this.$el.querySelector('[data-answer-key=' + post.key + ']');
        textarea.value = post.author.name + ', ';
        textarea.focus();
      },
      objectToArray(object) {
        let arr = Object.keys(object).map(key => object[key] );
        return arr;
      },

      onPostAdded(snapshot) {
        let key = snapshot.key;

        this.$set( this.posts, key, snapshot.val() )

        usersRef.child(this.posts[key].author).on('value', user => {
          this.$set( this.posts[key], 'author', user.val() )
        })

        commentsRef.orderByChild('post').equalTo(key).on('value', comments => {
          let tmpComments = {};
          if ( comments.exists() ) {
            tmpComments = comments.val();
            comments.forEach(comment => {
              usersRef.child(comment.child('author').val()).once('value', author => tmpComments[comment.key].author = author.val());
              usersRef.child(comment.child('to').val()).once('value', to => tmpComments[comment.key].to = to.val());
            })
          }
          
          this.$set( this.posts[key], 'comments', tmpComments );
        })
            
      },
      hideMenu(key) {
        let menu = this.$el.querySelector('[data-menu-key=' + key + ']');
        menu.classList.add(this.$style['__hidden']);
      },
      toggleMenu(key) {
        let menu = this.$el.querySelector('[data-menu-key=' + key + ']');
        menu.classList.toggle(this.$style['__hidden']);
      },
      removePost(key) {
        postsRef.child(key).remove();
      },
      isLast(index, comments) {
        return comments.length === index + 1;
      },
      autoGrow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
      },
      publishComment(key) {
        let textarea = this.$el.querySelector('[data-answer-key=' + key + ']');
        if ( textarea.value ) {
          let timestamp = Firebase.database.ServerValue.TIMESTAMP,
              comment = { 
                post: key, 
                to: this.posts[key].author.key, 
                created: timestamp,
                message: textarea.value,
                author: this.auth.uid,
                key: commentsRef.push().key
              }
          commentsRef.child(comment.key).update(comment, () => textarea.value = '');
        }
      },
      publish() {
        if (this.newPost.message) {
          this.newPost.created = Firebase.database.ServerValue.TIMESTAMP;
          this.newPost.key = postsRef.push().key;
          if (!this.includePoll) {
            this.newPost.includes.poll = [];
          }
          postsRef.child(this.newPost.key).update(this.newPost, () => {
            this.newPost = {
              message: '',
              author: this.auth.uid,
              comments: {},
              includes: { poll: ['Первый вариант ответа'], images: [] }
            }
            this.includePoll = false;
          });
        }
      }
    }
  }
</script>