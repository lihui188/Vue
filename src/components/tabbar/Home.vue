<template>
  <div>
    <lunbo :lunboList="lunbotuList" :isfull="true"></lunbo>
    <!-- 九宫格 到 六宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu1.png" alt />
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
            <img src="../../images/menu2.png" alt />

            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="../../images/menu3.png" alt />

            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu4.png" alt />

            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu5.png" alt />

            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu6.png" alt />
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { Toast } from "mint-ui";
import lunbo from '../subcomponents/lunbo.vue'
export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getImgList();
  },
  methods: {
    getImgList() {
      this.$http
        .get("/getlunbo")
        .then(res => {
          // console.log(res);
          if (res.data.status === 0) {
            this.lunbotuList = res.data.message;
            this.lunbotuList[1].img = "http://www.itcast.cn/subject/webzly/images/2.jpg"

          } else {
            Toast("获取信息失败...");
          }
        });
    }
  },
  components:{
    "lunbo":lunbo
  }
};
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  margin: 0;
  padding: 0;
  background-color: white;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  margin: 0;
  padding: 11px 15px;
  vertical-align: top;
  border: none;
}
</style>