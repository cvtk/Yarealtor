<template>
  <div :class="$style.company">
    <div :class="$style.company__bar">
      <ul :class="$style.bar__breadcrumbs">
        <router-link :to="{ name: 'companies' }" tag="li" :class="$style.breadcrumbs__item">
          Компании
        </router-link><span :class="$style.breadcrumbs__icon"></span>
        <li :class="$style.breadcrumbs__item"> {{ company.name }}</li>
      </ul>
    </div>
    <div :class="$style.company__toolbar">
      <h1 :class="$style.toolbar__title">{{ company.name }}<span :class="$style._small">{{ company.slogan }}</span></h1>
      <div :class="$style.toolbar__actions"></div>
    </div>
    <div :class="$style.company__banner" :style="{ 'background-image': 'url(' + company.image + ')' }">
      <h2 :class="$style.banner__name">{{ company.name }}</h2>
      <h3 :class="$style.banner__slogan">{{ company.slogan }}</h3>
    </div>
    
    <div :class="$style.company_wrapper">
      <div :class="$style.company__about_us">
        <h4 :class="$style.about_us__header"><span :class="$style.header__icon"></span> О Компании</h4>
        <p :class="$style.about_us__description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
      </div>
      <div :class="$style.company__employees">
        <h4 :class="$style.employees__header"><span :class="$style.header__icon"></span> Сотрудники</h4>
        <div :class="$style.employees_wrapper">
          <div :class="$style.employees__item" v-for="employe in employees">
            <div :class="$style.photo_wrapper">
              <img :class="$style.item__photo" :src="employe.photo">
            </div>
            <router-link :to="{ name: 'user', params: { page: employe.page } }" :class="$style.item__name">{{ employe.name }}</router-link>
            <span :class="$style.item__position">{{ employe.position }}</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style lang="scss" module>
  @import "../assets/style.scss";

  .company {
    position: relative;
    height: 100%;
    padding: 20px;
  }

  .company__banner {
    height: 500px;
    background-position: center;
    margin: 0 -20px;
    overflow: hidden;

    .banner__name {
      color: #fff;
      font-size: 55px;
      font-weight: 600;
      text-align: center;
      margin-top: 130px;
      margin-bottom: 10px;
      text-shadow: 1px 1px 0 rgba(0,0,0,.2);
    }

    .banner__slogan {
      color: #fff;
      text-align: center;
      font-size: 22px;
      font-weight: 400;
      margin-top: 30px;
      margin-bottom: 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  .company_wrapper {
    position: relative;
    overflow: hidden;
    margin: 0 -10px;
    &:after { @include clearfix }
  }

  .company__about_us {
    float: left;
    width: 50%;
    padding: 0 10px;

    .about_us__header {
      background-color: #d9534f;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      padding: 1em 20px;
      margin: 0;
      line-height: 1.1;
      letter-spacing: .25px;
    }
    
    .header__icon {
      display: inline-block;
      line-height: 14px;
      -webkit-font-smoothing: antialiased;
      font-size: 24px;
      &:after {
        content: "\e08b";
        font-family: "Icons";
      }
    }

    .about_us__description {
      padding: 20px;
      margin: 0;
      color: #808a94;
      background-color: #fff;
    }
  }

  .company__employees {
    float: left;
    width: 50%;
    padding: 0 10px;
    background-color: #fff;

    .employees__header {
      background-color: #3598dc;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      padding: 1em 20px;
      margin: 0;
      line-height: 1.1;
      letter-spacing: .25px;
    }

    .header__icon {
      display: inline-block;
      line-height: 14px;
      -webkit-font-smoothing: antialiased;
      font-size: 24px;
      &:after {
        content: "\e001";
        font-family: "Icons";
      }
    }

    .employees_wrapper {
      position: relative;
      padding: 20px;
      margin: 0;
      &:after { @include clearfix }
    }

    .employees__item {
      position: relative;
      float: left;
      padding: 0 10px;
      width: 33.333333%;
      margin-bottom: 15px;
    }

    .item__photo {
      display: block;
      max-width: 100px;
      border: 4px solid #f5f6fa;
      border-radius: 50%;
      margin: 0 auto;
    }

    .photo_wrapper {
      padding: 5px 15px;
    }

    .item__name {
      display: block;
      font-weight: 400;
      color: #578ebe;
      text-decoration: none;
      transition: color .2s ease-in-out;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover { text-decoration: underline; color: #23527c; }
    }

    .item__position {
      display: block;
      color: #95A5A6;
      line-height: 1.25;
      text-align: center;
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .company__toolbar {
    margin: 25px 0;

    .toolbar__title {
      font-size: 24px;
      color: #666;
      margin: 0;
      padding: 0;
      letter-spacing: -1px;
      font-weight: 300;
      > ._small {
        font-size: 14px;
        letter-spacing: 0;
        text-transform: lowercase;
        margin-left: 5px;
      }
    }
  }

  .company__bar {
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin: -20px -20px 0;
    &:after { @include clearfix }

    .bar__breadcrumbs {
      padding: 11px 0;
      display: inline-block;
      float: left;
      margin: 0;
      list-style: none;
    }

    .breadcrumbs__item {
      display: inline-block;
      color: #888;
      cursor: pointer;
      line-height: 14px;
      &:last-child {
        cursor: default;
      }
    }

    .breadcrumbs__icon {
      color: #888;
      cursor: default;
      line-height: 14px;
      &:after {
        content: "\e606";
        display: inline-block;
        font-family: "Icons";
        cursor: default;
        font-size: 7px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
  }
    
  /* responsive */
    .company {
      @media (max-width: $bp-extra-large) {
        .employees__item { width: 25% }
      }
      @media (max-width: $bp-large) {
        .employees__item { width: 33.333333% }
      }
      @media (max-width: $bp-medium) {

      }
      @media (max-width: $bp-small) {
        .employees__item { width: 50% }
      }
      @media (max-width: $bp-extra-small) {

      }
  }
</style>

<script>
  import AppLoader from './app-loader.vue';
  import AppInput from './modules/inputs.vue';
  import firebase from '../firebase.js';

  const companyRef = firebase.database().ref('companies');

  export default {
    name: 'company',
    props: ['auth'],
    components: { AppLoader, AppInput },
    data() {
      return {
        dataReady: false,
        company: {},
        employees: [
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Владимирович Иванов',
            page: 'ivanov',
            photo: '/static/users/default-1.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-2.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-3.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-4.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-5.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-6.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-1.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-2.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-3.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-4.svg',
            position: 'Специалист'
          },
          {
            key: 'asdasdq2341r4eqwrfthd',
            name: 'Сергей Иванов',
            page: 'ivanov',
            photo: '/static/users/default-5.svg',
            position: 'Специалист'
          }
        ]
      }
    },
    created() {
      companyRef.orderByChild('page').equalTo(this.$route.params.page).on('value', (company) => {
        if ( company.exists() ) { company.forEach(item => this.company = item.val()) }
        else {
          this.$router.push({ name: '404', query: { redirect: this.$route.params.page } });
        }
        this.dataReady = true
      })
    },
  }
</script>