<template>
  <div :class="$style.toolbar">
    <h1 :class="$style.toolbar__title">
      {{ title }}
      <span :class="$style.toolbar__sub">
        {{ sub }}
      </span>
    </h1>
    <div :class="$style.toolbar__actions">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
  
  @import "../../assets/style.scss";

  .toolbar {
    &:after { @include clearfix }
    @media (max-width: $bp-small) {
      .toolbar__sub { display: none }
    }
  }

  .toolbar__title {
    left: left;
    font-size: 24px;
    color: #666;
    margin: 0;
    padding: 0;
    letter-spacing: -1px;
    font-weight: 300;
  }

  .toolbar__sub {
    font-size: 14px;
    letter-spacing: 0;
    text-transform: lowercase;
    margin-left: 5px;
  }

  .toolbar__actions {
    float: right;
  }
</style>

<script>
  export default {
    name: 'toolbar',
    props: {
      title: { type: String, default: ''},
      sub: { type: String, default: '' }
    }
  }
</script>