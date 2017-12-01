<template>
  <li :class="$style.ticket">
    <div v-if="dataReady" :class="$style.ticket__item">
      <div :class="$style.item">
        <div :class="$style.item__head">
          <div :class="$style.head">
            <div 
              :style="{ 'background-image': 'url(' + author.photo + ')' }"
              :class="$style.head__pic"
            ></div>
            <div :class="$style.head__meta">
              <div :class="$style.meta">
                <router-link
                  :to="{ name: 'user', params: { page: author.page } }"
                  :class="$style.meta__name"
                >{{ author.name }} {{ author.surname }}</router-link>
                <router-link
                  :to="{ name: 'company', params: { page: company.page } }"
                  :class="$style.meta__company"
                >{{ company.name }}</router-link>
              </div>
            </div>
            <div :class="$style.head__created">{{ ticket.created | unixToDate }}</div>
            <div :class="$style.head__actions">
              <div :class="$style.actions">
                <ui-icon-button
                  v-if="!ticket.status"
                  color="primary"
                  tooltip="Открыть заново"
                  tooltipPosition="bottom right"
                  icon="settings_backup_restore"
                  size="small"
                  @click="reloadTicket"
                ></ui-icon-button>
                <ui-icon-button
                  v-if="!!ticket.status"
                  color="primary"
                  tooltip="Закрыть обращение"
                  tooltipPosition="bottom right"
                  icon="star"
                  size="small"
                  @click="closeTicket"
                ></ui-icon-button>
                <ui-icon-button
                  v-if="!!ticket.targetUser && !!ticket.status && false"
                  color="orange"
                  tooltip="Предупреждение пользователю"
                  tooltipPosition="bottom right"
                  icon="person"
                  size="small"
                ></ui-icon-button>
                <ui-icon-button
                  v-if="!!ticket.targetCompany && !!ticket.status"
                  color="red"
                  :tooltip="'Предупреждение компании: ' + targetCompany.name"
                  tooltipPosition="bottom right"
                  icon="people"
                  size="small"
                  @click="punishCompany"
                ></ui-icon-button>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.body">
          <div :class="$style.body__message">{{ ticket.message }}</div>
          <router-link
            v-if="!!ticket.link"
            :class="$style.body__link"
            :to="{ path: ticket.link }"
          >Ссылка на материал с нарушениями</router-link>
        </div>
      </div>
    </div>
    <ui-progress-circular color="primary" v-else></ui-progress-circular> 
  </li>
</template>

<script>
  import firebase from '../../firebase.js';
  import AppFilters from '../helpers/filters.js';
  const ticketsRef = firebase.database().ref('tickets');
  const companiesRef = firebase.database().ref('companies');
  const usersRef = firebase.database().ref('users');
  export default {
    name: 'ticket',
    props: ['ticket'],
    filters: AppFilters,
    data() {
      return {
        author: {},
        company: {},
        targetUser: {},
        targetCompany: {},
        dataReady: false
      }
    },
    methods: {
      authorCallback(author) { this.author = author.val() },
      companyCallback(company) { this.company = company.val() },
      targetUserCallback(targetUser) { this.targetUser = targetUser.val() },
      targetCompanyCallback(targetCompany) { this.targetCompany = targetCompany.val() },
      err(message) { console.log(message) },
      punishCompany() {
        let c = this.company;
        c.punish += 1;
        companiesRef.child(c.key).update(c)
          .then( () => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: 'Компании ' + this.company.name + ' добавлено предупреждение'
            });
          })
          .catch( error => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: `Ошибка сети: ${error.message}`,
            });
          })
        this.closeTicket();
      },
      closeTicket() {
        this.ticket.status = 0;
        ticketsRef.child(this.ticket.key).update(this.ticket)
          .then( () => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: 'Обращение закрыто',
            });
          })
          .catch( error => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: `Ошибка сети: ${error.message}`,
            });
          })
      },
      reloadTicket() {
        this.ticket.status = 1;
        ticketsRef.child(this.ticket.key).update(this.ticket)
          .then( () => {
            this.$root.$children[0].$refs.notify.createSnackbar({
              message: 'Обращение возвращено в работу',
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
    created() {
      let t = this.ticket;

      usersRef.child(t.author).once('value', this.authorCallback)
        .then( () => companiesRef.child(this.author.company).once( 'value', this.companyCallback ))
        .then( () => usersRef.child(t.targetUser).once('value', this.targetUserCallback) )
        .then( () => companiesRef.child(t.targetCompany).once('value', this.targetCompanyCallback) )
        .then( () => { this.dataReady = true })
        .catch( this.err )
      
    },
    destroyed() {
      usersRef.child(this.ticket.author).off('value', this.userValue);
    }
  }
</script>

<style lang="sass" module>
  @import "../../assets/style.scss";

  .ticket
    display: block
    position: relative

  .ticket__item
    position: relative

  .item
    padding: 15px
    border-bottom: 1px solid #F1F4F7

  .item__head
    margin-bottom: 5px

  .head
    position: relative

  .head__pic
    display: inline-block
    height: 35px
    width: 35px
    border-radius: 50%
    margin-right: 5px
    vertical-align: middle
    background-repeat: no-repeat
    background-position: center center
    background-size: cover

  .head__meta
    display: inline-block
    height: 35px
    margin-right: 5px
    vertical-align: middle

  .meta
    position: relative

  .meta__name
    display: block
    color: #5a7391
    font-weight: 400
    text-decoration: none
    &:hover
      text-decoration: underline

  .meta__company
    display: block
    font-weight: 300
    color: #65A0D0
    text-decoration: none
    &:hover
      text-decoration: underline
  
  .head__created
    display: inline-block
    vertical-align: top
    color: #C0C9CC

  .head__actions
    display: inline-block
    float: right
    height: 35px
    vertical-align: top

  .actions
    position: relative

  .body
    position: relative

  .body__message
    color: #96a5aa;

  .body__link
    color: #65A0D0
    font-weight: 400
    text-decoration: none
    &:hover
      text-decoration: underline
</style>