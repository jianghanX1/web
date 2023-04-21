import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import { Button, Select, Input, Message } from 'element-ui'

Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
