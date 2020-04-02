<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id===0 ? 'mui-active' :'']"
            v-for="item in cates"
            :key="item.id"
            @click="getAllImages(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photolist/info/'+item.id">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../mui-master/js/mui.js";

export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getAllImages(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认0.0005
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("/getimgcategory").then(res => {
        if (res.data.status === 0) {
          res.data.message.unshift({ title: "全部", id: 0 });
          this.cates = res.data.message;
        }
      });
    },
    getAllImages(cateId) {
      this.$http.get("/getimages/" + cateId).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-slider {
  touch-action: none;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow:0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align:middle;
    }
    .info{
      color:white;
      text-align: left;
      position: absolute;
      bottom: 0;
      max-height: 80px;
      margin: 0 5px 5px;
      background-color: rgba($color: #000000, $alpha: 0.3);
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 13px;
      }
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
</style>