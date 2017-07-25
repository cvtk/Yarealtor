<template>
  <div :class="$style.main">
    <div :class="$style.main__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Новости</li>
      </ul>
    </div>
    <div :class="$style.main__toolbar">
      <h1 :class="$style.toolbar__title">Главная<span :class="$style._small">основные рубрики портала</span></h1>
    </div>
    
    <div :class="$style.main__main">
      <div :class="$style.main_wrapper">
        <div :class="$style.navigation_item_wrapper">
          <div :class="$style.main__navigation_item">
            
          </div>
        </div>
        <div :class="$style.navigation_item_wrapper">
          <div :class="$style.main__navigation_item">
            
          </div>
        </div>
        <div :class="$style.navigation_item_wrapper">
          <div :class="$style.main__navigation_item">
            
          </div>
        </div>
        <div :class="$style.navigation_item_wrapper">
          <div :class="$style.main__navigation_item">
            
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
  /* main */
    .main {
      position: relative;
      height: 100%;
      padding: 20px;
    }

  /* main__main */
    .main__main {
      position: relative;
    }

  /* main_wrapper */
    .main_wrapper {
      position: relative;
      margin-left: -10px;
      margin-right: 290px;
      &:after { @include clearfix }
    }
  
  .navigation_item_wrapper {
    position: relative;
    overflow: hidden;
    width: 50%;
    padding-bottom: 25%;
    margin-bottom: 20px;
    float: left;

    .main__navigation_item {
      position: absolute;
      background-color: #fff;
      top: 0;
      bottom: 0;
      left: 10px;
      right: 10px;
      cursor: pointer;

    }
  }

  /* main__bar */
    .main__bar {
      border-bottom: 1px solid #e7ecf1;
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -20px -20px 0;
      &:after { @include clearfix }
    }

  /* main__toolbar */
    .main__toolbar {
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
    .main {
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
  import firebase from '../firebase.js';

  const postsRef = firebase.database().ref('posts');

  export default {
    name: 'main',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, AppUploadImages, TimelinePost, TimelineNewPost  },
    data() {
      return {
        filter: 'all',
        dataReady: false,
        posts: {}
      }
    },
    created() {
      postsRef.on('value', posts => {
        posts.forEach(post => {
          this.$set( this.posts, post.key, post.val() );
        });
        this.dataReady = true;
      });
      postsRef.on('child_removed', post => {
        this.$delete(this.posts, post.key);
      });
      
    },
    computed: {
      postsByTimestamp: function() {
        let arr = Object.keys(this.posts).map(key => this.posts[key] );
        return arr.sort((x, y) => y.created - x.created);
      }
    }
  }
</script>