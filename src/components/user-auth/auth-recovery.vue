<template>
  <div :class="$style.recovery">
    <div :class="$style.recovery__content">
      <div :class="$style.content" v-if="!emailSended">
        <div :class="$style.content__logo">
          <img :class="$style.logo" src="/static/logo.png" alt="Логотип">
        </div>
        <div :class="$style.content__form">
          <div :class="$style.form" @keydown.enter="sendResetEmail">
            <div :class="$style.form__header">
              <h3 :class="$style.header">Восстановление пароля</h3>
            </div>
            <div :class="$style.form__inputs">
              <div :class="$style.inputs">
                <div :class="$style.inputs__item">
                  <default-text label="Адрес вашей эл. почты" v-model="email" msg="Некорректный эл. адрес" :validate="validation.email" />
                </div>
              </div>
            </div>
            <div :class="$style.form__row">
              <div :class="$style.row__notify">
                {{ notify }}
              </div>
              <div :class="$style.row__submit">
                <default-button label="Восстановление" :red="!isValid" @click="sendResetEmail" />
              </div>
            </div>
            
            <div :class="$style.form__login">
              <router-link :to="{ name: 'login' }" :class="$style.login">Войти</router-link>
            </div>
          </div>
        </div>
        <div :class="$style.content__copyright">
          <div :class="$style.copyright">&copy; iLAN, Ярославский союз риэлторов, 2017</div>
        </div>
      </div>
      <div :class="$style.content" v-else>
        <div :class="$style.content__modal">
          <div :class="$style.modal">
            <div :class="$style.modal__row">
              <div :class="$style.row__icon">
                <img :class="$style.icon" src="./done.svg" alt="Готово" />
              </div>
              <div :class="$style.row__message">На адрес Вашей электронной почты отправлено письмо с дальнейшими инструкциями по восстановлению</div>
            </div>
            <div :class="$style.modal__row">
              <div :class="$style.row__submit">
                <default-button label="Вернуться" @click="$router.push({ name: 'login' })" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .recovery {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #364150;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .recovery__content { /* */ }

  .content { /* */ }

  .content__logo {
    margin: 0 auto;
    padding: 30px 15px;
    text-align: center;
  }

  .logo { vertical-align: middle }

  .content__form, .content__modal {
    position: relative;
    width: 460px;
    min-width: 320px;
    margin: 0 auto;
    background-color: #fff;
    @media (max-width: $bp-small) { max-width: 320px }
  }

  .form, .modal {
    padding: 30px 30px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .6);
  }

  .form__header {
    margin: 0
  }

  .header {
    margin: 0 0 15px;
    color: #32c5d2;
    text-align: center;
    font-weight: 300;
    font-size: 28px;
  }
  
  .form__inputs { /* */ }

  .inputs { /* */ }
  
  .inputs__item { /* */ }
  
  .form__row {
    margin: 0 -10px;
    padding: 15px 0;
    &:after { @include clearfix }
  }

  .modal__row {
    margin: 0 -10px;
    &:after { @include clearfix }
  }
  .row__icon {
    float: left;
    width: 20%;
    padding: 0 10px 20px;
  }

  .row__message {
    float: left;
    width: 80%;
    padding: 0 10px 20px;
  }

  .icon {
    max-width: 100%;
    height: auto;
  }

  .row__notify {
    float: left;
    width: 45%;
    font-size: 13px;
    padding: 0 10px;
    height: 36px;
    color: #f36a5a;
    overflow-wrap: break-word;
  }

  .row__submit {
    float: right;
    width: 55%;
    padding: 0 10px;
    text-align: right;
  }

  .form__login {
    margin: 0 -30px -30px;
    padding: 18px 0 18px;
    text-align: center;
    text-decoration: none;
    background-color: #6c7a8d;
  }

  .login {
    font-weight: 600;
    color: #c3cedd;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    &:hover { text-decoration: underline }
  }
  .rcontent__copyright { margin: 0 auto 30px 0 }

  .copyright {
    text-align: center;
    padding: 10px;
    color: #7a8ca5;
    font-size: 13px;
  }

</style>

<script>
  import firebase from '../../firebase.js';
  import DefaultText from '../default-inputs/default-text.vue';
  import DefaultButton from '../default-inputs/default-button.vue';

  const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    name: 'auth-recovery',
    components: { DefaultText, DefaultButton },
    data() {
      return {
        email: '', notify: '', emailSended: false
      }
    },
    computed: {
      validation: function () {
        return {
          email: emailRE.test(this.email)
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    },
    methods: {
      sendResetEmail() {
        let actionCodeSettings = { url: 'http://' + document.domain + '/login' }
        console.log(actionCodeSettings.url)
        firebase.auth().sendPasswordResetEmail(this.email, actionCodeSettings)
          .then( () => { this.emailSended = true } )
          .catch( error => {
            switch(error.code) {
              case 'auth/invalid-email': this.notify = 'Некорректный адрес эл. почты'; break;
              case 'auth/user-not-found': this.notify = 'Пользователь не найден'; break;
              default: this.notify = 'Сетевая ошибка (sendResetEmail)';
            }
          })
      }
    }
  }
</script>