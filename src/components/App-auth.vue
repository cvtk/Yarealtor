<template>
  <div :class="$style.app__auth">
    <div :class="$style.auth__logo">
      <img src="/static/logo_big.png" alt="Логотип" :class="$style.logo__pic">
    </div>
    <div :class="$style.auth__form">
      <h3 :class="$style.form__title">Войти</h3>
      <div :class="$style.form__alert" v-show="error">{{ error }}</div>
      <input type="text" placeholder="Эл.почта" name="email" @keyup.enter="signIn" v-model="email" :class="$style.form__input">
      <input type="password" placeholder="Пароль" name="password" @keyup.enter="signIn" v-model="password" :class="$style.form__input">
      <div :class="$style.form__actions">
        <button :class="$style.actions__login" @click.prevent="signIn">Вход</button>
        <span :class="$style.actions__forget_password">Забыли пароль?</span>
      </div>
      <div :class="$style.form__create_account">
        <span :class="$style.create_account__link">Регистрация</span>
      </div>
    </div>
    <div :class="$style.auth__copyright">&copy; iLAN, Ярославский союз риэлторов, 2017</div>
  </div>
</template>

<script>
  import firebase from '../firebase.js';
  import getErrorMessage from './assets/getErrorMessage.js';

  const usersRef = firebase.database().ref('users');

  export default {
    name: 'app-auth',
    data() {
      return { email: '', password: '', error: '' }
    },
    methods: {
      createUser(auth) {
        let name = auth.displayName || auth.email.replace(/@.*/, ''),
            photo = auth.photoURL || '/static/users/default-' + (Math.floor(Math.random() * 6) + 1)  + '.svg';
        
        let user = {
          name: name,
          position: '',
          phone: '',
          mobile: '',
          email: auth.email,
          page: auth.uid,
          photo: photo,
          key: auth.uid,
          about: '',
          company: '',
          birthday: ''
        }
        return usersRef.child(auth.uid).set(user);
      },

      onSign(auth) {
        usersRef.child(auth.uid).once('value', user => {
          if (!user.exists()) { this.createUser(auth) }
          this.$router.push(this.$route.query.redirect);
        })
      },
      signIn() {
        if ( this.email && this.password ) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(this.onSign)
            .catch((error) => this.error = getErrorMessage(error.code) || error.message );
          }
        else { this.error = 'Для входа необходимо ввести адрес электронной почты и пароль' }
      }
    }
  }
</script>

<style lang="scss" module>
  @import "../assets/style.scss";
  .app__auth {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #364150;
    min-width: 320px;
    > .auth__logo {
      margin: 0 auto;
      padding: 60px 15px 15px;
      text-align: center;
      > .logo__pic {
        vertical-align: middle;
        cursor: pointer;
      }
    }
    > .auth__form {
      position: relative;
      width: 400px;
      background-color: #fff;
      margin: 40px auto 10px;
      padding: 10px 30px 30px;
      > .form__title {
        margin-bottom: 25px;
        margin-top: 20px;
        color: #32c5d2;
        text-align: center;
        font-size: 28px;
        line-height: 1.1;
        font-weight: 300;
      }
      > .form__alert {
        position: relative;
        background-color: #fbe1e3;
        color: #e73d4a;
        padding: 15px;
        border: 1px solid #fbe1e3;
        margin-bottom: 20px;
      }
      > .form__input {
        font-family: "Roboto", sans-serif;
        width: 100%;
        background-color: #dde3ec;
        height: 43px;
        color: #8290a3;
        border: 1px solid #dde3ec;
        outline: none;
        padding: 6px 12px;
        margin-bottom: 15px;
        transition: border-color .2s ease-in-out;
        &::-webkit-input-placeholder { color: #8290a3; }
        &::-moz-placeholder { color: #8290a3 }
        &:-ms-input-placeholder { color: #8290a3 }
        &:-moz-placeholder { color: #8290a3 }
        &:focus { border: 1px solid #c3ccda }
      }
      > .form__actions {
        clear: both;
        border: 0;
        border-bottom: 1px solid #eee;
        padding: 25px 30px;
        margin-left: -30px;
        margin-right: -30px;
        > .actions__login {
          font-family: "Roboto", sans-serif;
          text-transform: uppercase;
          font-weight: 600;
          padding: 10px 20px;
          line-height: 1.42857;
          color: #fff;
          background-color: #32c5d2;
          outline: none;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          border: 1px solid #32c5d2;
          white-space: nowrap;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          transition: background-color .2s ease-in-out, border-color .2s ease-in-out;
          &:hover {
            background-color: #26a1ab;
            border-color: #2499a3;
          }
        }
        > .actions__forget_password {
          float: right;
          display: inline-block;
          margin-top: 10px;
          color: #337ab7;
          cursor: pointer;
          transition: color .2s ease-in-out;
          &:hover { text-decoration: underline; color: #23527c; }
        }
      }
      > .form__create_account {
        margin: 0 -30px -30px;
        padding: 18px 0 18px;
        text-align: center;
        background-color: #6c7a8d;
        > .create_account__link {
          font-weight: 600;
          color: #c3cedd;
          text-transform: uppercase;
          cursor: pointer;
          transition: color .2s ease-in-out;
          &:hover { text-decoration: underline }
        }
      }
    }
    > .auth__copyright {
      text-align: center;
      margin: 0 auto 30px 0;
      padding: 10px;
      color: #7a8ca5;
      font-size: 13px;
    }
    @media (max-width: $bp-small) {
      .auth__logo { padding-top: 25px }
      .auth__form { width: 320px; margin-top: 10px; }
    }
  }
</style>