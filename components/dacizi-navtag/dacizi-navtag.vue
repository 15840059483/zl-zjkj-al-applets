<template>
	<view class="nav_tab">
		<view class="buttom_height"></view>
		<view class="tab_button">
			<view class="tab_item" v-for="(item,index) in tab_button" :data-current="index" @tap="switchTab(index)">
				<image :src="item_index == index ? item.light_icon : item.default_icon"></image>
				<view :class="item_index == index ? 'active_item': ''">{{item.itemText}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			current: { // 当前页面index
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				tab_button: [{
						itemText: "首页",
						default_icon: "/static/yiyuan.svg",
						light_icon: "/static/DJyiyuan.svg",
						path: "/pages/index/index"
					},
					{
						itemText: "我的",
						default_icon: "/static/wode.svg",
						light_icon: "/static/DJwode.svg",
						path: "/pages/mine/mine"
					},
				],
				item_index: this.current
			}
		},
		onShow() {

		},
		methods: {
			switchTab: function(index) {
				this.item_index = index
				uni.reLaunch({
					url: this.tab_button[index].path
				})
				this.$emit('click', index)
			},
		},

	}
</script>

<style lang="scss">
	.buttom_height {
		height: 100rpx;
	}

	.tab_button {
		width: 100%;
		position: fixed;
		z-index: 1;
		bottom: 0rpx;
		display: flex;
		height: 110rpx;
		text-align: center;
		background-color: #FFFFFF;
		box-shadow: 0rpx 4rpx 8rpx 0rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.tab_item {
			margin-top: 10rpx;
			width: 50%;
			font-size: 24rpx;
			color: #666666;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.active_item {
				color: #d81e06;
			}
		}
	}
</style>
