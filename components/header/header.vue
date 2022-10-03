<template>
	<view name="header">
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<image v-if="shouye==='yes'" class="logo" src="/static/logo.png" mode="scaleToFill"></image>
				<i v-else-if="shouye==='no'" @click="onBack" class="iconfont icon-fanhuijiantou"></i>
				<view class="title">{{title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'header',
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
			};
		},
		props: {
			title: String, // 标题文字
			shouye: String, // 是否是首页，不是首页显示返回上一层箭头
		},
		//第一次加载时调用
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
		methods: {
			// 左侧返回按钮调用
			onBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.navBarBox{
		background-color: #409EFF;
		width: 100%;
		position: fixed;
		z-index: 999;
		top: 0rpx;
		
	}
	.navBarBox .navBar {
		padding: 3rpx 50rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
		margin-top: 8px;
	}

	.title {
		width: 85%;
		height: 1.3rem;
		line-height: 1.3rem;
		text-align: center;
		color: white;
		font-size: 24px;
	}

	.navBarBox .navBar .logo {
		width: 52rpx;
		height: 52rpx;
		line-height: 1rem;
		margin-right: 10rpx;
	}
	.navBar{
		height: 60rpx;
	}
</style>
