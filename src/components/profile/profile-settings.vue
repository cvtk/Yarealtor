<template>
  <div :class="$style.settings">
    <div :class="$style.settings__bar">
      <div :class="$style.bar">
        <h2 :class="$style.bar__title">Настройки</h2>
        <div :class="$style.bar__tabs">
          <ul :class="$style.tabs">
            <li :class="[ $style.tabs__item, tab === 1 && $style._active ]" @click="tab = 1">Общая информация</li>
            <li :class="[ $style.tabs__item, tab === 2 && $style._active ]" @click="tab = 2">Личные данные</li>
            <li :class="[ $style.tabs__item, tab === 3 && $style._active ]" @click="tab = 3" v-if="isModer || isAdmin">Управление</li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="$style.settings__content" v-show="tab === 1">
      <div :class="$style.content">
        <div :class="$style.content__row">
          <div :class="$style.row__item">
            <default-text label="Имя" v-model="local.name" />
          </div>
          <div :class="$style.row__item">
            <default-text label="Фамилия" v-model="local.surname" />
          </div>
        </div>
        <div :class="$style.content__row">
          <div :class="$style.row__item">
            <default-number label="Мобильный телефон" mask="(###) ###-##-##" v-model="local.mobile" />
          </div>
          <div :class="$style.row__item">
            <default-number label="Рабочий телефон" mask="##-##-##" v-model="local.phone" />
          </div>
        </div>
        <div :class="$style.content__row">
          <div :class="$style.row__item">
            <default-text label="Должность" v-model="local.position" />
          </div>
          <div :class="$style.row__item">
            <default-text label="Страница на портале" v-model="local.page" />
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.settings__content" v-show="tab === 2">
      <div :class="$style.content">
        <div :class="$style.content__avatar">
          <div :class="$style.avatar" :style="{ 'background-image': 'url(' + local.photo + ')' }"></div>
          <upload-image type="hidden" @input="onImageLoad">Сменить фото</upload-image>
        </div>
        <div :class="$style.content__bio">
          <div :class="$style.bio">
            <div :class="$style.bio__item">
              <ui-datepicker floatingLabel
                @input="onChange"
                label="Ваш день рождения"
                v-model="birthday"
                :lang="ruLang"
                >День рождения</ui-datepicker>
            </div>
            <div :class="$style.bio__item">
              <ui-textbox floating-label
                type="text"
                :multiLine="true"
                label="Расскажите о себе"
                v-model="local.about">
              </ui-textbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.settings__content" v-if="tab === 3 && ( isModer || isAdmin )">
      <div :class="$style.content">
        <div :class="$style.content__row">
          <div :class="$style.row__item" v-if="isAdmin">
            <default-select v-model="local.role" label="Роль" 
              :options="[{ value: 1, name: 'Администратор' }, { value: 5, name: 'Модератор' }, { value: 10, name: 'Сотрудник' }]"
            />
          </div>
          <div :class="$style.row__item" v-else-if="isModer">
            <default-select v-model="local.role" label="Роль" :options="[{ value: 5, name: 'Модератор' }, { value: 10, name: 'Сотрудник' }]" />
          </div>
          <div :class="$style.row__item" v-if="isAdmin">
            <default-select v-model="local.company" label="Компания" :options="companies" valueField="key" />
          </div>
        </div>
        <div :class="$style.content__row">
          <div :class="$style.row__item">
            <default-checkbox v-model="local.active" label="Подтвержденный пользователь" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>

  @import "../../assets/style.scss";

  .settings {
    position: relative;

    @media( max-width: $bp-small ) {
      .tabs__item { display: block }
      .content__avatar { float: none }
      .content__bio { margin-left: 0 }
    }
  }

  .settings__bar {
    position: relative;
    margin-bottom: 20px;
    background-color: #fff;
  }

  .bar {
    min-height: 48px;
    border-bottom: 1px solid #eee;
    &:after { @include clearfix }
  }

  .bar__title {
    color: #578ebe;
    padding: 12px 0;
    float: left;
    display: inline-block;
    font-size: 15px;
    line-height: 18px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: .25px;
  }

  .bar__tabs { float: right }

  .tabs {
    margin: 0;
    display: inline-block;
    padding: 0;
    list-style: none;
    text-align: right;
    font-size: 0;
  }

  .tabs__item {
    display: inline-block;
    padding: 12px 13px 13px;
    font-size: 14px;
    border-bottom: 4px solid transparent;
    cursor: pointer;
    transition: border-color .1s;
    &._active, &:hover { border-color: #5b9bd1 }
  }

  .settings__content {
    position: relative;
  }

  .content {
    position: relative;
  }
  .content__row {
    position: relative;
    margin: 0 -10px 15px;
    &:after { @include clearfix }
  }

  .row__item {
    float: left;
    width: 50%;
    padding: 0 10px;
  }

  .content__avatar {
    float: left;
    text-align: center;
  }

  .content__bio {
    margin-left: 170px;
  }

  .avatar {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid #f5f6fa;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .avatar__image {
    max-width: 100%;
    padding: 10px;
    padding-top: 0;
  }

  .bio {
    position: relative;
  }

  .bio__item {
    padding: 10px 0;
  }

</style>

<script>
  import firebase from '../../firebase.js';
  import _h from '../helpers/filters.js';
  import DefaultText from '../default-inputs/default-text.vue';
  import DefaultTextarea from '../default-inputs/default-textarea.vue';
  import DefaultNumber from '../default-inputs/default-number.vue';
  import DefaultCheckbox from '../default-inputs/default-checkbox.vue';
  import DefaultSelect from '../default-inputs/default-select.vue';
  import UploadImage from '../modules/upload-images.vue';

  export default {
    name: 'profile-settings',

    props: {
      profile: { type: Object, default: {} },
      user: { type: Object, default: {} }
    },

    components: { DefaultText, DefaultNumber, DefaultTextarea, DefaultCheckbox, DefaultSelect, UploadImage },

    created() {
      firebase.database().ref('companies').once('value', companies => {
        this.companies = companies.val();
      });

      this.birthday = new Date(this.profile.birthday * 1000);
    },

    data() {
      return {
        local: this.profile,
        tab: 1,
        companies: {},
        birthday: '',
        ruLang: {
          months: {
            full: _h.moment().months(),
            abbreviated: _h.moment().monthsShort()
          },
          days: {
            full: _h.moment().weekdays(),
            abbreviated: _h.moment().weekdaysShort(),
            initials: _h.moment().weekdaysShort()
          }
        }
      }
    },
    watch: {
      profile() {
        this.local = this.profile
      }
    },
    computed: {
      isAdmin() { return this.user.role === 1 },
      isModer() { return ( this.user.role <= 5 && this.user.company.key === this.profile.company ) }
    },
    methods: {
      onImageLoad(image) {
        this.local.photo = image.small;
      },
      onChange() {
        this.local.birthday = new Date(this.birthday).getTime() / 1000;
      }
    }
  }
</script>