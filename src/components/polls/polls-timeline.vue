<template>
  <div :class="$style.timeline_post" v-if="dataReady">
    <div :class="$style.timeline_post_wrapper">

      <div :class="[$style.dropdown_wrapper, dropdownToggled || $style.__hidden]" @mouseleave="dropdownToggled = false">
        <ul :class="$style.timeline_post__dropdown">
          <li :class="$style.dropdown__item" v-if="isOwner" @click="removePoll">
            <span :class="$style.item__title">Удалить</span>
          </li>
          <li :class="$style.dropdown__item" @click="focusCommentField">
            <span :class="$style.item__title">Комментировать</span>
          </li>
          <li :class="$style.dropdown__item" v-if="!isOwner">
            <span :class="$style.item__title">Пожаловаться</span>
          </li>
        </ul>
      </div>

      <div :class="$style.timeline_post__userpic">
        <img :src="author.photo.small" :class="$style.userpic__image">
      </div>

      <div :class="$style.timeline_post__body">
        <div :class="$style.body__header">
          <div :class="$style.header__meta">
            <router-link :class="$style.meta__author"
              :to="{ name: 'user', params: { page: author.page } }">{{ author.name }} {{ author.surname }}</router-link>
            <span :class="$style.meta__date">{{ poll.created | unixToDate }}</span>
          </div>
          <div :class="$style.header__menu" @click="dropdownToggled = !dropdownToggled">
            <span :class="$style.menu__icon"></span>
          </div>
        </div>
        <div :class="$style.body__content">{{ poll.question }}</div>
        <div :class="$style.content">
          <div :class="$style.content__results" v-if="voted">
            <div :class="$style.result" v-for="(item, index) in poll.items" :key="index + '_result'">
              <div :class="$style.result__title">{{ item.text }} (Голосов: {{ voters[index] }})</div>
              <div :class="$style.result__progress">
                <div :class="$style.progress" :style="{ 'width': + progress[index] +'%' }">{{ progress[index] }} %</div>
              </div>
            </div>
          </div>
          <div :class="$style.content__answers" v-else>
            <div :class="$style.answer" v-for="(item, index) in poll.items" :key="index + '_answer'" @click.once="vote(index)">
              <default-radio :label="item.text" name="answers" :option="index" />
            </div>
          </div>
        </div>
        
      </div>

      <div :class="$style.timeline_post__comments">
        <div :class="$style.comments__roll_down" v-if="commentsCount > 1" @click="rollDown = !rollDown">Показать все комментарии ({{ commentsCount }})</div>
          <polls-comment
            @onAnswerLeave="leaveAnswer"
            @onCommentRemove="removeComment"
            :comment="comment" 
            :key="comment.key"
            :user="user"
            v-show="isLastComment(index) || rollDown"
            v-for="(comment, key, index) in comments">    
          </polls-comment>
        <div :class="$style.comments__publish">
          <textarea rows="1" :class="$style.publish__input" :placeholder="'Ваш ответ для ' + commentTo" v-model="newComment.message"
            @keyup="fieldAutoResize" @keydown.enter.prevent="leaveComment" @keydown.enter.ctrl="newLineCommentField" ref="commentField">
          </textarea>
          <div :class="$style.publish__button" @click="leaveComment"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>

