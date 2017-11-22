<template>
  <div :class="$style.profile" v-if="dataReady">

    <div :class="$style.profile__bar">
      <breadcrumbs :items="[
        { text: 'Главная', to: 'root'},
        { text: profile.company.name, to: 'company', params: { page: profile.company.page } },
        { text: [profile.name, profile.surname].join(' '), to: ''}
      ]"/> 
    </div>

    <div :class="$style.profile__toolbar">
      <toolbar :title="[profile.name, profile.surname].join(' ')" sub="личная страница"></toolbar>
    </div>

    <div :class="$style.profile__content">
      <div :class="$style.content">
        <div :class="$style.content__sidebar">
          <aside :class="$style.sidebar">
            <div :class="$style.sidebar__img">
              <div :class="$style.img" :style="{ 'background-image': 'url(' + profile.photo + ')' }"></div>
            </div>
            <div :class="$style.sidebar__user_title">
              <div :class="$style.user_title__name">{{ profile.name }} {{ profile.surname }}</div>
              <router-link :to="{ name: 'company', params: { page: profile.company.page } }" :class="$style.user_title__company">
                {{ profile.company.name }}
              </router-link>
            </div>
            <ul :class="$style.sidebar__user_menu">
              <li :class="[ $style.user_menu__item, currentTab === 'profile' && $style._active ]" @click="currentTab = 'profile'">Информация</li>
              <li :class="[$style.user_menu__item, $style._settings, currentTab === 'settings' && $style._active]" v-if="isAdmin || isUser" @click="currentTab = 'settings'">Настройки</li>
            </ul>
          </aside>
        </div>
        <div :class="$style.content__main">
          <div :class="$style.main" v-if="currentTab === 'profile'">
            <div :class="$style.main__overview" @keyup.enter="saveUser">
              <profile-overview :profile="local" />
            </div>
            <div :class="$style.main__post" v-if="isUser">
              <timeline-new-post :auth="auth" :user="user" />
            </div>
            <div :class="$style.main__timeline">
              <timeline-post v-for="post in postsByTimestamp" 
                :key="post.key" 
                :post="post" 
                :auth="auth"
                :user="user"
              />
            </div>
          </div>
          <div :class="$style.main" v-if="currentTab === 'settings'">
            <div :class="$style.main__settings">
              <profile-settings :profile="local" :user="user" />
              <div :class="$style.settings__save">
                <default-button label="Сохранить" @click="saveUser" />
              </div>
            </div>
          </div>
        </div>
        <app-ad-sidebar :class="$style.offers__ad"></app-ad-sidebar>
      </div>
    </div>
  </div>
  <app-loader v-else></app-loader>
</template>

