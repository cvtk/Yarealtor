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

<script>
  import Firebase from 'firebase';
  import firebase from '../../firebase.js';
  const ticketsRef = firebase.database().ref('tickets');

  export default {
    name: 'report',
    props: {
      link: { default: '' },
      body: { default: '' },
      author: { default: '' },
      targetUser: { default: '' },
      targetCompany: { default: '' },
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
        let key = ticketsRef.push().key;
        let prep = {
          key,
          created: Firebase.database.ServerValue.TIMESTAMP,
          link: this.localLink,
          message: this.localBody,
          author: this.author,
          answer: '',
          targetUser: this.targetUser,
          targetCompany: this.targetCompany,
          status: 1 
        };
        ticketsRef.child(key).update(prep)
          .then( () => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: 'Сообщение отправлено администратору',
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

<style lang="sass" module>

  .report
    position: relative

  .report__row
    position: relative
    margin-bottom: 20px

  .report__actions
    position: relative
    text-align: right

</style>