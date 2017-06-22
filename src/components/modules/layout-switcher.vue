<template>
  <div :class="[ $style.switcher, $style[current] ]"> 
    <app-input type="button" @click="toggle('grid')" :class="$style.switcher__grid">
      <span :class="$style.grid__icon"></span>
    </app-input>
    <app-input type="button" @click="toggle('list')" :class="$style.switcher__list">
      <span :class="$style.list__icon"></span>
    </app-input>
  </div>
</template>

<style lang="scss" module>
  .switcher {
    float: right;
    text-align: right;
    padding: 5px 0;
    &.grid > .switcher__grid, 
    &.list > .switcher__list {
      background-color: #93a3b5;
      color: #f1f1f1;
    }
  }

  .switcher__list,
  .switcher__grid {
    background-color: transparent;
    color: #93a3b5;
    border-color: #93a3b5;
    transition: background-color .2s ease-in-out,
                color .2s ease-in-out;
    &:hover {
      background-color: #93a3b5;
      color: #f1f1f1;
      border-color: #93a3b5;
    }
  }

  .list__icon:before { content: "\e067"; font-family: "Icons"; }
  .grid__icon:before { content: "\e06a"; font-family: "Icons"; }

</style>
  
<script>
  import AppInput from './inputs.vue';
  export default {
    name: 'layout-switcher',
    components: { AppInput },
    props: ['value'],
    data() {
      return { current: this.value }
    },
    methods: {
      toggle(layout) {
        if ( this.current !== layout ) {
          this.current = layout;
          this.$emit( 'input', this.current );
        }
      }
    }
  }
</script>