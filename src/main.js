import Vue from 'vue'




// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import moment from 'moment'
// 定义全局时间格式过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
   return moment(dataStr).format(pattern)
})
// 导入router。js模块
import router from './router.js'
//导入vue-axios,使用vue-axios加载数据
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://www.liulongbin.top:3005/api"
axios.defaults.emulateJSON = true
// 导入 mint-ui 按需要求
/* import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
 */

 import MintUI from 'mint-ui'
 Vue.use(MintUI)
// 导入 mui

import './mui-master/css/mui.min.css'
import './mui-master/css/icons-extra.css'

import VuePreview from 'vue-preview';
Vue.use(VuePreview);


// 导入组件 app 
import app from './App.vue'






var vm = new Vue({
    el:"#app",
    render:c => c(app),
    router:router
})