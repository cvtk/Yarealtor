<template>
  <div :class="$style.select">
    <select :class="[ $style.select__input, local && $style._edited, !validate && $style._error ]" :id="id" v-model="local" @change="onChange">
      <option :class="$style.select__option" v-for="item in options" :value="item[valueField]" >{{ item[nameField] }}</option>
    </select>
    <label :class="$style.select__label">{{ label }}</label>
    <span :class="$style.select__msg">{{ msg }}</span>
  </div>
  
</template>

<style lang="scss" module>
  .select {
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 0 0 20px;
    padding-top: 20px;
  }

  .select__input {
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
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    cursor: pointer;
  }

  .select__input._edited ~ .select__label,
  .select__input:focus:not([readonly]) ~ .select__label {
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
  .select__input._error ~ .select__label:after,
  .select__input._error:focus:not([readonly]) ~ .select__label:after { background: #f36a5a }

  .select__input._error:focus:not([readonly]) ~ .select__msg { color: #f36a5a; opacity: 1 }

  .select__label {
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

  .select__msg {
    display: block;
    position: absolute;
    margin: 2px 0 0;
    opacity: 0;
    font-size: 13px;
  }
</style>

<script>
  export default {
    name: 'default-select',
    props: {
      value: { default: 'default' },
      label: { type: String, default: '' },
      msg: { type: String, default: '' },
      valueField: { type: String, default: 'value' },
      nameField: { type: String, default: 'name' },
      options: { default: '' },
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
        this.$emit('input', ( this.isInt(event.target.value) ) ? parseInt(event.target.value) : event.target.value );
      },
      isInt(value) { return !isNaN(parseFloat(value)) && isFinite(value) }
    }
  }
</script>
