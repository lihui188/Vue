<template>
  <div class="goods-info">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <lunbo :lunboList="lunbo" :isfull="false"></lunbo>
        </div>
      </div>
    </div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox :max="goodsinfo.stock_quantity" @getselectCount="getCount"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车时候，拿到选择的数量 -->
            <!-- 1.经过分析发现：按钮属于goodsinfo页面，数字属于 numberbox组件 -->
            <!-- 2.由于涉及到父子组件的嵌套，所以无法直接在goodsinfo页面中获取到选中的商品数量值 -->
            <!-- 3.怎么解决这个问题： 子组件向父组件传值（事件调用机制）-->
            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="goDesc(goodsinfo.id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="goComm(goodsinfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import lunbo from "../subcomponents/lunbo.vue";
import numbox from "../subcomponents/numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbo: [],
      goodsinfo: {},
      ballflag: false,
      selectedCount:1 
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      this.$http.get("/getthumimages/" + this.id).then(
        res => {
          if (res.data.status === 0) {
            res.data.message.forEach(item => {
              item.img = item.src;
            });
            this.lunbo = res.data.message;
          }
        },
        err => {
          console.log(err.message);
        }
      );
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("/goods/getinfo/" + this.id).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.goodsinfo = res.data.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComm(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToCar() {
      this.ballflag = !this.ballflag;
      var goodsinfo={
        id:this.id,
        count:this.selectedCount,
        price:this.goodsinfo.sell_price,
        selected:true
      }

      this.$store.commit('addToCar',goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    // 小球优化思路
    // 1.先分析导致动画，不追却的本质原因：我们把小球最终为一道的位置，已经距现在了某以分辨率下的滚动条为滚动的情况下
    // 2.只要分辨路和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了；
    // 3.因此，我们经过分析，的到结论：不能把位置的横纵左边直接写死了，而是应该根据不同的情况，动态计算这个坐标值
    // 4.经过分析，的出解题思路，先得到为标的横纵坐标，在得到晓求得很纵坐标，然后让y值求差，x值也求差，得到的结果，就是很纵坐标要唯一的距离
    // 如何获取微标和小球的位置？？？ domObject.getBoundingRect();
    enter(el, done) {
      el.offsetWidth;

      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document.getElementById("badge").getBoundingClientRect();
      const x = badgePosition.left - ballPosition.left;
      const y = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballflag = !this.ballflag;
    },
    getCount(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中的值传递给子组件
      this.selectedCount = count;
    }
  },
  components: {
    lunbo,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goods-info {
  background-color: #eee;
  overflow: auto;
  padding-bottom: 60px;
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    position: absolute;
    top: 410px;
    left: 78px;
  }
}
.mui-card-footer {
  display: block;
  button {
    margin: 15px 0;
  }
}
</style>