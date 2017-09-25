<template>
  <div :class="$style.steps">
    <div :class="$style.steps__item">
      <div :class="[ $style.item, local === 1 && $style._active ]" @click="onSelect(1)">
        <div :class="$style.item__number">1</div>
        <div :class="$style.item__title">Общие</div>
        <div :class="$style.item__content">Тип предложения и описание</div>
      </div>
    </div>
    <div :class="$style.steps__item">
      <div :class="[ $style.item, $style._color_red, local === 2 && $style._active ]" @click="onSelect(2)">
        <div :class="$style.item__number">2</div>
        <div :class="$style.item__title">Детали</div>
        <div :class="$style.item__content">Подробная информация</div>
      </div>
    </div>
    <div :class="$style.steps__item">
      <div :class="[ $style.item, $style._color_green, local === 3 && $style._active ]" @click="onSelect(3)">
        <div :class="$style.item__number">3</div>
        <div :class="$style.item__title">Финиш</div>
        <div :class="$style.item__content">Проверка данных</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";

  .steps {
    position: relative;
    background-color: #2f353b;
    overflow: hidden;
    min-width: 225px;
    &:after { @include clearfix }
    @media (max-width: $bp-medium) {
      .item__title, .item__content { display: none }
    }
  }
  
  .steps__item {
    position: relative;
    min-width: 75px;
    margin: 0 auto;
    width: 33.333333%;
    float: left;
  }

  .item {
    &:after { @include clearfix }
    position: relative;
    padding: 20px 15px;
    cursor: pointer;
    transition: background-color .2s ease-in-out;
    &._color_red > .item__number,
    &._color_red > .item__title,
    &._color_red > .item__content { color: #E7505A; border-color: #E7505A; }
    &._color_green > .item__number,
    &._color_green > .item__title,
    &._color_green > .item__content { color: #26C281; border-color: #26C281; }
    &:hover, &._active { background-color: #364150; &:after { border-left-color: #364150 } }
  }

  .item__number {
    font-size: 26px;
    color: #e5e5e5;
    border-radius: 50%!important;
    float: left;
    margin: auto;
    padding: 3px 14px;
    border: 1px solid #e5e5e5;
  }

  .item__title {
    font-size: 24px;
    color: #e5e5e5;
    font-weight: 100;
    margin-left: 60px;
    margin-top: -4px;
    text-transform: uppercase;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item__content {
    font-weight: 300;
    margin-left: 60px;
    margin-top: -5px;
    color: #95A5A6;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<script>
  export default {
    name: 'steps-controls',
    props: {
      current: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        local: this.current
      }
    },
    methods: {
      onSelect(num) {
        this.local = num;
        this.$emit( 'input', this.local );
      }
    }
  }
</script>