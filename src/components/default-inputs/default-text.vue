<template>
  <div :class="$style.text">
    <input type="text" :class="[ $style.text__input, local && $style._edited, !validate && $style._error ]"
      :id="id" v-model="local" @input="onChange">
    <label :class="$style.text__label">{{ label }}</label>
    <span :class="$style.text__msg">{{ msg }}</span>
  </div>
  
</template>

<style lang="scss" module>
  .text {
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 0 0 20px;
    padding-top: 20px;
  }

  .text__input {
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    background: 0 0;
    border: none;
    border-bottom: 1px solid #c2cad8;
    color: #555;
    padding-left: 0;
    padding-right: 0;
    font-size: 14px;
    outline: none;
  }

  .text__input._edited ~ .text__label,
  .text__input:focus:not([readonly]) ~ .text__label {
    top: 0;
    font-size: 13px;
    color: #888;
    &:after {
      visibility: visible;
      left: 0;
      width: 100%;
      background: #36c6d3;
    }
  }

  .text__input._error ~ .text__label:after,
  .text__input._error:focus:not([readonly]) ~ .text__label:after { background: #f36a5a }

  .text__input._error:focus:not([readonly]) ~ .text__msg { color: #f36a5a; opacity: 1 }

  .text__label {
    display: inline-block;
    position: absolute;
    font-size: 16px;
    top: 25px;
    transition: .2s ease all;
    color: #999;
    width: 100%;
    left: 0;
    bottom: 0;
    pointer-events: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      z-index: 5;
      bottom: 0;
      left: 50%;
      height: 2px;
      width: 0;
      visibility: hidden;
      transition: .2s ease all;
    }
  }

  .text__msg {
    display: block;
    position: absolute;
    margin: 2px 0 0;
    opacity: 0;
    font-size: 13px;
  }
</style>

<script>
  export default {
    name: 'default-text',
    props: {
      value: { default: 'default' },
      label: { type: String, default: '' },
      msg: { type: String, default: '' },
      validate: { type: Boolean, default: true }
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
