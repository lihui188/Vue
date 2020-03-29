# 这是一个初学者的 low 作

## vue是一个好的组件框架，作为前端 love vue

### 行了，三行就够了，编不下去了

## 哈哈哈哈

## 用传统方式（命令行把修改的代码上传到 码云）
1. git add .
2. git commit -m "提交信息"
3. git push -u origin master


## 制作首页app 制作
1. 完成Header区域，使用的是Mint-UI 中的 Header组件
2. 底部的tabbar，使用的是MUI 的Tabbar.html
    + 在制作 购物车 小图标的时候，操作会相对多一些
    + 先把扩展图标的 css 样式导入，拷贝到项目的css文件夹中
    + 然后把 font 文件中的 拓展字体 .ttf文件 拷贝到项目的 fonts中
    + 为购物车小图标，添加以下样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
3. 要在 中间区域放置一个router-view来展示路由匹配到的组件



## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击tabbar中的路由链接，展示对应的路由组件


## 制作首页轮播图布局

## 加载首页轮播图数据

1.可以使用，vue.axios
2.使用vue-axios的this.$http.get获取数据
3.获取到的数据，要保存到data身上
4.使用v-for循环渲染每个item项


## 改造九宫格区域的样式
1.使用的是mui中的grid样式
2.设置背景颜色为白色，index.html中的body，和图标样式
3.将原本的图片样式删除，用图片来代替


## 改造我们的新闻资讯路由链接
1.a标签替换为router-link标签
2.建立newsList.vue组件
3.导入路由，进行注册


## 新闻资讯页面绘制

## 实现 新闻资讯列表 点击跳转到新闻详情
1.把列表中的每一项改造为router-link，同时，在跳转的时候应该唯一的Id标识符
2.创建一个新闻详情的组件页面 newInfo.vue
2.在路由模块中，将新闻详情的路由地址和组件页面对应起来


## 实现新闻信息页面


## 单独封装一个 comment.vue 评论子组件
1.县创建一个单独的 comment.vue 组件模板
2.先需要使用comment 组件的页面中 ，先手动导入comment组件
 +`import comment from './comment.vue'`
3.在组件中，使用 `components` 属性，将刚才导入 comment组件，注册为自己的子组件
4.将注册子组件的时候的，注册名称，一标签形式，在页面中引入即可


## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1.为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
1.点击加载更多，让pageindex ++ ，然后重新this.getComments()
3.为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的concat 方法，拼接上新数组