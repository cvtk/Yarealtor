<template>
  <div :class="$style.registration">
    <div :class="$style.registration__content">
      <div :class="$style.content" v-if="!uid">
        <div :class="$style.content__logo">
          <img :class="$style.logo" src="/static/logo.png" alt="Логотип">
        </div>
        <div :class="$style.content__form">
          <div :class="$style.form" @keydown.enter="addUser">
            <div :class="$style.form__header">
              <h3 :class="$style.header">Регистрация</h3>
            </div>
            <div :class="$style.form__inputs">
              <div :class="$style.inputs">
                <div :class="$style.inputs__row">
                  <div :class="$style.row__item">
                    <default-text label="Ваше имя" v-model="name" 
                      msg="Введите имя" :validate="validation.name" />
                  </div>
                  <div :class="$style.row__item">
                    <default-text label="Фамилия" v-model="surname"
                      msg="Введите фамилию" :validate="validation.surname" />
                  </div>
                </div>
                <div :class="$style.inputs__row">
                  <div :class="$style.row__item">
                    <default-text mask="(###) ###-##-##" label="Телефон" 
                      msg="Некорректный номер" v-model="phone" :validate="validation.phone" />
                  </div>
                  <div :class="$style.row__item">
                    <default-text label="Эл. почта" v-model="email"
                      msg="Некорректный эл. адрес" :validate="validation.email" />
                  </div>
                </div>
                <div :class="$style.inputs__item">
                  <default-select label="Компания" v-model="company" :options="companies"
                    msg="Выберите компанию" :validate="validation.company" valueField="key" />
                </div>
                <div :class="$style.inputs__item">
                  <default-password label="Пароль" v-model="password"
                    msg="Пароль слишком короткий" :validate="validation.password" />
                </div>
                <div :class="$style.inputs__item">
                  <default-password label="Подтверждение пароля"
                    msg="Пароли не совпадают" :validate="validation.confirmation" v-model="confirmation" />
                </div>
              </div>
            </div>
            <div :class="$style.form__row">
              <div :class="$style.row__notify">
                {{ notify }}
              </div>
              <div :class="$style.row__submit">
                <default-button label="Регистрация" :red="!isValid" @click="addUser" />
              </div>
            </div>
            
            <div :class="$style.form__login">
              <router-link :to="{ name: 'login' }" :class="$style.login">Уже есть учетная запись?</router-link>
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
              <div :class="$style.row__message">Отлично! Регистрация прошла успешно. В ближайшее время администратор рассмотрит Вашу заявку, а пока Вы можете заполнить свой профиль.</div>
            </div>
            <div :class="$style.modal__row">
              <div :class="$style.row__submit">
                <default-button label="Перейти" @click="$router.push({ name: 'user', params: { page: uid } })" />
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

  .inputs__row {
    margin: 0 -10px;
    &:after { @include clearfix }
  }

  .row__item {
    float: left;
    width: 50%;
    padding: 0 10px;
  }
  
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
    width: 55%;
    font-size: 13px;
    padding: 0 10px;
    height: 36px;
    color: #f36a5a;
    overflow-wrap: break-word;
  }

  .row__submit {
    float: right;
    width: 45%;
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
  import Firebase from 'firebase';
  import DefaultText from '../default-inputs/default-text.vue';
  import DefaultNumber from '../default-inputs/default-number.vue';
  import DefaultPassword from '../default-inputs/default-password.vue';
  import DefaultSelect from '../default-inputs/default-select.vue';
  import DefaultButton from '../default-inputs/default-button.vue';

  const usersRef = firebase.database().ref('users');
  const companiesRef = firebase.database().ref('companies');
  const ticketsRef = firebase.database().ref('tickets');
  const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    name: 'auth-registration',
    components: { DefaultText, DefaultNumber, DefaultPassword, DefaultSelect, DefaultButton },
    data() {
      return {
        name: '', surname: '', company: '', phone: '', email: '', password: '', confirmation: '',
        companies: {}, notify: '', uid: null
      }
    },
    created() {
      companiesRef.once('value', companies => {
        this.companies = companies.val();
      })
    },
    computed: {
      validation: function () {
        return {
          name: !!this.name.trim(),
          surname: !!this.surname.trim(),
          company: !!this.company.trim(),
          phone: this.phone.trim().length > 8,
          email: emailRE.test(this.email),
          password: this.password.length >= 6,
          confirmation: this.password === this.confirmation
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
      addUser() {
        if ( !this.isValid ) return false;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then( createdUser => { this.setUser(createdUser) } )
          .catch( error => {
            switch(error.code) {
              case 'auth/email-already-in-use': this.notify = 'Адрес эл. почты ' + this.email + ' уже используется'; break;
              case 'auth/invalid-email': this.notify = 'Введите корректный адрес эл. почты'; break;
              case 'auth/weak-password': this.notify = 'Слишком простой пароль'; break;
              default: this.notify = 'Сетевая ошибка (addUser)';
            }
          })
      },
      setUser(user) {
        let pht= '/static/default-user.png';
        if ( user ) {
          let prep = {
            about: '',
            active: false,
            birthday: '', 
            company: this.company, created: Firebase.database.ServerValue.TIMESTAMP,
            email: this.email,
            key: user.uid,
            mobile: this.phone,
            name: this.name,
            role: 10,
            page: user.uid,
            photo: { small: pht, medium: pht, orig: pht} ,
            position: '',
            surname: this.surname,
            deleted: false
          }

          usersRef.child(user.uid).set(prep)
            .then( ()=> this.createTicket(user) )
            .catch( error => this.notify = 'Сетевая ошибка (onAuthStateChanged)' )
        }
      },
      createTicket(user) {
        if ( user ) {
          let prep = { created: Firebase.database.ServerValue.TIMESTAMP, type: 1, author: user.uid }
          ticketsRef.push( prep )
            .then( ()=> this.uid = user.uid )
            .catch( error => this.notify = 'Сетевая ошибка (createTicket)' )
        }
      }
    }
  }
</script>