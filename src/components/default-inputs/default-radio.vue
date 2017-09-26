<template>
  <div :class="$style.radio">
    <input type="radio" :id="id" :class="$style.radio__input" :name="name" :value="option" v-model="local" @change="onChange" />
    <label :class="$style.radio__label" :for="id">
      <span :class="$style.radio__box">
        <div :class="$style._checked"></div>
      </span>
      {{ label }}
    </label>
  </div>
</template>

<style lang="scss" module>
  .radio__input:checked ~ .radio__label ._checked {
    transform: scale(1);
    opacity: 1;
  }

  .radio {
    display: inline-block;
    position: relative;
  }

  .radio__input {
    display: none;
  }

  .radio__label {
    display: inline-block;
    vertical-align: middle;
    line-height: 24px;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
  }

  .radio__box {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    border: 2px solid #c2cad8;
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
  
  

  ._checked {
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
</style>

<script>
  export default {
    name: 'default-radio',
    props: {
      name: { type: String, default: 'default' },
      value: { default: 'default' },
      option: { default: 'default' },
      label: { type: String, default: 'default' },
    },
    data() {
      return {
        id: Math.random().toString(36).substring(7),
        local: this.value
      }
    },
    methods: {
      onChange() {
        this.$emit('input', this.local);
      }
    }
  }
</script>
