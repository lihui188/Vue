<template>
  <div class="newsinfo_container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
      <span>点击次数:{{newsinfo.click}}</span>
    </p>
    <hr />

    <div class="content" v-html="newsinfo.content"></div>


    <!-- 评论子组件 -->
    <comment-box :cmt="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      // 将id挂载到iddata中方便调用
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("/getnew/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.newsinfo = res.data.message[0];
        } else {
          Toast("获取信息失败！！");
        }
      });
    }
  },
  components:{
      'commentBox':comment
  }
};
</script>
<style lang="scss" scoped>
.newsinfo_container {
  padding: 0 5px;
  padding-bottom: 50.4px;

  .title {
    color: red;
    font-size: 16px;
    text-align: center;
    margin: 6px 0;
  }
  .subtitle {
    color: #266eff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    padding: 0 4px;
  }
}
</style>