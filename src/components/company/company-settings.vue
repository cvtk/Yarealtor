<template>
  <div :class="$style.settings">
    <h3 :class="$style.settings__header">{{ local.name || 'Создать компанию' }}</h3>
    <div :class="$style.settings__inputs">
      <div :class="$style.inputs">
        <div :class="$style.inputs__row">
          <div :class="$style.row__item">
            <default-text label="Название компании" :validate="validation.name" msg="Минимум пять символов" v-model="local.name" />
          </div>
          <div :class="$style.row__item">
            <default-text label="Слоган" :validate="validation.slogan" msg="Не более ста символом" v-model="local.slogan" />
          </div>
        </div>
        <div :class="$style.inputs__row">
          <div :class="$style.row__item">
            <default-text label="Страница на портале" :validate="validation.page" msg="Только латинские символы (максимум 18) " v-model="local.page" />
          </div>
          <div :class="$style.row__item">
            <default-text label="Адрес эл.почты" :validate="validation.email" msg="Некорректный адрес эл. почты" v-model="local.email" />
          </div>
        </div>
        <div :class="$style.inputs__row">
          <div :class="$style.row__item">
            <default-number label="Телефон" :validate="validation.phone" mask="(###) ###-##-##" v-model="local.phone" />
          </div>
          <div :class="$style.row__item">
            <default-text label="Адрес" :validate="validation.address" msg="Не более 255 символов" v-model="local.address" />
          </div>
        </div>
        <default-textarea label="Реквизиты" :validate="validation.requisites" msg="Не более 2048 символов" v-model="local.requisites" />
        <default-textarea label="Общая информация" :validate="validation.overview" msg="Не более 2048 символов" v-model="local.overview" />
        <div :class="[ $style.inputs__row, $style._full ]">
          <div :class="$style.row__item">
            <default-checkbox label="Участник ЯСР" v-model="local.yasr" />
          </div>
          <div :class="$style.row__item">
            
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.settings__actions">
      <div :class="$style.actions">
        <div :class="$style.actions__save">
          <default-button label="Сохранить" @click="saveCompany" />
        </div>
        <div :class="$style.actions__cancel">
          <default-button red label="Отмена" @click="$emit('cancel')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  
  @import "../../assets/style.scss";

  .settings {
    position: relative;
    background-color: #fff;
    padding: 30px;
    width: 700px;
    @media (max-width: $bp-small) {
      width: 320px;
      .row__item {
        float: 100%;
        padding: 0;
        width: 100%
      }
    }
  }
  .settings__header {
    margin: 0;
    margin-bottom: 30px;
    color: #32c5d2;
    text-align: center;
    font-weight: 300;
    font-size: 28px;
  }
  .settings__inputs { margin-bottom: 30px }
  .settings__actions:after { @include clearfix }

  .inputs { position: relative }

  .inputs__row {
    &:after { @include clearfix }
    position: relative;
    margin: 0 -10px;
  }

  .row__item {
    float: left;
    width: 50%;
    padding: 0 10px;
  }
  ._full { padding: 15px 0 }
  .actions {
    position: relative;
    width: 210px;
    float: right;
    text-align: right;
  }

  .actions__save {
    display: inline-block;
    text-align: left;
    margin-right: 20px;
  }

  .actions__cancel {
    display: inline-block;
    text-align: right;
  }
</style>

<script>

  import firebase from '../../firebase.js';
  import DefaultText from '../default-inputs/default-text.vue';
  import DefaultTextarea from '../default-inputs/default-textarea.vue';
  import DefaultNumber from '../default-inputs/default-number.vue';
  import DefaultButton from '../default-inputs/default-button.vue';
  import DefaultCheckbox from '../default-inputs/default-checkbox.vue';

  const companiesRef = firebase.database().ref('companies');
  const pageRE = /^[a-zA-Z]*$/
  const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    name: 'company-settings',
    components: { DefaultText, DefaultNumber, DefaultButton, DefaultTextarea, DefaultCheckbox },
    props: {
      company: { type: Object, default: [] }
    },
    data() {
      return { local: this.company }
    },
    watch: {
      company() {
        this.local = this.company
      }
    },
    computed: {
      validation: function () {
        return {
          name: this.local.name.trim().length > 5,
          slogan: this.local.slogan.length < 100,
          page: pageRE.test(this.local.page) && this.local.page.length < 18,
          email: emailRE.test(this.local.email),
          phone: this.local.phone.trim().length > 8,
          address: this.local.address.length < 255,
          requisites: this.local.requisites.length < 2048,
          overview: this.local.overview.length < 2048,
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
      saveCompany() {}
    }
  }
  
</script>