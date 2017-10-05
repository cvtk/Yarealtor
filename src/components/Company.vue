<template>
  <div :class="$style.company" v-if="dataReady">
    <modal-overlay :show="showRemoveModal" @close="showRemoveModal = false">
      <div :class="$style.remove_modal">
        <div :class="$style.message">Сотрудник будет удален. Восстановить эту запись будет невозможно. Вы уверены?</div>
        <div :class="$style.actions">
          <div :class="$style.actions__remove">
            <default-button red label="Удалить" @click="removeUser(markToRemove)" />
          </div>
          <div :class="$style.actions__cancel">
            <default-button label="Отмена" @click="showRemoveModal = false" />
          </div>
        </div>
      </div>
    </modal-overlay>
    <modal-overlay :show="showSettingsModal" @close="showSettingsModal = false">
      <company-settings :company="local" @cancel="showSettingsModal = false" />
    </modal-overlay>
    <div :class="$style.company__bar">
      <breadcrumbs :items="[ { text: 'Главная', to: 'root'}, { text: 'Компании', to: 'companies'}, { text: company.name, to: '' } ]"/> 
    </div>
    <div :class="$style.company__toolbar">
      <div :class="$style.toolbar__header">
        <toolbar :title="company.name" :sub="company.slogan"></toolbar>
      </div>
      <div :class="$style.toolbar__settings" v-if="isModer">
        <default-button label="Настройки" icon="settings" @click="showSettingsModal = true"/>
      </div>
    </div>
    <div :class="$style.company__banner" :style="{ 'background-image': 'url(' + company.image.orig + ')' }">
      <div :class="$style.title_wrapper">
        <h2 :class="$style.banner__name">{{ company.name }} <span :class="$style.name__badge" v-if="company.yasr">Участник ЯСР</span></h2>
        <h3 :class="$style.banner__slogan">{{ company.slogan }}</h3>
      </div>
    </div>
    
    <div :class="$style.company__content" v-if="dataReady">
      <div :class="$style.content">
        <div :class="$style.content__col">
          <div :class="$style.company__about_us">
            <h4 :class="$style.about_us__header"><span :class="$style.header__icon"></span> О Компании</h4>
            <p :class="$style.about_us__description" v-if="company.overview">{{ company.overview }}</p>
            <div :class="$style.about_us__contacts">
              <div :class="$style.contacts__item"><span :class="$style.item__icon_address"></span>Адрес: {{ company.address }}</div>
              <div :class="$style.contacts__item"><span :class="$style.item__icon_phone"></span>Телефон: {{ company.phone }}</div>
              <div :class="$style.contacts__item"><span :class="$style.item__icon_email"></span>Эл. почта: {{ company.email }}</div>
            </div>
            <div :class="$style.about_us__requisites" v-if="company.requisites">
              <h5 :class="$style.requisites__title">Реквизиты</h5>
              <p :class="$style.requisites__item">{{ company.requisites }}
              </p>
            </div>
          </div>
          <div :class="[ $style.company__employees, $style._inactive ]">
            <h4 :class="$style.employees__header"><span :class="$style.header__icon"></span> Заявки</h4>
            <div :class="$style.employees_wrapper">
              <div :class="$style.employees__notfound" v-if="!inactives.length">Активных заявок нет</div>
              <div :class="$style.employees__item" v-else v-for="employee in inactives">
                <transition name="fade" appear>
                  <div :class="$style.employe__wrapper">
                    <div :class="$style.photo_wrapper">
                      <img :class="$style.item__photo" :src="employee.photo">
                    </div>
                    
                    <router-link :to="{ name: 'user', params: { page: employee.page } }"
                      :class="$style.item__name">{{ [ employee.name, employee.surname ].join(' ') }}</router-link>
                    <div :class="$style.item__actions" v-if="isModer">
                      <span :class="$style.item__activate" @click="activateUser(employee.key)">добавить</span>
                      <span :class="$style.item__remove" @click="markToRemove = employee.key; showRemoveModal = true;">удалить</span>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.content__col">
          <div :class="$style.company__employees">
            <h4 :class="$style.employees__header"><span :class="$style.header__icon"></span> Сотрудники</h4>
            <div :class="$style.employees_wrapper">
              <div :class="$style.employees__principal" v-if="!!moderators.length" v-for="employee in moderators">
                <img :class="$style.principal__photo" :src="employee.photo">
                <div :class="$style.principal__meta">
                  <router-link :to="{ name: 'user', params: { page: employee.page } }" :class="$style.meta__name">
                    {{ [ employee.name, employee.surname ].join(' ') }}</router-link> <span :class="$style.meta__is_admin" title="Модератор компании"></span>
                  <span :class="$style.meta__position">{{ employee.position }} </span>
                  <div :class="$style.meta__contacts">
                    <span :class="$style.contacts__item" v-if="!!employee.phone"><span :class="$style.item__icon_phone"></span> {{ employee.phone }}</span>
                    <span :class="$style.contacts__item" v-if="!!employee.mobile"><span :class="$style.item__icon_mobile"></span> {{ employee.mobile }}</span>
                    <span :class="$style.contacts__item" v-if="!!employee.email"><span :class="$style.item__icon_email"></span> {{ employee.email }}</span>
                  </div>
                </div>
              </div>
              <div :class="$style.employees__search_filter">
                <app-input v-model="search" placeholder="Поиск..." :class="$style.search_filter__input" @keydown.enter.native="searchFilterSelectAll" />
              </div>
              <div :class="$style.employees__notfound" v-if="!employees.length">Сотрудники не найдены</div>
              <div :class="$style.employees__item" v-else v-for="employee in employees">
                <transition name="fade" appear>
                  <div :class="$style.employe__wrapper">
                    <div :class="$style.photo_wrapper">
                      <img :class="$style.item__photo" :src="employee.photo">
                    </div>
                    <router-link :to="{ name: 'user', params: { page: employee.page } }" :class="$style.item__name">{{ [ employee.name, employee.surname ].join(' ') }}</router-link>
                    <span :class="$style.item__position">{{ employee.position }}</span>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .45s ease-in-out;
  }

  .fade-leave, .fade-enter-to { opacity: 1 }
  .fade-enter, .fade-leave-to { opacity: 0 }

