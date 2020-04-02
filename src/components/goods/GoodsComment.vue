<template>
    <div class="con">
        <cmt :cmt="this.$route.params.id"></cmt>
    </div>
</template>

<script>
import cmt from '../subcomponents/comment.vue'
export default {
    data(){
        return {

        }
    },
    components:{
        cmt
    }
    
}
</script>

<style lang="scss" scoped>
.con{
    padding-bottom: 60px;
}
</style>