<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="payment-ma-wrapper bg-white text-center">
				<view class="payment-ma-ping" style="text-align: center;">就诊凭条（凭以下凭条进行就诊）</view>
				<image style="width: 100%;height: 240rpx;margin-top:10px;background-color: red;"
					:src="baseUrl + '/hospt/getBarCode?body=' + dfltPatientInfo.cardNumber" class="doctor8-ma-img" />
				<view class="payment-ma-num">{{ dfltPatientInfo.cardNumber }}</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	import base from "../../request/base";
	import '../register-success/register-success.scss'
	import '../payment-details/payment-details.scss'
	export default {
		// 注册使用导航栏组件
		components: {
			// header,
		},
		data() {
			return {
				title: "就诊码", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				dfltPatientInfo: {},
				baseUrl: base.sq,
			}
		},
		methods: {
			getDfltPtCardInfo() {
				// let loadingInstance = Loading.service({});
				this.$api.patientService.getDfltPtCardInfo()
					.then((data) => {
						this.dfltPatientInfo = data.data || null;
						// loadingInstance.close();
					})
					.catch(() => {
						// loadingInstance.close();
					})
			}
		},
		mounted() {
			this.getDfltPtCardInfo()
		}
	}
</script>

<style scoped>
	/* .header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

/* 	.zhuti {
		margin-top: 150rpx;
	} */
</style>
