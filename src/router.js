import VueRouter from 'vue-router'

// 导入对应的路由组件
import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import search from './components/tabbar/Search.vue'
import shopcar from './components/tabbar/Shopcar.vue'
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'
import photolist from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoInfo.vue'
import goodslist from './components/goods/GoodsList.vue'
import goodsinfo from './components/goods/GoodsInfo.vue'
import goodsdesc from './components/goods/GoodsDesc.vue'
import goodscomment from './components/goods/GoodsComment.vue'
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
        {path:'/home/photolist',component:photolist},
        {path:'/home/photolist/info/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'}

        
    ],
    linkActiveClass:'mui-active'
})

export default router