<template>
  <div :class="$style.input_group">
    <label :for="$style.id" :class="$style.input_group__label" v-if="label">{{ label }}</label>
    <app-transition> 
      <span :class="$style.input_group__error" v-if="error">
        <div :class="$style.error__notify">{{ notify }}</div>
      </span>
    </app-transition>
    <input type="text"
      :id="$style.id" 
      :class="$style.input_group__text"
      :placeholder="value"
      @keypress.enter="updateValue($event.target)">
  </div>
</template>

<style lang="scss" module>

  .id { /* */ }
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
    cursor: pointer;
    &:before {
      content: "\e07c";
      font-family: "Icons";
      color: #f36a5a;
      font-size: 18px;
      vertical-align: middle;
    }
  }
  .error__notify {
    position: absolute;
    width: 280px;
    right: -10px;
    bottom: 30px;
    background-color: #fff;
    box-shadow: 5px 5px rgba(102, 102, 102, 0.1);
    border: 1px solid lighten(#f36a5a, 20%);
    z-index: 1;

    &:after {
      position: absolute;
      bottom: -6px;
      right: 20px;
      display: block;
      border-right: 6px solid transparent;
      border-top: 6px solid #fac0b9;
      border-left: 6px solid transparent;
      content: '';
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
</style>

<script>
  import AppTransition from '../helpers/app-transition.vue';

  export default {
    name: 'app-input',
    props: ['type', 'label', 'value'],
    components: { AppTransition },
    data() {
      return { error: false, newValue: '' }
    },
    computed: {
      notify() {
        let text = 'Поле может содержать только ';
        return ( this.type === 'tel' &&  text + 'цифры' )
            || ( this.type === 'page' && text + 'латинские буквы, цифры и должно быть не менее 6 символов')
      },
      validation(value) {
        return {
          tel: (/^[0-9]+$/).test(this.newValue) || !this.newValue.length,
          page: (/^[a-z0-9]+$/i).test(this.newValue) && this.newValue.length > 5
        }
      }
    },
    methods: {
      updateValue(element) {
        this.newValue = element.value;
        if ( this.validation[this.type] ) {
          this.error = false;
          this.$emit('input', element.value);
          element.value = '';
          element.blur();
        }
        else this.error = true;
      }
    }
  }
</script>