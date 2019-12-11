import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/assets/style/index.css'
import '@/lib/rem'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

//
