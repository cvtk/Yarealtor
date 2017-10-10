<template>
  <div :class="$style.main">
    <div :class="$style.main__bar">
      <ul :class="$style.bar__breadcrumbs">
        <li :class="$style.breadcrumbs__item">Главная</li>
      </ul>
    </div>
    <div :class="$style.main__toolbar">
      <h1 :class="$style.toolbar__title">Главная<span :class="$style._small">основные рубрики портала</span></h1>
    </div>
    
    <div :class="$style.main__main">
      <div :class="$style.main_wrapper">
        <div :class="$style.navigation_item_wrapper">
          <router-link tag="div" :to="{ name: 'polls' }" :class="[ $style.main__navigation_item, $style._polls ]">
            <div :class="$style.header_wrapper">
              <div :class="$style.navigation_item__header">
                <h3 :class="$style.header__title">Соц. опросы</h3>
                <h4 :class="$style.header__subtitle">Итоги, аналитика</h4>
              </div>
              <div :class="$style.navigation_item__icon"></div>
            </div>
            <div :class="$style.navigation_item__delimiter"></div>
            <h5 :class="$style.navigation_item__recent_title">Недавние опросы:</h5>
            <div :class="$style.navigation_item__recent_items">
              <router-link
                v-for="poll in polls"
                :key="poll.key"
                :to="'/polls/#' + poll.key"
                :class="$style.recent_items__article"
                >{{ poll.created | unixToDate }}: {{ poll.question }}
              </router-link>
            </div>
          </router-link>
        </div>
        <div :class="$style.navigation_item_wrapper">
          <router-link tag="div" :to="{ name: 'news' }" :class="[ $style.main__navigation_item, $style._news ]">
            <div :class="$style.header_wrapper">
              <div :class="$style.navigation_item__header">
                <h3 :class="$style.header__title">Новости</h3>
                <h4 :class="$style.header__subtitle">Лента событий</h4>
              </div>
              <div :class="$style.navigation_item__icon"></div>
            </div>
            <div :class="$style.navigation_item__delimiter"></div>
            <h5 :class="$style.navigation_item__recent_title">Недавние новости:</h5>
            <div :class="$style.navigation_item__recent_items">
              <router-link
                v-for="post in posts"
                :key="post.key"
                :to="'/news/#' + post.key"
                :class="$style.recent_items__article"
                >{{ post.created | unixToDate }}: {{ post.message }} {{ typeof post.images !== 'undefined' && 'Картинка' || '' }}
              </router-link>
            </div>
          </router-link>
        </div>
        <div :class="$style.navigation_item_wrapper">
          <router-link tag="div" :to="{ name: 'offers' }" :class="[ $style.main__navigation_item, $style._offers ]">
            <div :class="$style.header_wrapper">
              <div :class="$style.navigation_item__header">
                <h3 :class="$style.header__title">Предложения</h3>
                <h4 :class="$style.header__subtitle">Актуальные объекты</h4>
              </div>
              <div :class="$style.navigation_item__icon"></div>
            </div>
            <div :class="$style.navigation_item__delimiter"></div>
            <h5 :class="$style.navigation_item__recent_title">Недавние предложения:</h5>
            <div :class="$style.navigation_item__recent_items">
              <router-link
                v-for="offer in offers"
                :key="offer.key"
                :to="{ name: 'offer', params: { id: offer.key} }"
                :class="$style.recent_items__article"
                >{{ offer.created | unixToDate }}: {{ offer.localityType }}. {{ offer.locality }}, {{ title(offer) }}
              </router-link>
            </div>
          </router-link>
        </div>
        <div :class="$style.navigation_item_wrapper">
          <router-link tag="div" :to="{ name: 'root' }" :class="[ $style.main__navigation_item, $style._messages ]">
            <div :class="$style.header_wrapper">
              <div :class="$style.navigation_item__header">
                <h3 :class="$style.header__title">Форум и чат</h3>
                <h4 :class="$style.header__subtitle">Оставайтесь на связи</h4>
              </div>
              <div :class="$style.navigation_item__icon"></div>
            </div>
            <div :class="$style.navigation_item__delimiter"></div>
            <h5 :class="$style.navigation_item__recent_title">Недавние сообщения:</h5>
            <div :class="$style.navigation_item__recent_items">
              <router-link :to="{ name: 'root' }" :class="$style.recent_items__article">Сегодня, в 12:35: Как вы считаете, стоит ли это делать?</router-link>
              <router-link :to="{ name: 'root' }" :class="$style.recent_items__article">Вчера, в 16:12: Может стоит делать иначе?</router-link>
              <router-link :to="{ name: 'root' }" :class="$style.recent_items__article">Вчера, в 11:10: Давайте делать как делали, а?</router-link>
            </div>
          </router-link>
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
      @media (max-width: $bp-medium) {
        
      }
    }

  /* main__main */
    .main__main {
      position: relative;
    }

  /* main_wrapper */
    .main_wrapper {
      position: relative;
      margin-left: 40px;
      margin-right: 340px;
      &:after { @include clearfix }
    }
  
  .navigation_item_wrapper {
    position: relative;
    overflow: hidden;
    width: 50%;
    padding-bottom: 25%;
    margin-bottom: 20px;
    min-height: 240px;
    float: left;

    .main__navigation_item {
      position: absolute;
      background-color: #fff;
      top: 0;
      bottom: 0;
      left: 10px;
      right: 10px;
      cursor: pointer;
      padding: 15px 15px 30px;
      &._polls {
        background-color: lighten(#2ab4c0, 50%);

        .navigation_item__icon {
          color: #2ab4c0;
          &:before { content: "\E077" }
        }
        .header__title { color: #2ab4c0 }
        .navigation_item__delimiter { background-color: #2ab4c0 }
        .recent_items__article { color: #2ab4c0 }
      }
      &._news {
        background-color: lighten(#f36a5a, 34%);

        .navigation_item__icon {
          color: #f36a5a;
          &:before { content: "\E01C" }
        }
        .header__title { color: #f36a5a }
        .navigation_item__delimiter { background-color: #f36a5a }
        .recent_items__article { color: #f36a5a }
      }
      &._offers {
        background-color: lighten(#5C9BD1, 40%);

        .navigation_item__icon {
          color: #5C9BD1;
          &:before { content: "\E043" }
        }
        .header__title { color: #5C9BD1 }
        .navigation_item__delimiter { background-color: #5C9BD1 }
        .recent_items__article { color: #5C9BD1 }
      }
      &._messages {
        background-color: lighten(#8877a9, 37%);

        .navigation_item__icon {
          color: #8877a9;
          &:before { content: "\e04a" }
        }
        .header__title { color: #8877a9 }
        .navigation_item__delimiter { background-color: #8877a9 }
        .recent_items__article { color: #8877a9 }
      }
      &:hover {
        .header__title { padding-left: 10px }
        .header__subtitle { padding-left: 10px }
        .navigation_item__icon { transform:scale(1.15) }
      }
    }
    .header_wrapper:after { @include clearfix }

    .navigation_item__header {
      float: left;
    }
    .navigation_item__icon {
      float: right;
      
      font-size: 36px;
      line-height: 63px;
      height: 63px;
      transition: transform .5s ease-in-out;
      &:before { font-family: "Icons" }
    }
    .header__title {
      margin: 0 0 2px;
      padding: 0;
      font-size: 30px;
      font-weight: 100;
      transition: padding-left .5s ease-in-out;
    }
    .header__subtitle {
      font-size: 14px;
      color: #AAB5BC;
      font-weight: 500;
      letter-spacing: .25px;
      text-transform: uppercase;
      margin: 0;
      transition: padding-left .25s ease-in-out;
    }

    .navigation_item__delimiter {
      height: 3px;
      margin: 20px 0;
    }

    .navigation_item__recent_title {
      margin: 0;
      font-size: 11px;
      color: #AAB5BC;
      font-weight: 500;
      text-transform: uppercase;
    }
    .navigation_item__recent_items {
      margin: 5px 0;
    }
    .recent_items__article {
      display: block;
      font-size: 14px;
      font-weight: 300;
      text-decoration: none;
      padding: 5px 0;
      word-wrap: break-word;
      &:hover { text-decoration: underline }
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
      @media (max-width: $bp-extra-large) {
        .main_wrapper { margin-left: -10px; margin-right: 290px }
      }
      @media (max-width: $bp-medium) {
        .navigation_item_wrapper { width: 100%; min-height: 280px; }
        .main__content { margin-right: 0 }
      }
      @media (max-width: $bp-small) {
        .navigation_item_wrapper { min-height: 360px; }
        .main_wrapper { margin-left: -10px; margin-right: -10px }
        .main__ad { display: none }
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
  import _h from './helpers/filters.js';

  const postsRef = firebase.database().ref('posts');
  const pollsRef = firebase.database().ref('polls');
  const offersRef = firebase.database().ref('offers');

  export default {
    name: 'main',
    props: ['auth'],
    components: { AppLoader, AppAdSidebar, AppInput, AppUploadImages, TimelinePost, TimelineNewPost  },
    filters: _h,
    data() {
      return {
        filter: 'all',
        dataReady: false,
        posts: {}, offers: {}, polls: {}
      }
    },
    methods: {
      sortByCreated(obj) {
        return Object.keys(obj).map( e => obj[e] ).sort((x, y) => y.created - x.created);
      },
      title(offer) {
        switch( offer.object ) {
          case 1: return `${offer.rooms}-к квартира, ${offer.area_full} м², ${offer.floor}/${offer.floors} эт.`;
          case 2: return `Комната, ${offer.area_full} м², ${offer.floor}/${offer.floors} эт.`;
          case 3: return `Коммерческая, ${offer.area_full} м²`;
          case 4: return `Дом или дача, ${offer.area_full} м², ${offer.floors} этажа`;
          case 5: return `Гараж, ${offer.area_full} м²`;
          case 6: return `Участок ${offer.cottage_area} сот.`;
        }
      }
    },
    created() {
      offersRef.limitToLast(3).on('value', offers => {
        if ( !offers.exists() ) { this.offers = [] }
        else {
          let tmp = offers.val();
          this.offers = this.sortByCreated(tmp);
          this.dataReady = true;
        }
      })
      postsRef.orderByChild('access').equalTo(10).limitToLast(3).on('value', posts => {
        if ( !posts.exists() ) { this.posts = [] }
        else {
          let tmp = posts.val();
          this.posts = this.sortByCreated(tmp);
          this.dataReady = true;
        }
      })
      pollsRef.orderByChild('access').equalTo(10).limitToLast(3).on('value', polls => {
        if ( !polls.exists() ) { this.polls = [] }
        else {
          let tmp = polls.val();
          this.polls = this.sortByCreated(tmp);
          this.dataReady = true;
        }
      })
      
    },
    computed: {
      postsByTimestamp: function() {
        let arr = Object.keys(this.posts).map(key => this.posts[key] );
        return arr.sort((x, y) => y.created - x.created);
      }
    }
  }
</script>