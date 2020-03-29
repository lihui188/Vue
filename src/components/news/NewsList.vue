<template>
  <div id="con_newsList">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发布时间：{{item.add_time | dateFormat}}</span>
              <span>点击次数:{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      newsList:[]
    };
  },
  created(){
      this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http
        .get("/getnewslist")
        .then((res) => {
            if(res.data.status === 0){
              this.newsList = res.data.message;
            }else{
              Toast('获取信息失败！')
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
#con_newsList{
  padding-bottom: 50.4px;
}
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>