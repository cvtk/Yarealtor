<template>
  <div :class="$style.new_post">
    <div :class="$style.new_post__userpic">
      <div :src="user.photo.small" 
        :style="{ 'background-image': 'url(' + user.photo.small + ')' }"
        :class="$style.userpic__image">
      </div>
    </div>
    <div :class="$style.items__add">
      <span :class="$style.add" title="Добавить вариант ответа" @click="addItem"></span>
    </div>
    <div :class="$style.new_post__message">
      <textarea rows="1" :class="$style.message__input" placeholder="Ваш вопрос..." v-model="local.question"
        @keyup="fieldAutoResize" @keydown.enter.prevent="newLinePostField">
      </textarea>
    </div>
    <div :class="$style.poll__items">
      <div :class="$style.items">
        <div :class="$style.items__inputs" v-for="(item, index) in local.items">
          <div :class="$style.items__remove">
            <span :class="$style.remove" title="Удалить вариант ответа" @click="removeItem(index)"></span>
          </div>
          <div :class="$style.inputs">
            <app-input @keydown.enter.native="addItem" v-model="local.items[index].text"
              :ref="index + '_input'" 
              :key="index"
              :placeholder="item.text">  
            </app-input>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.poll__notify" v-if="notify">
      <span :class="$style.notify" v-if="!validation.question">Заполните поле вопрос, минимум 25 символов.</span>
      <span :class="$style.notify" v-if="!validation.itemsCount"> Вариантов ответа должно быть больше одного.</span>
      <span :class="$style.notify" v-if="!validation.itemsFill"> Ответы не могут быть пустыми.</span>
    </div>
    <div :class="$style.poll__controls">
      <div :class="$style.controls">
        <div :class="$style.controls__access">
          <default-select :options="access" v-model="local.access" />
        </div>
        <div :class="$style.controls__submit">
          <ui-button :color="!isValid && 'red' || 'green'" :loading="saving" @click="publishPoll">
            Отправить
          </ui-button>
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

  .poll__items { position: relative }

  .items:after { @include clearfix }

  .items__add, .items__remove { float: right }

  .items__inputs { position: relative }
  
  .inputs { margin: 15px 40px 0 120px }

  .add, .remove {
    display: inline-block;
    width: 40px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    &:hover:after { color: #93a1bb }
    &:after {
      content: "\e615";
      font-family: "Icons";
      font-size: 20px;
      color: #c2cad8;
      transition: color .35s;
    }
  }
  
  .add {
    width: 40px;
    height: 42px;
    line-height: 42px;
    &:after {
      content: "\e095";
      font-size: 24px;
    }
  }
  
  .poll__notify {
    position: relative;
    text-align: right;
  }

  .notify { color: #f36a5a; font-weight: 300; }

  .poll__controls {
    &:after { @include clearfix }
  }

  .controls { text-align: right }

  .controls__access, .controls__submit {
    display: inline-block;
    width: 160px;
  }

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
      margin-right: 40px;
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
  import DefaultSelect from '../default-inputs/default-select.vue';
  import DefaultButton from '../default-inputs/default-button.vue';
  import AppInput from '../modules/inputs.vue';

  const pollsRef = firebase.database().ref('polls');

  function init() {
    return {
      author: '',
      company: '',
      access: 10,
      key: '',
      question: '',
      created: null,
      items: []
    }
  }

  export default {
    name: 'timeline-new-post',
    props: ['auth', 'user', 'poll'],
    components: { AppInput,  DefaultSelect, DefaultButton },
    data() {
      return {
        notify: false,
        access: [
          { value: 10, name: 'Доступен всем' },
          { value: 5, name: 'Только для коллег' },
          { value: 1, name: 'Только модераторам' },
        ],
        local: {}, saving: false
      }
    },
    computed: {
      itemsCount() {
        return this.local.items.length;
      },
      validation: function() {
        return {
          question: this.local.question.length > 25,
          itemsCount: this.local.items.length > 1,
          itemsFill: this.local.items.every( item => !!item.text )
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    },
    created() {
      this.local = init();
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
      publishPoll() {
        if ( this.isValid ) {
          this.saving = true;
          this.local.author = this.user.key;
          this.local.company = this.user.company.key;
          this.local.created = Firebase.database.ServerValue.TIMESTAMP;
          this.local.key = this.local.key || pollsRef.push().key;

          pollsRef.child(this.local.key).update(this.local)
            .then( () => {
              this.$parent.$parent.$refs.notify.createSnackbar({
                message: 'Новый опрос создан',
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
        }
        else { this.notify = true }
      },
      addItem() {
        let answer = { text: `Вариант ответа № ${this.itemsCount + 1}`, voting: [] }
        this.local.items.push(answer);
      },
      removeItem(index) {
        this.local.items.splice(index, 1);
      }
    }
  }
</script>