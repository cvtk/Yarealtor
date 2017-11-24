<template>
  <div :class="$style.tickets">
    <div :class="$style.tickets__bar">
      <breadcrumbs :items="[ { text: 'Главная', to: 'root'}, { text: 'Обращения', to: '' } ]"/>
    </div>
    <div :class="$style.tickets__toolbar">
      <div :class="$style.toolbar__header">
        <toolbar title="Обращения" sub="тикеты пользователей"></toolbar>
      </div>
      <div :class="$style.toolbar__settings"></div>
    </div>
    
    <div :class="$style.tickets__content">
      <div :class="$style.content" v-if="isAdmin">
        <ui-tabs type="text">
          <ui-tab icon="book" title="Актуальные" @select="toggleRef">
            <div :class="$style.content__list">
              <ul :class="$style.list" v-if="dataReady">
                <yasr-ticket v-for="ticket in tickets"
                  :ticket="ticket"
                  :key="ticket.key"
                ></yasr-ticket>
                <span :class="$style.list__empty" v-if="ticketsIsEmpty">Нет открытых обращений</span>
              </ul>
              <ui-progress-linear color="primary" v-else></ui-progress-linear>
            </div>
          </ui-tab>
          <ui-tab icon="person" title="Закрытые" @select="toggleRef">
            <div :class="$style.content__list">
              <ul :class="$style.list" v-if="dataReady">
                <yasr-ticket v-for="ticket in tickets"
                  :ticket="ticket"
                  :key="ticket.key"
                ></yasr-ticket>
                <span :class="$style.list__empty" v-if="ticketsIsEmpty">Закрытых обращений не найдено</span>
              </ul>
              <ui-progress-linear color="primary" v-else></ui-progress-linear>
            </div>
          </ui-tab>
        </ui-tabs>
      </div>
      <div :class="$style.content" v-else>У Вас нет доступа к этой странице</div>
    </div>
  </div>
</template>

<script>
  import firebase from '../firebase.js';
  import YasrTicket from './tickets/ticket.vue';
  const ticketsRef = firebase.database().ref('tickets');
  const companiesRef = firebase.database().ref('companies');
  const usersRef = firebase.database().ref('users');

  export default {
    name: 'tickets',
    props: ['auth', 'user'],
    components: { YasrTicket },
    data() {
      return {
        dataReady: false,
        tickets: [],
        currentStatus: 0,
        ref: ''
      }
    },
    computed: {
      ticketsIsEmpty() { return this.tickets === null || !this.tickets.length },
      isAdmin() { return this.user.role === 1 }
    },
    methods: {
      ticketsValue(snapshot) {
        if ( !snapshot.exists() ) {
          this.tickets = [];
          this.dataReady = true; return
        }

        let t = snapshot.val();
        this.tickets = Object.keys(t).map( key => t[key] ).sort( (a, b) => b.created - a.created );
        this.dataReady = true;
      },
      updateRef() {
        this.dataReady = false;
        this.ref.off('value', this.ticketsValue);
        this.ref = ticketsRef.orderByChild('status').equalTo(this.currentStatus);
        this.ref.on('value', this.ticketsValue);
      },
      toggleRef() {
        this.currentStatus = ( !!this.currentStatus )? 0: 1;
        this.updateRef();
      }
    },
    created() {
      this.ref = ticketsRef.orderByChild('status').equalTo(1);
      this.ref.on('value', this.ticketsValue);
    },
    destroyed() {
      this.ref.off('value', this.ticketsValue);
    }
  }
</script>

<style lang="sass" module>
  @import "../assets/style.scss";

  .tickets
    position: relative
    height: 100%
    padding: 20px

  .tickets__content
    position: relative

  .content
    position: relative
    margin: 20px 0
    &:after
      @include clearfix

  .tickets__toolbar
    margin: 25px 0
    &:after
      @include clearfix

  .toolbar__header
    float: left

  .toolbar__settings
    float: right

  .tickets__bar
    border-bottom: 1px solid #e7ecf1
    background-color: #fff
    position: relative
    padding: 0 20px
    margin: -20px -20px 0
    &:after
      @include clearfix

  .content__list
    position: relative

  .list
    position: relative
    list-style: none
    margin: 0
    padding: 0
    background-color: #fff
    min-height: 400px
</style>