<template>
  <span :class="$style.status_online" v-if="online" title="В сети"></span>
  <span :class="$style.status_offline" v-else title="Не в сети"></span>
</template>

<style lang="scss" module>
  .status_online, .status_offline {
    display: inline-block;
    padding: 5px;
    margin: 0 3px;
    border-radius: 100%;
  }
  .status_online { background-color: #36c6d3 }
  .status_offline { background-color: #ed6b75 }
</style>

<script>
  export default {
    name: 'app-online-status',
    props: ['online']
  }
</script>