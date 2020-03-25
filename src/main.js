import Vue from 'vue'
import './router.js'



// 导入 mint-ui 按需要求
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)


// 导入 mui
import './mui-master/dist/css/mui.min.css'



// 导入组件 app 
import app from './App.vue'


var vm = new Vue({
    el:"#app",
    render:c => c(app)
})