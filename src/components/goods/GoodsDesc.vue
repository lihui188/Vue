<template>
    <div class="goodsdesc-container">
        <h3>{{obj.title}}</h3>
        <hr>
        <div class="content" v-html="obj.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            obj:{}
        }
    },
    created(){
        this.getAll();
    },
    methods:{
        getAll(){
            this.$http.get('/goods/getdesc/'+this.id).then( (res) => {
                if(res.data.status === 0){
                    this.obj = res.data.message[0];
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container{
    margin: 10px 5px 5px;
    padding-bottom: 60px;
    h3{
    text-align: center;

    }

}
</style>