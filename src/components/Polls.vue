<template>
  <div :class="$style.polls" v-if="dataReady">
    <div :class="$style.polls__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Соц. опросы</li>
      </ul>
    </div>
    <div :class="$style.polls__toolbar">
      <h1 :class="$style.toolbar__title">Соц. опросы<span :class="$style._small">нам важно Ваше мнение</span></h1>
      <div :class="$style.toolbar__actions">
        <div :class="[$style.actions__buttons, filter === 'all' && $style._active]" @click="filter='all'">Все</div>
        <div :class="$style.actions__buttons">Руководители</div>
        <div :class="$style.actions__buttons">Моя компания</div>
      </div>
    </div>
    
    <div :class="$style.polls__main">
      <div :class="$style.main_wrapper">
        <polls-new :auth="auth" :user="user" />
        <div :class="$style.main__timeline" v-if="dataReady">
          <polls-timeline :poll="poll" :user="user" v-for="poll in pollsyTimestamp" :key="poll.key" />
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
  /* polls */
    .polls {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* polls__main */
    .polls__main {
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

  /* polls__bar */
    .polls__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* polls__toolbar */
    .polls__toolbar {
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
    .polls {
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
  import TimelinePost from './timeline/timeline-post.vue';
  import TimelineNewPost from './timeline/timeline-new-post.vue';
  import AppInput from './modules/inputs.vue';
  import AppUploadImages from './modules/upload-images.vue';
  import PollsNew from './polls/polls-new.vue';
  import PollsTimeline from './polls/polls-timeline.vue';
  import firebase from '../firebase.js';

  const pollsRef = firebase.database().ref('polls');

  export default {
    name: 'polls',
    props: ['auth', 'user'],
    components: { AppLoader, AppAdSidebar, AppInput, AppUploadImages, PollsNew, PollsTimeline  },
    data() {
      return {
        filter: 'all',
        dataReady: false,
        local: [],
        currentRef: null
      }
    },
    methods: {
      initRef() {
        this.dataReady = false;
        if ( this.currentRef ) currentRef.off('value', onValue);
        this.currentRef = pollsRef.on('value', this.onValue);
      },
      onValue(polls) {
        if ( polls.exists() ) {
          console.log(polls.exists())
          let tmp = polls.val();
          this.local = Object.keys(tmp).map( key => tmp[key] );
        } else this.local = [];
        this.dataReady = true;
      }
    },
    created() {
      this.initRef();
    },
    computed: {
      pollsyTimestamp: function() {
        return this.local.sort( (a, b) => b.created - a.created );
      }
    }
  }
</script>