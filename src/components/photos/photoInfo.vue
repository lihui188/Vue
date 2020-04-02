<template>
    <div id="info-container">
        <h3>{{info.title}}</h3>
        <p class="subtitle">
            <span>发布时间:{{info.add_time | dateFormat}}</span>
            <span>点击次数：{{info.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>




        <div class="content" v-html="info.content"></div>



        <com-box :cmt="id"></com-box>
    </div>
</template>

<script>
import com from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            info:{},
            list:[]
        }
    },
    created(){
        this.getInfo();   
        this.getImageInfo();   
    },
    methods: {
        getInfo(){
            this.$http.get('/getimageInfo/'+this.id).then((res)=>{
                console.log(res)
                if(res.data.status === 0){
                    this.info = res.data.message[0]
                }
            })
        },
        getImageInfo(){
            this.$http.get('/getthumimages/'+this.id).then((res)=>{
                if(res.data.status === 0){
                    res.data.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                    });
                    this.list = res.data.message
                }
            })
        }
    },
    components:{
        'comBox':com
    }
}
</script>

<style lang="scss" scoped>
#info-container{
    padding: 3px;
    padding-bottom:60px;
    h3{
        color: red;
        text-align: center;
        font-size: 16px;
        margin: 15px;
    }
    .subtitle{
        padding:0 6px;
        display: flex;
        color: #233eff;
        font-size: 13px;
        justify-content: space-between;
    }
    .content{
        font-size:13px;
        line-height:30px;
    }
    .thumbs{
        img{
            margin:10px;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>