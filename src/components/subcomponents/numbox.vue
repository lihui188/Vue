<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">--</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="getselect" ref="num"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
    </div>
</template>
<script>

import mui from '../../mui-master/js/mui.js'
export default {
    data(){
		return {

		}
	},
	mounted(){
		// 初始化数字选择框组件
		mui(".mui-numbox").numbox();
	},
	methods:{
		getselect(){
			console.log(this.$refs.num.value)
			this.$emit('getselectCount',parseInt(this.$refs.num.value));
		}
	},
	props:['max'],
	watch:{
		max:function(newVal,oldVal){
			mui(".mui-numbox").numbox().setOption("max",newVal)
		}
	}
}
</script>
<style lang="scss" scoped>

</style>