<style lang="scss" module>

  @import "../assets/style.scss";

  .profile {
    position: relative;
    padding: 20px; 
  }

  .profile__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
  }

  .profile__toolbar { margin: 25px 0 }

  .profile__content { position: relative }

  .content { position: relative }

  .content__sidebar { position: relative }

  .content__main {
    margin-left: 300px;
    margin-right: 300px;
    overflow: hidden;
    &:after { @include clearfix }
  }

  .main { position: relative }

  .main__overview {
    position: relative;
    padding: 10px 20px 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .main__post { position: relative }

  .main__timeline {
    position: relative;
    padding: 0 20px;
    background-color: #fff;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .main__settings {
    position: relative;
    padding: 10px 20px 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    background-color: #fff;
    margin-right: 20px;
    padding: 30px 0 0;
    .sidebar__img {
      position: relative;
      margin: 0 auth;
      text-align: center;
    }
    .img {
      display: inline-block;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 4px solid #f5f6fa;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    > .sidebar__user_title {
      text-align: center;
      margin-top: 20px;
      > .user_title__name {
        color: #5a7391;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 7px;
      }
      > .user_title__company {
        text-transform: uppercase;
        text-decoration: none;
        color: #5b9bd1;
        font-weight: 600;
        margin-bottom: 7px;
        transition: color .2s ease-in-out;
        &:hover { color: darken(#5b9bd1, 20%); text-decoration: underline; }
      }
    }
    > .sidebar__user_menu {
      margin: 30px 0 0;
      padding: 0 0 20px;
      list-style: none;
      > .user_menu__item {
        border-bottom: 1px solid #f0f4f7;
        display: block;
        color: #93a3b5;
        font-size: 16px;
        font-weight: 400;
        padding: 10px 15px;
        cursor: pointer;
        transition: background-color .2s ease-in-out, color .2s ease-in-out;
        &._active {
          color: #5b9bd1;
          background-color: #f6f9fb;
          border-left: 2px solid #5b9bd1;
          margin-left: -2px;
        }
        &:hover {
          background-color: #f6f9fb;
          color: #5b9bd1;
        }
        &._settings:before { content: "\e09a" }
        &:before {
          content: "\e069";
          font-family: "Icons";
          margin-right: 8px;
          font-size: 16px;
        }
      }
    }
  }

  .profile__ad {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 500px;
    background-color: #fff;
    margin-left: 20px;
    padding: 12px 20px 15px;
    > .ad__title {
      color: #578ebe;
      padding: 12px 0;
      display: inline-block;
      font-size: 15px;
      line-height: 18px;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: .25px;
    }
    > .ad__content {}
  }

  .settings__save {
    position: relative;
    padding-top: 10px;
    text-align: right;
  }
  
  .profile {
    @media (max-width: $bp-medium) {
      .offers__ad { display: none }
      .content__main { margin-right: 0 }
    }
    @media (max-width: $bp-small) {
      .content__main { margin-left: 0 }
      .sidebar { position: relative; width: 100%}
      .toolbar__actions, .toolbar__title { float: none; width: 100% }
      ._small { display: none }

    }
    @media (max-width: $bp-extra-small) {
      .new__text { display: none }
      .new__icon:before { margin-right:0 }
    }
  }
    
</style>

<script>
  import firebase from '../firebase.js';
  import Firebase from 'firebase';
  import AppInput from './modules/inputs.vue';
  import AppUploadImage from './modules/upload-images.vue';
  import TimelinePost from './timeline/timeline-post.vue';
  import TimelineNewPost from './timeline/timeline-new-post.vue';
  import DefaultText from './default-inputs/default-text.vue';
  import DefaultNumber from './default-inputs/default-number.vue';
  import DefaultButton from './default-inputs/default-button.vue';
  import ProfileSettings from './profile/profile-settings.vue';
  import ProfileOverview from './profile/profile-overview.vue';

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');
  const commentsRef = firebase.database().ref('comments');
  const postsRef = firebase.database().ref('posts');

  export default {
    name: 'profile',
    props: ['auth', 'user'],
    components: { AppUploadImage, TimelinePost, TimelineNewPost, DefaultText, DefaultNumber, DefaultButton, ProfileSettings, ProfileOverview },
    data() {
      return { dataReady: false, currentTab: 'profile', profile: {}, local: {}, posts: {} }
    },
    destroyed() {
      // \\
    },
    created() {
      usersRef.orderByChild('page').equalTo(this.$route.params.page).once('value', (data) => {
        if ( data.exists() ) {
          data.forEach( (profile) => {
            this.profile = profile.val();
            this.local = profile.val();
            companiesRef.child(this.profile.company).once('value', company => {
              this.$set(this.profile, 'company', company.val());
            })
            postsRef.orderByChild('author').equalTo(this.profile.key).on('value', posts => {
              posts.forEach( post => {
                this.$set( this.posts, post.key, post.val() );
              });
              this.dataReady = true;
            })
          });
        }
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.page } });
        }
      });
      postsRef.on('child_removed', post => this.$delete(this.posts, post.key));
    },
    computed: {
      postsByTimestamp: function() {
        let arr = Object.keys(this.posts).map(key => this.posts[key] );
        return arr.sort((x, y) => y.created - x.created);
      },
      isAdmin() { return ( this.user.role <= 5 && this.user.company.key === this.profile.company.key ) || this.user.role === 1 },
      isUser() { return this.user.key === this.profile.key }
    },
    methods: {
      saveUser() {
        usersRef.child(this.profile.key).update(this.local)
          .then( ()=> {
            this.$router.push({ name: 'user', params: { page: this.local.page } });
            this.currentTab = 'profile'; 
          })
      },
      updProfileField(el) {
        usersRef.child(this.profile['.key']).update({[el.name]: el.value}, () => {
          el.value = '';
          el.blur();
        });
      }
    }
  }
</script>