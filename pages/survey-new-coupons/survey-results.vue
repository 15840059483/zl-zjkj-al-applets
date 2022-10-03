<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "调查问卷", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
			}
		},
		methods: {
	
		},
		mounted() {
			
		},
	};
</script>

<style scoped>
/* 	.header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

/* 	.zhuti {
		margin-top: 170rpx;
	} */
</style>
