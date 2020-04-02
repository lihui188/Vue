<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要bb的内容：（最多BB120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in commentList" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content==="undefined" ? '此用户很懒' :item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      commentList: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("/getcomments/" + this.cmt + "?pageindex=" + this.pageindex)
        .then(res => {
          if (res.data.status == 0) {
            this.commentList = this.commentList.concat(res.data.message);
          } else {
            Toast("获取评论信息失败");
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getComments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空");
      }
      // 发表评论
      // 参数一：请求的URL地址
      // 参数3：提交给服务器的数据对象{ content ：this.msg }
      // 参数三：定义提交时的表单中的数据的格式（emulateJSON:true）
      this.$http
        .post("/postcomment/" + this.cmt, { content: this.msg.trim() })
        .then(res => {
          if (res.data.status === 0) {
            //   1.拼接处一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: new Date().getTime(),
              content: this.msg.trim()
            };
            this.commentList.unshift(cmt)
            this.msg = '';
          }
        });
    }
  },
  props: ["cmt"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 13px;
  }
  textarea {
    font-size: 13px;
    height: 100px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>