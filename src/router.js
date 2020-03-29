import VueRouter from 'vue-router'

// 导入对应的路由组件
import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import search from './components/tabbar/Search.vue'
import shopcar from './components/tabbar/Shopcar.vue'
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'
//创建一个陆游对象
const router = new VueRouter({
    routes: [
        // account goodlist
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/search',component:search},
        {path:'/shopcar',component:shopcar},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo},

        
    ],
    linkActiveClass:'mui-active'
})

export default router