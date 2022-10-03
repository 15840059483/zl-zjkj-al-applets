<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- 顶部导航栏 -->
		<!-- <view class="header" style="width: 100%;height: 140rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->

		<view class="wai">
			<view class="nei"></view>
			<view v-if="login===false" class="nei_1">
				<view @click="wechatLogin" class="touxiang" style="background-image: url(../../static/touxiang.svg);">

				</view>
				<view class="nicheng">
					<text @click="wechatLogin">Hi,您还未登录,点击登录</text>
				</view>
			</view>
			<view v-else-if="login===true" class="nei_1">
				<!-- 动态绑定背景图片 -->
				<view class="touxiang" :style="{ backgroundImage: `url(${userList.avatarUrl})` }">

				</view>
				<view class="nicheng" style="font-size: 22px;">
					<text>{{userList.nickName}}</text>
				</view>
			</view>
		</view>

		<view class="weixin-wai" v-if="login===true">
			<zg-button type="primary" @click="Logout" class="weixin" block>
				<text class="iconfont icon-weixin"></text>
				退出登录
			</zg-button>
		</view>

		<!-- 底部导航栏 -->
		<dacizinavtag :current=item_index></dacizinavtag>
	</view>
</template>

<script>
	// 引入顶部导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入底部导航栏组件
	import dacizinavtag from '../../components/dacizi-navtag/dacizi-navtag.vue'
	// 引入vuex辅助函数
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		// 注册使用导航栏组件
		components: {
		//  header,
			dacizinavtag
		},
		data() {
			return {
				title: "个人中心", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				item_index: 1, // 单页面id
			}
		},
		computed: {
			// 计算属性，辅助函数mapState与mapGetters必须在computed计算属性中定义，因为他们是属性
			// 括号内必须是数组
			...mapState(["login", "userList"]),
		},
		methods: {
			// 使用辅助函数，辅助函数mapMutations与mapActions必须在methods中定义，因为他们是方法
			// 括号内必须是数组
			...mapMutations(["Add_userList", "Add_login"]),

			// 退出登录的方法
			Logout() {
				let _this = this;
				uni.showModal({
					title: '友情提示',
					content: '您确定要退出登录吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.Add_login(false);
							_this.Add_userList('');
							// uniapp提示框
							// title内容标题
							// duration持续时间
							uni.showToast({
								title: '退出登录',
								duration: 2000
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 唤起获取微信用户信息的API方法
			wechatLogin() {
				let _this = this;
				// 获取用户信息
				// uni.getUserProfile 函数获取用户信息
				uni.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: res => {
						console.log(res);
						console.log(1);

						// 将res中的userInfo保存到Vuex中的用户信息中
						_this.Add_userList(res.userInfo);

						// 将Vuex中的用户登录状态修改为已登录
						_this.Add_login(true);

						// uniapp提示框
						// title内容标题
						// duration持续时间
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
					},
					// fail: res => {
					// 	console.log(2);
					// 	console.log(res)
					// 	//拒绝授权
					// 	uni.showToast({
					// 		title: '您拒绝了请求,不能正常使用小程序',
					// 		icon: 'error',
					// 		duration: 2000
					// 	});
					// 	return;
					// }
				});
			}
		}
	}
</script>

<style scoped>
	.wai {
		width: 100%;
		height: 350rpx;
		background-color: #409EFF;
	}

	.nei {
		width: 100%;
		height: 50rpx;
	}

	.nei_1 {
		width: 100%;
		height: 210rpx;
		margin-top: 35rpx;
		display: flex;
	}

	.touxiang {
		width: 180rpx;
		height: 180rpx;
		margin-left: 80rpx;
		background-color: #fff;
		border-radius: 100%;
		background-size: 100% 100%;
	}

	.nicheng {
		width: 65%;
		margin-left: 20rpx;
		height: 180rpx;
	}

	.nicheng>text {
		line-height: 170rpx;
	}

	.weixin-wai {
		width: 460rpx;
		margin: 0 auto;
	}

	.weixin>>>.zg-button--base.zg-button--block.data-v-28178a84 {
		margin-top: 50rpx;
		width: 460rpx;
		height: 20rpx;
		border-radius: 50rpx;
		background-color: #E6A23C;
		font-size: 18px;
	}
</style>
