<template>
  <div :class="$style.input_radio" v-if="type === 'radio'">
    <input type="radio" :id="id" :class="$style.input_radio__input" :name="name" :value="option" @change="onchange" :checked="value === option">
    <label :class="$style.input_radio__label" :for="id">
      <span :class="$style.input_radio__box">
        <div :class="$style.box__checked"></div>
      </span>
      <slot></slot>
    </label>
  </div>

  <button :class="$style.input_button" :id="$style.id" v-else-if="type === 'button'" @click="onclick">
    <slot></slot>
  </button>

  <div :class="$style.input_group" v-else-if="type === 'number'">
    <label :for="$style.id" :class="$style.input_group__label" v-if="label">{{ label }}</label>
    <app-transition> 
      <span :class="$style.input_group__error" v-if="error"></span>
    </app-transition>
    <input type="number" min=0 max=100000 step="1.0"
      :id="$style.id" 
      :class="$style.input_group__text"
      :placeholder="placeholder"
      @change="onchange">
    <app-transition type="toggleDown">
      <div :class="$style.input_group__notify" v-if="error">{{ notify }}</div>
    </app-transition>
  </div>

  <div :class="$style.input_group" v-else>
    <label :for="$style.id" :class="$style.input_group__label" v-if="label">{{ label }}</label>
    <app-transition> 
      <span :class="$style.input_group__error" v-if="error"></span>
    </app-transition>
    <input type="text"
      :id="$style.id" 
      :class="$style.input_group__text"
      :placeholder="placeholder"
      :value="value"
      @input="onchange">
    <app-transition type="toggleDown">
      <div :class="$style.input_group__notify" v-if="error">{{ notify }}</div>
    </app-transition>
  </div>
</template>

<style lang="scss" module>

  .id { /* */ }

  .input_radio__input:checked ~ .input_radio__label .box__checked {
    transform: scale(1);
    opacity: 1;
  }

  .input_radio {
    display: inline-block;
    position: relative;
  }

  .input_radio__input {
    display: none;
  }

  .input_radio__label {
    display: inline-block;
    vertical-align: middle;
    line-height: 24px;
    cursor: pointer;
  
  }

  .input_radio__box {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    border: 2px solid #27a4b0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }

  .box__checked {
    position: absolute;
    transform: scale(0);
    opacity: 0;
    background: #27a4b0;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
  }

  .input_button {
    display: inline-block;
    z-index: 1;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
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
    &::-webkit-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
    &::-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
    &:-ms-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
    &:-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
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
    props: ['type', 'label', 'value', 'serverNotify', 'name', 'option', 'placeholder', 'checked'],
    components: { AppTransition },
    data() {
      return { error: false, newValue: '', id: Math.random().toString(36).substring(7) }
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
      onchange(e) {
        this.$emit('input', e.target.value);

      },
      onclick() {
        this.$emit('click')
      },
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