// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import store from './store'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import i18n from './i18n'
import App from './App'
import ObigoUI from 'obigo-js-ui-rnbs'
import 'obigo-js-webapi/vehicle/vehicle'
import VueCarousel from 'vue-carousel'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import Home from './components/Home'
import EVCList from './components/EVCList'
import EVCSearch from './components/EVCSearch'
import MyEVC from './components/MyEVC'
import Report from './components/Report'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(ObigoUI)
Vue.use(Router)
Vue.i18n.set(i18n.locale.en)
Vue.i18n.add(i18n.locale.en, i18n.translations.en)
Vue.i18n.add(i18n.locale.kr, i18n.translations.kr)
Vue.use(VueCarousel)
Vue.prototype.$http = axios

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/list',
    component: EVCList
  },
  {
    path: '/search',
    component: EVCSearch
  },
  {
    path: '/favorite',
    component: MyEVC
  },
  {
    path: '/report',
    component: Report
  }
]

const router = new Router({
  routes
})

FastClick.attach(document.body)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
