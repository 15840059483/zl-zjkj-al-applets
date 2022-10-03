<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="payment-amount">
				<div class="payment-amount-yuan">
					<div class="payment-amount-font">{{ hosptInfo.totCost }}</div>
					<div>缴 费 金 额</div>
				</div>
			</div>
			<div class="people-info-wrapper bg-white">
				<div class="people-item display-flex">
					<div>住院人</div>
					<div>{{ hosptInfo.name }}</div>
				</div>
				<div class="people-item display-flex">
					<div>费用总额</div>
					<div>{{ hosptInfo.totCost }}元</div>
				</div>
				<div class="people-item display-flex">
					<div>缴费状态</div>
					<div v-bind:class="classObject" @click="paymentType">
						<!-- {{(hosptInfo.freeCost>=0||hosptInfo.inState=='O') ? '已缴清' : '未缴清'}} -->
						{{
			            hosptInfo.freeCost > 0 || hosptInfo.inState === "O"
			              ? "未缴清"
			              : "已缴清"
			          }}
					  <text class="iconfont icon-xiajiantou" v-if="isShow"
					  	style="color: #b7b7b7;font-size: 22px;"></text>
					  <text class="iconfont icon-youjiantou" v-if="!isShow"
					  	style="color: #b7b7b7;font-size: 22px;"></text>
						<!-- <i v-if="isShow" class="el-icon-arrow-down"></i>
						<i v-if="!isShow" class="el-icon-arrow-up"></i> -->
					</div>
				</div>
				<div class="people-item display-flex" v-if="isShow">
					<div>已缴费用</div>
					<div class="green-font">{{ hosptInfo.prepayCost }}元</div>
				</div>
				<div class="people-item display-flex" v-if="isShow">
					<div>未缴金额</div>
					<div v-bind:class="classObject">
						{{
			            hosptInfo.freeCost >= 0 || hosptInfo.inState == "O"
			              ? hosptInfo.freeCost
			              : 0
			          }}元
					</div>
				</div>
			</div>
			<div v-for="item in hosptFeeList">
				<div class="amount-title display-flex" @click="amountTitleChange(item)">
					<div>{{ item.feetype }}</div>
					<div style="color: #008cfe">
						<text class="iconfont icon-xiajiantou" v-if="item.show"
							style="color: #b7b7b7;font-size: 22px;"></text>
						<text class="iconfont icon-youjiantou" v-if="!item.show"
							style="color: #b7b7b7;font-size: 22px;"></text>
						<!-- <i v-if="item.show" class="el-icon-arrow-down"></i>
						<i v-if="!item.show" class="el-icon-arrow-up"></i> -->
					</div>
				</div>
				<div v-if="item.show" class="bg-white">
					<div class="amount-item display-flex" v-for="(detail, index) in item.feeList">
						<div style="padding: 0 .3rem 0 .3rem;">
							{{ index + 1 }}、{{ detail.itemname + "*" + detail.itemnum }}
						</div>
						<div style="padding: 0 .3rem 0 .3rem;">￥{{ detail.totalfee }}元</div>
					</div>
				</div>
			</div>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss文件
	import "./inpatient-payment-details.scss";
	// 引入vuex辅助函数
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "缴费详情", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头


				hosptFeeList: [],
				hosptInfo: [],
				isShow: true,
				classObject: {

				},
				amountList: [{
						id: 1,
						name: "检查明细",
						isShow: true,
						details: [{
								name: "静脉注射（静脉采血）*",
								amount: "5.50"
							},
							{
								name: "一次性使用静脉采血针",
								amount: "0.61"
							},
							{
								name: "一次性使用真空采血管",
								amount: "1.13"
							},
							{
								name: "一次性使用真空采血管",
								amount: "1.13"
							},
						],
					},
					{
						id: 1,
						name: "检查治疗明细",
						isShow: true,
						details: [{
								name: "静脉注射（静脉采血）*",
								amount: "5.50"
							},
							{
								name: "一次性使用静脉采血针",
								amount: "0.61"
							},
							{
								name: "一次性使用真空采血管",
								amount: "1.13"
							},
							{
								name: "一次性使用真空采血管",
								amount: "1.13"
							},
						],
					},
				],
			}
		},
		methods: {
			paymentType() {
				this.isShow = !this.isShow;
			},
			amountTitleChange(item) {
				console.log(item);
				item.show = !item.show;
			},
		},
		// 在uniapp中如果要使用路由传参必须使用onload(路由传参中的参数值)
		onLoad(e) {
			// console.log(e);
			this.hosptFeeList = JSON.parse(e.hosptFeeList);
			this.hosptInfo = JSON.parse(e.hosptInfo);
			let classObject = {
				"green-font": JSON.parse(e.hosptInfo).freeCost >= 0 ||
					JSON.parse(e.hosptInfo).inState == "O" ?
					true : false,
				"red-font": JSON.parse(e.hosptInfo).freeCost < 0 ||
					JSON.parse(e.hosptInfo).inState == "I" ?
					true : false,
			};
			this.classObject = classObject
			console.log(this.hosptFeeList, this.hosptInfo, this.classObject)
		},
		mounted() {

		},
	};
</script>

<style scoped>
	/* .header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

	/* .zhuti {
		margin-top: 140rpx;
	} */
</style>
