import Vue from 'vue'




// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)



// 导入router。js模块
import router from './router.js'
//导入vue-axios,使用vue-axios加载数据
import axios from 'axios'
Vue.prototype.$http = axios

// 导入 mint-ui 按需要求
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)


// 导入 mui
import './mui-master/css/mui.min.css'
import './mui-master/css/icons-extra.css'


// 导入组件 app 
import app from './App.vue'






var vm = new Vue({
    el:"#app",
    render:c => c(app),
    router:router
})