</style>
<style lang="scss" module>
  @import "../assets/style.scss";

  .company {
    position: relative;
    height: 100%;
    padding: 20px;
  }

  .company__banner {
    position: relative;
    height: 500px;
    background-position: center;
    margin: 0 -20px;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
    }

    .title_wrapper {
      position: relative;
      z-index: 1;
    }
    .banner__name {
      color: #fff;
      font-size: 55px;
      font-weight: 600;
      text-align: center;
      margin-top: 130px;
      margin-bottom: 10px;
      text-shadow: 1px 1px 0 rgba(0,0,0,.2);
    }

    .name__badge {
      display: inline-block;
      position: relative;
      top: 1px;
      vertical-align: middle;
      margin-left: 10px;
      font-size: 14px;
      line-height: 1;
      font-weight: 300;
      letter-spacing: .25px;
      background-color: #9A12B3;
      opacity: .65;
      padding: 10px;
      padding-left: 5px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: -17px;
        border-top: 17px solid transparent;
        border-bottom: 17px solid transparent; 
        border-right: 17px solid #9A12B3; 
      }
    }

    .banner__slogan {
      color: #fff;
      text-align: center;
      font-size: 22px;
      font-weight: 400;
      margin-top: 30px;
      margin-bottom: 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  .company__content { position: relative }

  .content {
    position: relative;
    margin: 20px -10px;
    &:after { @include clearfix }
  }

  .content__col {
    float: left;
    width: 50%;
    padding: 0 10px;
  }

  .company__about_us {
    position: relative;
    margin-bottom: 20px;
    border-bottom: 3px solid #d9534f;

    .about_us__header {
      background-color: #d9534f;
      font-size: 24px;
      font-weight: 100;
      color: #fff;
      padding: 1em 20px;
      margin: 0;
      line-height: 1.1;
      letter-spacing: .25px;
    }
    
    .header__icon {
      display: inline-block;
      line-height: 14px;
      -webkit-font-smoothing: antialiased;
      font-size: 22px;
      &:after {
        content: "\e08b";
        font-family: "Icons";
      }
    }

    .about_us__description {
      padding: 20px;
      margin: 0;
      color: #808a94;
      background-color: #fff;
      white-space: pre-line;
    }

    .about_us__contacts {
      position: relative;
      overflow: hidden;
      padding: 0 20px 15px;
      background-color: #fff;
    }

    .contacts__item {
      margin: 5px 0;
      font-size: 16px;
      color: #808a94;
    }

    .item__icon_address, .item__icon_phone, .item__icon_email {
      display: inline-block;
      font-size: 17px;
      margin-right: 5px;
      &:before {
        content: "\e096";
        font-family: "Icons";
        display: inline-block;
      }
    }
    .item__icon_phone:before { content: "\E048" }
    .item__icon_email:before { content: "\e01e" }

    .about_us__requisites {
      position: relative;
      overflow: hidden;
      padding: 0 20px 20px;
      background-color: #fff;
    }

    .requisites__title {
      font-size: 16px;
      font-weight: 400;
      margin: 0 0 5px;
    }

    .requisites__item {
      margin: 0;
      line-height: 24px;
      color: #808a94;
      white-space: pre-line;
    }
  }

  .company__employees {
    position: relative;
    border-bottom: 3px solid #3598dc;
    &._inactive {
      margin-bottom: 20px;
      border-color: #2ab4c0;
      .employees__header { background-color: #2ab4c0 }
      .header__icon:after { content: "\e031" }
    }

    .employees__header {
      background-color: #3598dc;
      font-size: 24px;
      font-weight: 100;
      color: #fff;
      padding: 1em 20px;
      margin: 0;
      line-height: 1.1;
      letter-spacing: .25px;
    }

    .header__icon {
      display: inline-block;
      line-height: 14px;
      -webkit-font-smoothing: antialiased;
      font-size: 22px;
      &:after {
        content: "\e001";
        font-family: "Icons";
      }
    }

    .employees_wrapper {
      position: relative;
      max-height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 20px;
      margin: 0;
      background-color: #fff;
      &:after { @include clearfix }
    }

    .employees__principal {
      position: relative;
      margin-bottom: 20px;
      overflow: hidden;
      &:after { @include clearfix }
    }

    .principal__photo {
      display: block;
      width: 65px;
      float: left;
    }

    .principal__meta { margin-left: 80px }

    .meta__name {
      font-size: 16px;
      margin: 0;
      color: #32c5d2;
      font-weight: 400;
      text-decoration: none;
      transition: color .2s ease-in-out;
      &:hover { color: darken(#32c5d2, 15%); text-decoration: underline }
    }

    .meta__is_admin {
      display: inline-block;
      background-image: url('./assets/icons/crown.svg');
      background-size: 100%;
      background-repeat: no-repeat;
      width: 18px;
      height: 18px;
    }

    .meta__position {
      display: block;
      color: #95A5A6;
      line-height: 1.25;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .meta__about {
      margin: 7.5px 0;
      color: #808a94;
    }

    .meta__contacts {
      position: relative;
    }

    .contacts__item {
      display: inline-block;
      color: #32c5d2;
      margin-right: 10px;
      vertical-align: bottom;
    }

    .item__icon_phone, .item__icon_mobile, .item__icon_email {
      display: inline-block;
      font-size: 15px;
      &:before {
        content: "\e048";
        font-family: "Icons";
      }
    }

    .item__icon_mobile:before { content: "\e010" }
    .item__icon_email:before { content: "\e01e" }
    
    .employees__search_filter:after { @include clearfix }
    
    .employe__wrapper { /* */ }

    .search_filter__input {
      float: right;
      width: 33.333333%;
    }

    .employees__notfound {
      color: #93a1bb;
      font-style: italic;
      padding: 10px 0;
    }

    .employees__item {
      position: relative;
      float: left;
      padding: 0 10px;
      width: 25%;
      margin-bottom: 15px;
    }

    .item__actions {
      &:after { @include clearfix }
      text-align: center;
      max-width: 110px;
      margin: 0 auto;
    }

    .item__activate {
      display: inline-block;
      color: #169ef4;
      float: left;
      text-align: left;
      font-size: 12px;
      font-weight: 300;
      line-height: 1.25;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      &:hover { text-decoration: underline }
    }

    .item__remove {
      display: inline-block;
      color: #e27d79;
      float: right;
      text-align: right;
      font-size: 12px;
      font-weight: 300;
      line-height: 1.25;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: color .25s;
      cursor: pointer;
      &:hover { color: #d9534f; text-decoration: underline; }
    }

    .item__photo {
      display: block;
      max-width: 100px;
      max-height: 100px;
      border: 4px solid #f5f6fa;
      border-radius: 50%;
      margin: 0 auto;
    }

    .photo_wrapper {
      padding: 5px 15px;
    }

    .item__name {
      display: block;
      font-weight: 400;
      color: #578ebe;
      text-decoration: none;
      transition: color .2s ease-in-out;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover { text-decoration: underline; color: #23527c; }
    }

    .item__position {
      display: block;
      color: #95A5A6;
      line-height: 1.25;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .company__toolbar {
    margin: 25px 0;
    &:after { @include clearfix }
  }

  .toolbar__header { float: left }

  .toolbar__settings { float: right }

  .company__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
    &:after { @include clearfix }
  }

  .remove_modal {
    background-color: #fff;
    padding: 25px 20px;
  }
  .message { margin-bottom: 30px }
  .actions {
    margin: 0 auto;
    max-width: 360px;
    &:after { @include clearfix }
  }
  .actions__remove { float: left; text-align: left; }
  .actions__cancel { float: right; text-align: right; }
    
  /* responsive */
    .company {
      @media (max-width: $bp-extra-large) {
        .employees__item { width: 25% }
      }
      @media (max-width: $bp-large) {
        .employees__item { width: 33.333333% }
      }
      @media (max-width: $bp-medium) {
        .content__col { width: 100%; float: none;}
      }
      @media (max-width: $bp-small) {
        .employees__item { width: 50% }
        .banner__name { font-size: 36px }
      }
      @media (max-width: $bp-extra-small) {

      }
  }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import firebase from '../firebase.js';
  import Breadcrumbs from './page-blocks/breadcrumbs.vue';
  import Toolbar from './page-blocks/toolbar.vue';
  import ModalOverlay from './modal-overlay/modal-overlay.vue';
  import DefaultButton from './default-inputs/default-button.vue';
  import CompanySettings from './company/company-settings.vue';

  const companiesRef = firebase.database().ref('companies');
  const usersRef = firebase.database().ref('users');

  export default {
    name: 'company',
    props: ['auth', 'user'],
    components: { AppLoader, AppInput, Breadcrumbs, Toolbar, ModalOverlay, DefaultButton, CompanySettings },
    computed: {
      isModer() {
        return this.user.role === 1 || ( this.user.role <= 5 && this.user.company.key === this.company.key );
      },

      moderators() {
        return this.users.filter( employee => employee.role <= 5 && employee.active );
      },

      inactives() {
        return this.users.filter( employee => !employee.active );
      },

      employees() {
        let filtered = this.users.filter( employee => employee.role > 5 && employee.active );

        if ( !this.search ) return filtered;

        let regex = new RegExp(this.search, "i");
        return filtered.filter( employee => [employee.name, employee.surname].join('').match(regex) );
      }
    },
    methods: {
      activateUser(key) {
        usersRef.child(key).update({ active: true })
          .then( () => {
            console.log("active succeeded.")
          })
          .catch( error => {
            console.log("Active failed: " + error.message)
          });
      },

      removeUser() {
        this.showRemoveModal = false;
        usersRef.child(this.markToRemove).remove()
          .then( () => {
            console.log("Remove succeeded.")
          })
          .catch( error => {
            console.log("Remove failed: " + error.message)
          });
      },

      searchFilterSelectAll(e) {
        let el = e.target;
        el.setSelectionRange(0, el.value.length)
      }
    },
    data() {
      return {
        dataReady: false,
        showRemoveModal: false,
        showSettingsModal: false,
        markToRemove: '',
        search: '',
        company: {},
        users: [],
        local: {}
      }
    },
    created() {
      companiesRef.orderByChild('page').equalTo(this.$route.params.page).on('value', (company) => {
        if ( company.exists() ) { company.forEach(item => {
          this.company = item.val();
          this.local = item.val();
          usersRef.orderByChild('company').equalTo(this.company.key).on('value', employees => {
            if ( employees.exists() ) {
              let e = employees.val();
              this.users = Object.keys(e).map( employee => e[employee] ).sort( (a, b) => a.surname > b.surname );
            }
          })
        })}
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.page } });
        }
        this.dataReady = true
      })
    },
  }
</script>