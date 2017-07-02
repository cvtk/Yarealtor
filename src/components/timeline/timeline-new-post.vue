<template>
  <div :class="$style.new_post" v-if="dataReady">
    <div :class="$style.new_post__userpic">
      <img :src="user.photo" :alt="user.name" :class="$style.userpic__image">
    </div>
    <div :class="$style.new_post__message">
      <textarea rows="1" :class="$style.message__input" placeholder="Сообщение..." v-model="post.message"
        @keyup="fieldAutoResize" @keydown.enter.prevent="publishPost" @keydown.ctrl.enter.prevent="newLinePostField">
      </textarea>
    </div>
    <div :class="$style.new_post__images" v-if="isImagesIncluded">
      <div :class="$style.images_wrapper" v-for="(image, key) in post.inc.images" @click="removeImage(key)">
        <div :class="$style.images__item" :style="{ 'background-image': 'url(' + image.url + ')' }"></div>
      </div>
    </div>
    <div :class="$style.new_post__poll" v-if="isPollIncluded">
      <div :class="$style.poll_wrapper" v-for="(answer, index) in post.inc.poll">
        <app-input @keydown.enter.native="post.inc.poll.push('Следующий вариант ответа')" v-model="post.inc.poll[index]" placeholder="answer"></app-input>
      </div>
    </div>
    <div :class="$style.new_post__actions">
      <app-input :class="$style.actions__send" type="button" @click="publishPost">Отправить</app-input>
      <div :class="[$style.actions__add_poll, isPollIncluded && $style._active]" title="Добавить опрос" @click="isPollIncluded = !isPollIncluded"></div>
      <upload-images type="hidden" :class="$style.actions__add_images" v-model="post.inc.images" title="Добавить фотографии" :multiple="true"></upload-images>
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
    min-width: 280px;
    overflow: hidden;
    &:after { @include clearfix }

    .new_post__userpic {
      position: relative;
      float: left;
      width: 40px;
      height: 40px;
    }

    .userpic__image {
      width: 100%;
      height: 100%;
      border: 4px solid #f5f6fa;
      border-radius: 50%;
    }

    .new_post__message {
      position: relative;
      margin-left: 60px;
    }

    .message__input {
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

    .new_post__images {
      position: relative;
      overflow: hidden;
      margin: 0 -1px;
      padding-top: 15px;
      margin-left: 59px;
      &:after { @include clearfix }
    }

    .images_wrapper {
      float: right;
      width: 60px;
      height: 60px;
      padding: 1px;
    }
    .images__item {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .new_post__poll {
      position: relative;
      padding-top: 15px;
      margin-left: 60px;
    }
    .new_post__actions {
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
  import AppInput from '../modules/inputs.vue';
  import UploadImages from '../modules/upload-images.vue';

  const usersRef = firebase.database().ref('users');
  const postsRef = firebase.database().ref('posts');

  export default {
    name: 'timeline-new-post',
    props: ['auth'],
    components: { AppInput, UploadImages },
    methods: {
      removeImage(key) {
        this.$delete(this.post.inc.images, key);
      },
      fieldAutoResize(event) {
        let field = event.target;
        field.style.height = "5px";
        field.style.height = (field.scrollHeight)+"px";
      },
      newLinePostField(event) {
        let field = event.target,
            value = field.value;
        field.value = value + '\n';
      },
      publishPost() {
        if ( this.post.message || this.post.images ) {
          this.post.created = Firebase.database.ServerValue.TIMESTAMP;
          this.post.key = postsRef.push().key;
          postsRef.child(this.post.key).update(this.post);
          this.post = { inc: { poll: ['Первый вариант ответа'], images: [] }, message: '', author: this.auth.uid }
        }
      }
    },
    data() {
      return {
        dataReady: false,
        isPollIncluded: false,
        user: {},
        post: { inc: { poll: ['Первый вариант ответа'], images: [] }, message: '', author: this.auth.uid }
      }
    },
    mounted() {
      usersRef.child(this.auth.uid).on('value', user => {
        this.user = user.val();
        this.dataReady = true;
      });
    },
    computed: {
      isImagesIncluded() {
        let includes = this.post.inc,
            imagesExists = typeof includes != 'undefined' && typeof includes.images != 'undefined';
        if ( imagesExists ) {
          let length = 0;
          for ( let key in includes.images ) {
            if ( includes.images.hasOwnProperty(key) ) {
                ++length;
            }
          }
          return length > 0;
        }
        else return false;
      }
    }
  }
</script>