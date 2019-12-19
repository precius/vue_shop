// 导入vue
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// 通过vue.use()挂载所导入的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
