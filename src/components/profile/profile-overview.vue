<template>
  <div :class="$style.overview">
    <div :class="$style.overview__bar">
      <div :class="$style.bar">
        <h2 :class="$style.bar__title">Профиль</h2>
      </div>
    </div>
    <div :class="$style.overview__main">
      <div :class="$style.main">
        <div :class="$style.main__about">{{ local.about || 'Информация о себе пока не внесена пользователем' }}</div>
        <div :class="$style.main__position" v-if="local.position">{{ local.position }}</div>
        <div :class="$style.main__contacts">
          <div :class="$style.contacts">
            <span :class="$style.contacts__item" v-if="local.phone"><span :class="$style.contacts__icon_phone"></span> {{ local.phone }}</span>
            <span :class="$style.contacts__item" v-if="local.mobile"><span :class="$style.contacts__icon_mobile"></span> {{ local.mobile }}</span>
            <span :class="$style.contacts__item" v-if="local.email"><span :class="$style.contacts__icon_email"></span> {{ local.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  .overview { position: relative }
  .overview__bar { margin-bottom: 10px }
  .bar {
    min-height: 48px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }
  .bar__title {
    color: #578ebe;
    padding: 12px 0;
    float: left;
    display: inline-block;
    font-size: 15px;
    line-height: 18px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: .25px;
  }

  .overview__main { position: relative }
  .main { position: relative }
  .main__about { margin-bottom: 10px }
  .main__position {
    color: #169ef4;
    margin-bottom: 10px;
  }
  .main__contacts { position: relative }
  .contacts { position: relative }
  .contacts__item {
    display: inline-block;
    color: #6b6b6b;
    margin-right: 10px;
    &:last-child { margin-right: 0 }
  }
  .contacts__icon_phone,
  .contacts__icon_mobile,
  .contacts__icon_email  {
    display: inline-block;
    font-size: 14px;
    &:before {
      content: "\E048";
      font-family: "Icons";
      color: #b5c1c9;
    }
  }
  .contacts__icon_mobile:before { content: "\E048" }
  .contacts__icon_email:before { content: "\E048" }
</style>

<script>

  export default {
    name: 'profile-overview',

    props: {
      profile: { type: Object, default: {} }
    },

    data() {
      return {
        local: this.profile,
      }
    },
    watch: {
      profile() {
        this.local = this.profile
      }
    }
  }
</script>
