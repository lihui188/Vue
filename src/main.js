import Vue from 'vue'




// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
    state:{
        shopcart:[]//将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的信息
    },
    mutations:{
        addToCar(state,payload){
            var flag = false;

            state.shopcart.some(item => {
                if(item.id === payload.id){
                    item.count += parseInt(payload.count);
                    flag = true;
                    return true
                }
            })

            if(!flag){
                state.shopcart.push(payload);
            }

            // 当更新shopcart后，把数组，存储到本地
            localStorage.setItem('car',JSON.stringify(state.shopcart))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量值
            state.shopcart.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // localStorage.setItem('car',JSON.stringify(state.shopcart))
        },
        removeFormCar(state,id){
            // 根据Id冲stroe中的购物车删除对应的那条商品数据
            state.shopcart.some((item,i)=>{
                if(item.id == id){
                    state.shopcart.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.shopcart))
        },
        updateGoodsSelected(state,info){
            state.shopcart.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.shopcart))
        }
    },
    getters:{
        getAllCounts(state){
            var c = 0;
            state.shopcart.forEach(item => {
                c+=item.count;
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.shopcart.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {};
            state.shopcart.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,
                amount:0
            }
            state.shopcart.forEach(item=>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

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
    router:router,
    store
})