<template>
  <div :class="$style.number">
    <input type="text" :class="[ $style.number__input, local && $style._edited ]" :id="id" v-model="local" @keydown="onKeyDown" @change="onChange">
    <label :class="$style.number__label">{{ label }}</label>
    <span :class="$style.number__msg">{{ msg }}</span>
  </div>
  
</template>

<style lang="scss" module>
  .number {
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 0 0 20px;
    padding-top: 20px;
  }

  .number__input {
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

  .number__input._edited ~ .number__label,
  .number__input:focus:not([readonly]) ~ .number__label {
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

  .number__input:focus ~ .number__msg { color: #36c6d3; opacity: 1 }

  .number__label {
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

  .number__msg {
    display: block;
    position: absolute;
    margin: 2px 0 0;
    opacity: 0;
    font-size: 13px;
  }
</style>

<script>
  export default {
    name: 'default-number',
    props: {
      value: { default: 'default' },
      label: { type: String, default: '' },
      msg: { type: String, default: '' },
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
      },
      onKeyDown(e) {
        if ( ( [46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ) ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40) ) {
          return true;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      }
    }
  }
</script>
