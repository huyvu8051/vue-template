// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

/* eslint-disable no-new */

const ipRegex = require('ip-regex')
var ipAddress = window.location.host
var match = ipAddress.match(ipRegex())

var baseUrl = window.location.protocol + '//' + match[0];

Vue.prototype.$baseurl = baseUrl

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
