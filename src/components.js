import Vue from 'vue';

import AppAdSidebar from './components/ads/ad-sidebar.vue';
Vue.component('app-ad-sidebar', AppAdSidebar);

import AppAdBanner from './components/ads/ad-banner.vue';
Vue.component('app-ad-banner', AppAdBanner);

import AppLoader from './components/app-loader.vue';
Vue.component('app-loader', AppLoader);

import Toolbar from './components/page-blocks/toolbar.vue';
Vue.component('toolbar', Toolbar);

import Breadcrumbs from './components/page-blocks/breadcrumbs.vue';
Vue.component('breadcrumbs', Breadcrumbs);

import OffersFilter from './components/offers/object-filter.vue';
Vue.component('offers-filter', OffersFilter);