<template>
    <div class="goods-list">
        

        <div class="goods-item" v-for="item in goodslist" :key="item.i" @click="goDetail(item.id)">
            <img :src="item.img_url" alt=""/>
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" plain @click="getMore" size="large">加载更多</mt-button>
       

    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageindex:1,
            goodslist:[]
        }
    },
    created(){
        this.getGoods();
    },
    methods:{
        getGoods(){
            this.$http.get('/getgoods?pageindex'+this.pageindex).then((res)=>{
                if(res.data.status === 0){
                    this.goodslist = this.goodslist.concat(res.data.message);
                }else{
                    Toast('获取商品信息失败！')
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoods();
        },
        goDetail(id){
            // console.log(this);
            this.$router.push({name:"goodsinfo",params:{id}});
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding:7px;
    justify-content: space-between;
    padding-bottom: 60px;

    .goods-item{
        width: 49%;
        border:1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin:4px 0;
        padding:2px;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
    
    img{
        width: 100%;
    }
    .title{
        font-size: 14px;
    }
    .info{
        background-color:#eee;
        p{
            margin:0;
            padding:5px;
        }
        .price{
            .now{
                color:red;
                font-weight: bold;
                font-size: 16px;
            }
            .old{
                text-decoration: line-through;
                font-size: 12px;
                margin-left: 10px;
            }
        }
        .sell{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    }
    }
}
</style>