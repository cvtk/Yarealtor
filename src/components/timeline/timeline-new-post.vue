<template>
  <div :class="$style.new_post">
    <div :class="$style.new_post__userpic">
      <div :style="{ 'background-image': 'url(' + user.photo + ')' }"
        :class="$style.userpic__image">
      </div>
    </div>
    <div :class="$style.new_post__message">
      <textarea rows="1" :class="$style.message__input" placeholder="Сообщение..." v-model="local.message"
        @keyup="fieldAutoResize" @keydown.enter.prevent="publishPost" @keydown.ctrl.enter.prevent="newLinePostField">
      </textarea>
    </div>
    <div :class="$style.new_post__images" v-if="!!local.images.length">
      <div :class="$style.images_wrapper" v-for="(image, index) in local.images" @click="removeImage(index)">
        <div :class="$style.images__item" :style="{ 'background-image': 'url(' + image.small + ')' }"></div>
      </div>
    </div>
    <div :class="$style.new_post__actions">
      <div :class="$style.actions__send">
        <ui-button :loading="saving" @click="publishPost">
            Отправить
          </ui-button>
      </div>  
      <div :class="$style.actions__access">
        <default-select :options="access" v-model="local.access" />
      </div>
      <div :class="$style.actions__add_images">
        <upload-images type="hidden" :class="$style.add_images" @input="onImageLoad" title="Добавить фотографии" :multiple="true"></upload-images>
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
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 4px solid #f5f6fa;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
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
      margin-left: 60px;
      &:after { @include clearfix }
    }

    .actions__access {
      display: inline-block;
      float: right;
      margin-right: 20px;
    }

    .actions__add_images {
      float: left;
      padding: 20px 0 0;
    }

    .add_images {
      display: inline-block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
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
      padding: 20px 0 0;
      float: right;
    }
    @media (max-width: $bp-small) {
      .new_post__actions { margin-left: 0 }
      .actions__access { margin-right: 0; text-align: right; }
    }
  }
</style>

<script>
/// после сохранения компонент не обновляет информацию об уровне доступа
  import Firebase from 'firebase';
  import firebase from '../../firebase.js';
  import DefaultSelect from '../default-inputs/default-select.vue';
  import DefaultButton from '../default-inputs/default-button.vue';
  import UploadImages from '../modules/upload-images.vue'
  import AppInput from '../modules/inputs.vue';

  const postsRef = firebase.database().ref('posts');

  function init() {
    return {
      author: '',
      company: '',
      access: 10,
      key: '',
      message: '',
      created: null,
      images: []
    }
  }

  export default {
    name: 'timeline-new-post',
    props: ['auth', 'user', 'post'],
    components: { AppInput,  DefaultSelect, DefaultButton, UploadImages },
    data() {
      return {
        access: [
          { value: 10, name: 'Доступен всем' },
          { value: 5, name: 'Для моей компании' }
        ],
        local: {}, saving: false
      }
    },
    computed: {
      isValid: function () {
        return !!this.local.message.trim() || !!this.local.images.length;
      },
      isModer() { return this.user.role === 5 },
      isAdmin() { return this.user.role === 1 },
    },
    created() {
      this.local = init();
      if ( this.isModer || this.isAdmin ) {
        this.access.push({ value: 1, name: 'Только модераторам' });
      }
    },
    methods: {
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
        if ( !this.isValid ) return;
        this.saving = true;
        this.local.author = this.user.key;
        this.local.company = this.user.company.key;
        this.local.created = Firebase.database.ServerValue.TIMESTAMP;
        this.local.key = this.local.key || postsRef.push().key;

        postsRef.child(this.local.key).update(this.local)
          .then( () => {
            this.$parent.$parent.$refs.notify.createSnackbar({
              message: 'Публикация добавлена',
            });
            this.saving = false;
            this.local = init();
            this.notify = false;
          })
          .catch( error => {
            this.$parent.$parent.$refs.notify.createSnackbar({
              message: 'Ошибка сети: ' + error.message,
            });
            this.saving = false;
          });
      },
      onImageLoad(image) {
        this.local.images.push(image);
      }
    }
  }
</script>