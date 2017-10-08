<template>
  <div :class="$style.report">
    <div :class="$style.report__row">
      <ui-textbox floatingLabel
        v-model="localLink"
        :readonly="!!link"
        :invalid="!link"
        label="Ссылка на некорректный ресурс"
      ></ui-textbox>
    </div>
    <div :class="$style.report__row">
      <ui-textbox floatingLabel
        @keydown.ctrl.enter="send"
        v-model="localBody"
        :readonly="!!body"
        :invalid="!localBody"
        label="Опишите суть проблемы"
        :rows=5
        :multiLine="true"
      ></ui-textbox>
    </div>
    <div :class="$style.report__actions">
      <ui-button
        :color="!isDone && 'red' || 'primary'"
        @click="send"
      >Отправить</ui-button>
    </div>
  </div>
</template>

<style land="scss" module>
  .report {
    position: relative;
  }

  .report__row {
    position: relative;
    margin-bottom: 20px;
  }

  .report__actions {
    position: relative;
    text-align: right;
  }

</style>

<script>

  import firebase from '../../firebase.js';
  const ticketsRef = firebase.database().ref('tickets');

  export default {
    name: 'report',
    props: {
      link: { default: '' },
      body: { default: '' },
      author: { default: '' }
    },
    data() {
      return {
        localLink: this.link,
        localBody: this.body
      }
    },
    methods: {
      send() {
        if ( !this.isDone ) return;
        let prep = { link: this.localLink, message: this.localBody, author: this.author }
        ticketsRef.push(prep)
          .then( () => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: 'Жалоба отправлена администратору',
            });
            this.localBody = '';
            this.$emit('close');
          })
          .catch( error => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: `Ошибка сети: ${error.message}`,
            });
          })
      }
    },
    computed: {
      isDone() { return !!this.localLink.trim() && !!this.localBody.trim() && !!this.author }
    }
  }
</script>