<template>
  <div :class="$style.registration">
    <div :class="$style.registration__content">
      <div :class="$style.content">
        <div :class="$style.content__logo">
          <img :class="$style.logo" src="/static/logo.png" alt="Логотип">
        </div>
        <div :class="$style.content__form">
          <div :class="$style.form">
            <div :class="$style.form__header">
              <h3 :class="$style.header">Регистрация</h3>
            </div>
            <div :class="$style.form__inputs">
              <div :class="$style.inputs">
                <div :class="$style.inputs__row">
                  <div :class="$style.row__item">
                    <default-text label="Ваше имя" v-model="name" />
                  </div>
                  <div :class="$style.row__item">
                    <default-text label="Фамилия" v-model="surname" />
                  </div>
                </div>
                <div :class="$style.inputs__row">
                  <div :class="$style.row__item">
                    <default-text label="Телефон" v-model="phone" />
                  </div>
                  <div :class="$style.row__item">
                    <default-text label="Эл. почта" v-model="email" />
                  </div>
                </div>
                <div :class="$style.inputs__item">
                  <default-select label="Компания" v-model="company" :options="companies" />
                </div>
                <div :class="$style.inputs__item">
                  <default-text label="Пароль" v-model="password" />
                </div>
                <div :class="$style.inputs__item">
                  <default-text label="Подтверждение пароля" v-model="confirmation" />
                </div>
              </div>
            </div>
            <div :class="$style.form__submit">
              <default-button label="Регистрация" />
            </div>
            <div :class="$style.form__login">
              <router-link :to="{ name: 'auth' }" :class="$style.login">Уже есть учетная запись?</router-link>
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

  .registration {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #364150;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .registration__content { /* */ }

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
  
  .inputs__row {
    margin: 0 -15px;
    &:after { @include clearfix }
  }

  .row__item {
    float: left;
    width: 50%;
    padding: 0 15px;
  }
  
  .form__submit {
    margin: 15px 0;
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
  import DefaultSelect from '../default-inputs/default-select.vue';
  import DefaultButton from '../default-inputs/default-button.vue';

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');

  export default {
    name: 'auth-registration',
    components: { DefaultText, DefaultSelect, DefaultButton },
    data() {
      return {
        name: '', surname: '', company: '', phone: '', email: '', password: '', confirmation: '',
        companies: {}
      }
    },
    methods: {
      // createUser(auth) {
      //   let name = auth.displayName || auth.email.replace(/@.*/, ''),
      //       photo = auth.photoURL || '/static/users/default-' + (Math.floor(Math.random() * 6) + 1)  + '.svg';
        
      //   let user = {
      //     name: name,
      //     position: '',
      //     phone: '',
      //     mobile: '',
      //     email: auth.email,
      //     page: auth.uid,
      //     photo: photo,
      //     key: auth.uid,
      //     about: '',
      //     company: '',
      //     birthday: ''
      //   }
      //   return usersRef.child(auth.uid).set(user);
      // },
    }
  }
</script>