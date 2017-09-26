<template>
  <div :class="$style.city">
    <div :class="$style.text">
      <input type="text" :class="[ $style.text__input, local && $style._edited ]" :id="id" v-model="local" 
        @input="onInput"
        @blur="onBlur"
        @keyup="onKeyup">
      <label :class="$style.text__label">{{ label }}</label>
      <span :class="$style.text__msg">{{ msg }}</span>
    </div>
    <img :class="$style.city__loader" src="./assets/spin.svg" v-if="!dataReady">
    <div :class="$style.city__autocomplete_menu" v-show="showMenu === true">
      <autocomplete-menu ref="autocompleteMenu"
        @select = "onObjectSelect"
        @loadingStateChange = "onLoadingStateChange"
        :query="query"
        contentType="city"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .city {
    display: inline-block;
    position: relative;
    font-size: 0;
    width: 100%;
    }

  .city__loader {
    position: absolute;
    top: 24px;
    right: 0px;
    width: 26px;
    height: 26px;
    z-index: 6;
  }

  .city__autocomplete_menu {
    position: absolute;
    top: 54px;
    outline: none;
    z-index: 6;
    width: 100%;
  }

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

  .text__input:focus ~ .text__msg { color: #36c6d3; opacity: 1 }

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
  import Vue from 'vue';
  import AutocompleteMenu from './autocomplete-menu.vue';

  export default {
    name: 'city-field',
    components: { AutocompleteMenu },
    props: [ 'label', 'value', 'msg' ],
    data() {
      return {
        local: this.value,
        id: Math.random().toString(36).substring(7),
        query: '',
        dataReady: true,
        showMenu: false
      }
    },
    methods: {
      onKeyup(event) {
        if ( event.keyCode === 40 ) {
          this.$refs.autocompleteMenu.onKeyup('down');
        }
        else if ( event.keyCode === 38 ) {
          this.$refs.autocompleteMenu.onKeyup('up');
        }
        else if ( event.keyCode === 13 ) {
          this.$refs.autocompleteMenu.onKeyup('enter');
        }
        else if ( event.keyCode === 27 ) { this.onBlur() }
      },

      onInput(event) {
        if ( !!this.local.trim() ) {
          this.query = this.local;
        }
        this.$emit('input', this.local);
      },

      onBlur() { setTimeout(()=> { this.showMenu = false }, 150) },

      onLoadingStateChange(state) {
        if ( state ) { this.dataReady = true; this.showMenu = true }
        else this.dataReady = false;
      },

      onObjectSelect(object) {
        this.showMenu = false;
        this.local = object.name;
        this.$emit('input', this.local);
        this.$emit('citySelect', object.id);
      }
    }
  }
</script>