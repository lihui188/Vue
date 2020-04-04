<template>
  <div class="shop-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, index) in shoplist" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">现价：￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,index)">删除{{$store.getters.getGoodsCount[item.id]}}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计：</p>
            <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
          </div>
        <mt-button type="danger">去结算</mt-button>

        </div>
      </div>
    </div>
   <p> {{$store.getters.getGoodsSelected}}</p>
  </div>
</template>


<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
        shoplist:[]
    };
  },
  created(){
      this.getGoodsList();
  },
  methods: {
      getGoodsList(){
          var list = [];
          
          this.$store.state.shopcart.forEach(item => list.push(item.id))
          if(list.length<=0){
              return;
          }
          this.$http.get('/goods/getshopcarlist/'+list.join(",")).then(res => {
              if(res.data.status === 0){
                  this.shoplist = res.data.message;
              }
          })
      },
      remove(id,index){
        // 点击删除，把商品从store中根据传递的Id删除，同时
        this.shoplist.splice(index,1)
        this.$store.commit('removeFormCar',id)
      },
      selectedChanged(id,val){
        console.log(id +'----' +val)
        this.$store.commit('updateGoodsSelected',{id,selected:val})
      }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shop-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 80px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan{
    display:flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color:red;
    }
  }
}
</style>