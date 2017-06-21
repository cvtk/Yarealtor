<template>
  <div :class="$style.layout_switcher"> 
    <app-input type="button" @click.native="toggle('grid')"
      :class="[ $style.layout_switcher__grid, $style[current]]">
      <span :class="$style.grid__icon"></span>
    </app-input>
    <app-input type="button" @click.native="toggle('list')"
      :class="[ $style.layout_switcher__list, $style[current] ]">
      <span :class="$style.list__icon"></span>
    </app-input>
  </div>
</template>

<style lang="scss" module>
  .layout_switcher {
    float: right;
    text-align: right;
    padding: 5px 0;
  }

  .layout_switcher__list, .layout_switcher__grid {
    background-color: transparent;
    color: #93a3b5;
    border-color: #93a3b5;
    transition: all .2s ease-in-out;
    &:hover {
      background-color: #93a3b5;
      color: #f1f1f1;
      border-color: #93a3b5;
    }
  }

  .layout_switcher__list.list, .layout_switcher__grid.grid {
    background-color: #93a3b5;
    color: #f1f1f1;
    border-color: #93a3b5;        
  }

  .layout_switcher__list > .list__icon:before { content: "\e067"; font-family: "Icons"; }
  .layout_switcher__grid > .grid__icon:before { content: "\e06a"; font-family: "Icons"; }

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