<template>
  <button :class="$style.input_button" :id="$style.id" v-if="type === 'button'">
    <slot></slot>
  </button>
  <div :class="$style.input_group" v-else>
    <label :for="$style.id" :class="$style.input_group__label" v-if="label">{{ label }}</label>
    <app-transition> 
      <span :class="$style.input_group__error" v-if="error"></span>
    </app-transition>
    <input type="text"
      :id="$style.id" 
      :class="$style.input_group__text"
      :placeholder="value"
      @keypress.enter="updateValue($event.target)"
      @blur="clearField($event.target)">
    <app-transition type="toggleDown">
      <div :class="$style.input_group__notify" v-if="error">{{ notify }}</div>
    </app-transition>
  </div>
</template>

<style lang="scss" module>

  .id { /* */ }
  .input_button {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    touch-action: manipulation;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #32c5d2;
    outline: none;
    color: #fff;
    background-color: #32c5d2;
    user-select: none;
    transition: all .2s ease-in-out;
    &:hover {
      color: #fff;
      background-color: #26a1ab;
      border-color: #2499a3;
    }
  
  }
  .input_group {
    position: relative;
    margin-bottom: 15px;
  }
  .input_group__label {
    margin-top: 1px;
    margin-bottom: 5px;
    display: inline-block;
    cursor: default;
  }
  .input_group__error {
    position: absolute;
    top: 25px;
    right: 0;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    &:before {
      content: "\e07c";
      font-family: "Icons";
      color: #f36a5a;
      font-size: 18px;
      vertical-align: middle;
    }
  }
  .input_group__text {
    outline: 0;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    color: #555;
    background-color: #fff;
    border: 1px solid #c2cad8;
    &::-webkit-input-placeholder { color: #93a3b5 }
    &::-moz-placeholder { color: #93a3b5 }
    &:-ms-input-placeholder { color: #93a3b5 }
    &:-moz-placeholder { color: #93a3b5 }
    transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
    &:focus {
      border-color: #93a1bb;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
    }
  }
  .input_group__notify {
    margin-top: 5px;
    font-size: 13px;
    color: #f36a5a; 
  }
</style>

<script>
  import AppTransition from '../helpers/app-transition.vue';

  export default {
    name: 'app-input',
    props: ['type', 'label', 'value', 'serverNotify'],
    components: { AppTransition },
    data() {
      return { error: false, newValue: '' }
    },
    computed: {
      notify() {
        let text = 'Поле может содержать только ';
        return ( this.type === 'tel' &&  text + 'цифры' )
            || ( this.type === 'page' && text + 'латинские буквы, цифры (не менее 6 символов)' )
            || ( this.type === 'name' && text + 'русские и латинские буквы, цифры (не менее 3 символов)' )
      },
      validation(value) {
        return {
          tel: (/^[0-9]+$/).test(this.newValue) || !this.newValue.length,
          page: (/^[a-z0-9]+$/i).test(this.newValue) && this.newValue.length > 5,
          name: (/^[a-zа-яA-ZА-Я0-9 ]+$/i).test(this.newValue) && this.newValue.length > 3
        }
      }
    },
    methods: {
      clearField(element) {
        this.error = false;
        element.value = '';
        element.blur();
      },
      updateValue(element) {
        this.newValue = element.value;
        if ( this.validation[this.type] ) {
          this.clearField(element);
          this.$emit('input', element.value);
        }
        else this.error = true;
      }
    }
  }
</script>