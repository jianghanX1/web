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
window.addEventListener('beforeinstallprompt', (e) => {
  // 防止 Chrome 67 及更早版本自动显示安装提示
  e.preventDefault();
  console.log(e);
  // 稍后再触发此事件
  store.commit("changePWA",{deferredPrompt: e,deferredPromptType: true})
  setTimeout(()=>{
    store.state.deferredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome);
      if (choiceResult.outcome === 'dismissed') {
        console.log('用户取消了安装');
      }
      else {
        console.log('用户已安装程序');

        store.commit("changePWA",{deferredPrompt: store.state.deferredPrompt,deferredPromptType: false})
      }
    });
  })
});
Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
