import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 直接导入plugins/element.js
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入面包屑导航
import Bread from './components/bread.vue'
// 导入树形表格插件
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios请求拦截
axios.interceptors.request.use(config => {
  console.log(config)
  // 为请求头对象 添加token验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 其它的组件中，是无法使用 axios 命令的。但如果给Vue函数添加一个原型属性$http 指向axios
// 将 axios 改写为 Vue 的原型属性 直接用this.$http就能执行axios 方法了
Vue.prototype.$http = axios
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.component('Bread', Bread)

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function(val) {
  const dt = new Date(val)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