<style lang="scss" module>
  @import "../../assets/style.scss";

  .content { position: relative }
  .content__answers { margin: 10px 0 }
  .answer { margin: 10px 0 }

  .content__results {
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .result { margin: 10px 0 }

  .result__title {
    color: #5C9BD1;
    margin-bottom: 4px;
  }

  .result__progress {
    position: relative;
    width: 100%;
    border: 1px solid #67b7dc;
    margin-bottom: 8px;
    &:after { @include clearfix }
  }

  .progress {
    position: relative;
    float: right;
    text-align: right;
    min-width: 40px !important;
    padding: 5px 10px;
    color: #fff;
    background-color: #67b7dc;
    user-select: none;
    white-space:nowrap;
  }

  .timeline_post {
    position: relative;
    margin-top: 20px;
    &:last-child { margin-bottom: 20px }
    &:after { @include clearfix }
    .timeline_post_wrapper { /* */ }

    .dropdown_wrapper {
      opacity: 1;
      visibility: visible;
      position: absolute;
      padding: 25px;
      right: -10px;
      top: 10px;
      z-index: 1;
      transition: visibility .2s ease-in-out, opacity .2s ease-in-out, top .2s ease-in-out;
      &.__hidden { visibility: hidden; opacity: 0; top: 55px; }
    }

    .timeline_post__dropdown {
      position: relative;
      text-align: left;
      width: 155px;
      background-color: #fff;
      margin: 0;
      padding: 0;
      list-style: none;
      line-height: 0;
      border: 1px solid #c2cad8;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
      &:after {
        position: absolute;
        top: -6px;
        right: 7px;
        display: block;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
        border-left: 6px solid transparent;
        content: '';
      }
      &:before {
        position: absolute;
        top: -8px;
        right: 6px;
        display: block;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #c2cad8;
        border-left: 7px solid transparent;
        content: '';
      }

      .dropdown__item {
        color: #555;
        cursor: pointer;
        padding: 8px 16px;
        line-height: 18px;
        transition: background-color .1s ease-in-out;
        &:hover { background-color: #f6f6f6 }
      }
    }

    .timeline_post__userpic {
      position: relative;
      float: left;
      width: 80px;
      height: 80px;

      .userpic__image {
        width: 100%;
        height: 100%;
        border: 4px solid #f5f6fa;
        border-radius: 50%;
      }
    }

    .timeline_post__body {
      position: relative;
      padding: 10px 15px;
      margin-left: 110px;
      background-color: #f5f6fa;
      &:before {
        content: "";
        position: absolute;
        top: 30px;
        left: -14px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 14px 14px 14px 0;
        border-color: transparent #f5f6fa transparent transparent;
      }
      .body__header {
        margin-bottom: 10px;
        overflow: hidden;
        &:after { @include clearfix }
      }
      .header__meta {
        float: left;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
      }
      .header__menu {
        position: relative;
        float: right;
        width: 10%;
        text-align: right;
      }
      
      .menu__icon {
        display: inline-block;
        cursor: pointer;
        padding: 0 5px;
        line-height: 22px;
        &:after {
          content: "\e603";
          font-family: "Icons";
          font-size: 18px;
          color: lighten(#364150, 25%);
          vertical-align: middle;
          transition: color .2s ease-in-out;
        }
        &:hover:after { color: lighten(#364150, 5%) }
      }
      .meta__author {
        font-size: 16px;
        font-weight: 400;
        color: #578ebe;
        text-decoration: none;
        transition: color .2s ease-in-out;
        &:hover {
          text-decoration: underline;
          color: #23527c;
        }
      }
      .meta__date {
        margin-left: 10px;
        color: #95A5A6;
      }
      .body__content {
        margin-bottom: 5px;
        color: #777;
      }
    }

    .timeline_post__comments {
      position: relative;
      margin-left: 110px;
      background-color: #fff;
      padding: 0 15px;
      border: 1px solid lighten(#b4bcc8, 15%);

      .comments__roll_down {
        padding: 10px;
        margin: 0 -16px;
        color: #f1f1f1;
        text-align: center;
        background-color: #b4bcc8;
        cursor: pointer;
        transition: background-color .2s ease-in-out;
        &:hover {
          background-color: #3e4b5c;
        }
      }

      .comments__publish {
        position: relative;
        margin: -1px -16px 0;
        line-height: 0;
        &:after { @include clearfix }
      }
      .publish__input {
        display: block;
        width: 100%;
        outline: none;
        padding: 12px 10px;
        padding-right: 40px;
        color: #364150;
        border: 1px solid #c2cad8;
        min-height: 42px;
        max-height: 100px;
        &::-webkit-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        &::-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        &:-ms-input-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        &:-moz-placeholder { color: #93a3b5; font-family: "Roboto", sans-serif; font-weight: 300; font-style: italic; }
        resize: none;
        transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
        overflow: hidden;
        &:focus {
          border-color: #93a1bb;
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(147,161,187,.6);
        }
      }

      .publish__button {
        position: absolute;
        right: 1px;
        top: 1px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        &:after {
          display: inline-block;
          width: 40px;
          height: 40px;
          content: "\e02c";
          font-family: "Icons";
          color: lighten(#3e4b5c, 15%);
          font-size: 20px;
          transition: color .2s ease-in-out
        }
        &:hover:after { color: #3e4b5c }
      }
    }
  }
</style>

<script>
  import AppLoader from '../app-loader.vue';
  import AppFilters from '../helpers/filters.js';
  import Firebase from 'firebase';
  import firebase from '../../firebase.js';
  import DefaultRadio from '../default-inputs/default-radio.vue';
  import PollsComment from './polls-comment.vue';

  const usersRef = firebase.database().ref('users');
  const commentsRef = firebase.database().ref('comments');
  const pollsRef = firebase.database().ref('polls');

  export default {
    name: 'polls-timeline',
    props: ['poll', 'user'],
    components: { AppLoader, DefaultRadio, PollsComment },
    filters: AppFilters,
    methods: {
      isUserVoted() {
        return this.poll.items.some( answer => {
          if ( typeof answer.voters !== 'undefined' ) {
            for ( let vote in answer.voters ) {
              if (answer.voters.hasOwnProperty(vote)) {
                console.log(answer.voters[vote], '===', this.user.key)
                return answer.voters[vote] === this.user.key;
              }
            }
          }
        })
      },
      vote(answer) {
        console.log('click!')
        pollsRef.child(this.poll.key).child('items').child(answer).child('voters').push(this.user.key)
          .then( () => this.voted = true)
          .catch( error => console.log('vote error: ', error));
      },
      leaveAnswer(comment) {
        this.commentTo = comment.author.name;
        this.newComment.to = comment.author.key;
        this.focusCommentField();
      },
      removeComment(key) {
        commentsRef.child(key).remove();
      },
      newLineCommentField(event) {
        let field = event.target,
            value = field.value;
        field.value = value + '\n';
      },
      focusCommentField() {
        this.dropdownToggled = false;
        this.$refs.commentField.focus();
      },
      removePoll() {
        this.dropdownToggled = false;
        pollsRef.child(this.poll.key).remove()
          .then( () => console.log('Poll Removed'))
          .catch( error => console.log('Poll remove error: ', error) );
      },
      leaveComment() {
        this.dropdownToggled = false;
        if ( this.newComment.message ) {
          this.newComment.created = Firebase.database.ServerValue.TIMESTAMP;
          this.newComment.key = commentsRef.push().key;
          commentsRef.child(this.newComment.key).update(this.newComment);
          this.newComment.message = '';
          this.commentTo = this.author.name;
          this.newComment.to = this.author.key;
        }
      },
      isLastComment(index) {
        return this.commentsCount === index + 1;
      },
      fieldAutoResize(event) {
        let field = event.target;
        field.style.height = "5px";
        field.style.height = (field.scrollHeight)+"px";
      }
    },
    computed: {
      voters() {
        return this.poll.items.map( item => {
          if ( typeof item.voters === 'undefined' ) return 0;
          else {
            let count = 0;
            for ( let vote in item.voters ) {
              if (item.voters.hasOwnProperty(vote)) { ++count }
            }
            return count;
          }
        });
      },
      progress() {
        let sum = this.voters.reduce( (r, e) => r += e);
        return this.voters.map( e => Math.round(e * 100 / sum) );
      },
      isOwner() {
        return this.author.key === this.user.key;
      },
      dataReady() {
        return this.authorReady && this.commentsReady;
      },
      commentsCount() {
        let length = 0;
        for ( let key in this.comments ) {
          if ( this.comments.hasOwnProperty(key) ) {
              ++length;
          }
        }
        return length;
      },
    },
    data() {
      return {
        currentRef: null,
        voted: false,
        rollDown: false,
        dropdownToggled: false,
        authorReady: false,
        commentsReady: false,
        comments: {},
        author: {},
        commentTo: '',
        newComment: {
          parent: this.poll.key,
          author: this.user.key,
          to: ''
        }
      }
    },
    created() {
      console.log('created');
      this.voted = this.isUserVoted();

      usersRef.child(this.poll.author).once('value', author => {
        if ( author.exists() ) {
          this.author = author.val();
          this.newComment.to = this.author.key;
          this.commentTo = this.author.name;
          this.authorReady = true;
        }
      });

      commentsRef.orderByChild('parent').equalTo(this.poll.key).on('value', comments => {
        let tmpComments = {};
        if ( comments.exists() ) {
          tmpComments = comments.val();
          comments.forEach(comment => {
            usersRef.child(comment.child('author').val()).once('value', author => tmpComments[comment.key].author = author.val());
            usersRef.child(comment.child('to').val()).once('value', to => tmpComments[comment.key].to = to.val());
          })
        }
        this.comments = tmpComments;
        this.commentsReady = true;
      })
      commentsRef.orderByChild('parent').equalTo(this.poll.key).on('child_removed', comment => this.$delete(this.comments, comment.key))
    }
  }
</script>