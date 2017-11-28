<template>
  <div :class="$style.login">
    <div :class="$style.login__content">
      <div :class="$style.content">
        <div :class="$style.content__logo">
          <img :class="$style.logo" src="/static/logo_big.png" alt="Логотип">
        </div>
        <div :class="$style.content__form">
          <div :class="$style.form" @keydown.enter="loginUser">
            <div :class="$style.form__header">
              <h3 :class="$style.header">Войти</h3>
            </div>
            <div :class="$style.form__inputs">
              <div :class="$style.inputs">
                <div :class="$style.inputs__item">
                  <default-text label="Эл. почта" v-model="email" :validate="validation.email" />
                </div>
                <div :class="$style.inputs__item">
                  <default-password label="Пароль" v-model="password" :validate="validation.password" />
                </div>
              </div>
            </div>
            <div :class="$style.form__row">
              <div :class="$style.row__notify">
                {{ notify }}
              </div>
            </div>
            <div :class="$style.form__row">
              <router-link :to="{ name: 'recovery' }" :class="$style.row__forget">Забыли пароль?</router-link>
              <div :class="$style.row__submit">
                <default-button label="Войти" :red="!isValid" @click="loginUser" />
              </div>
            </div>
            <div :class="$style.form__register">
              <router-link :to="{ name: 'registration' }" :class="$style.register">Регистрация</router-link>
            </div>
          </div>
        </div>
        <div :class="$style.content__copyright">
          <div :class="$style.copyright">&copy; iLAN, Ярославский союз риэлторов, 2017</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #364150;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login__content { /* */ }

  .content { /* */ }

  .content__logo {
    margin: 0 auto;
    padding: 30px 15px;
    text-align: center;
  }

  .logo { vertical-align: middle }

  .content__form {
    position: relative;
    width: 460px;
    min-width: 320px;
    margin: 0 auto;
    background-color: #fff;
    @media (max-width: $bp-small) { max-width: 320px }
  }

  .form {
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

  .row__notify {
    font-size: 13px;
    padding: 0 10px;
    height: 36px;
    color: #f36a5a;
    overflow-wrap: break-word;
  }

  .row__forget {
    float: left;
    width: 55%;
    padding: 0 10px;
    line-height: 36px;
    color: #364150;
    text-decoration: none;
    &:hover { text-decoration: underline }
  }

  .row__submit {
    float: right;
    width: 45%;
    padding: 0 10px;
    text-align: right;
  }

  .form__register {
    margin: 0 -30px -30px;
    padding: 18px 0 18px;
    text-align: center;
    text-decoration: none;
    background-color: #6c7a8d;
  }

  .register {
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
  import DefaultPassword from '../default-inputs/default-password.vue';
  import DefaultButton from '../default-inputs/default-button.vue';

  const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    name: 'auth-login',
    components: { DefaultText, DefaultPassword, DefaultButton },
    data() {
      return {
        email: '', password: '', notify: ''
      }
    },
    computed: {
      validation: function () {
        return {
          email: emailRE.test(this.email),
          password: !!this.password.trim(),
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
      loginUser() {
        if ( !this.isValid ) return false;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then( (user) => { this.redirect(user) })
          .catch( error => {
            switch(error.code) {
              case 'auth/invalid-email': this.notify = 'Некорректный адрес эл. почты'; break;
              case 'auth/user-disabled': this.notify = 'Пользователь заблокирован'; break;
              case 'auth/user-not-found': this.notify = 'Пользователь не найден'; break;
              case 'auth/wrong-password': this.notify = 'Неверный пароль'; break;
              default: this.notify = 'Сетевая ошибка (loginUser, ' + error.code + '): ' + error.message;
            }
          })
      },

      redirect(auth) {
        firebase.database().ref('users').child(auth.uid).once('value')
          .then( snapshot => {
            let user = snapshot.val();
            if ( user.deleted ) {
              firebase.auth().signOut();
              this.notify = 'Аккаунт ' + auth.email + ' удален. Обратитесь к администратору портала';
              return;
            }
            this.$router.push(this.$route.query.redirect || { name: 'user', params: { page: user.page } });
          })
          .catch( error => { this.notify = 'Сетевая ошибка (loginUser, ' + error.code + '): ' + error.message })
      }
    }
  }
</script>