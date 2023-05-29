import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import { Button, Select, Input, Message, Form, FormItem } from 'element-ui'

Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false

// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  loading:'' // 懒加载默认图片
})


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
// 监听横屏竖屏切换
window.addEventListener('orientationchange', function() {
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    setTimeout(()=>{
      //fontsize计算
      document.documentElement.style.fontSize = document.documentElement.clientWidth/320 * 16 +'px'
    },100)
  }
});

// 修改title
Vue.directive('title', {
  // 单个修改标题
  update: function (el) {
    console.log(el.dataset.title);
    if (el.dataset.title) {
      setTimeout(()=>{
        document.title = el.dataset.title
      })
    } else {
      setTimeout(()=>{
        document.title = 'AH5 GAMES'
      })
    }
  }
})

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
