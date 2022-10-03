<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="record-wrapper">
				<uni-card>
					<div class="patient-wrapper bg-white" v-if="showBox">

						<div v-if="!patientInfo.name">
							<div class="patient-wrapper-button" @click="openAddPatient">
								使用，请添写住院人
							</div>
						</div>
					</div>

					<div v-if="showHospInfo" class="bg-white record-item" style="padding: 0;"
						v-for="item in hospInfoList">
						<div class="record-item-item">
							<div>住院人</div>
							<div>{{ item.name }}[{{ item.inpatientNo }}]</div>
						</div>
						<div class="record-item-item">
							<div>科室</div>
							<div>{{ item.deptName }}</div>
						</div>
						<div class="record-item-item">
							<div>入院时间</div>
							<div>{{ item.inDate }}</div>
						</div>
						<div class="record-item-item">
							<div>押金总额</div>
							<div>{{ item.prepayCost }}</div>
						</div>
						<div class="record-item-item">
							<div>费用总额</div>
							<div>{{ item.totCost }}</div>
						</div>
						<div class="record-item-item">
							<div>欠费</div>
							<div>
								{{ item.freeCost >= 0 || item.inState == "O" ? item.freeCost : 0 }}
							</div>
						</div>
						<div class="record-item-item record-detail-item" @click="goToDetail(item)">
							<div>点击查看详情</div>
							<div><text class="iconfont icon-youjiantou"></text></div>
						</div>
					</div>
				</uni-card>
			</div>

			<div v-if="showAddPatient" class="add-patient-bg">
				<div class="add-patient-container bg-white">
					<view class="add-patient-title" style="display: flex;">
						<view style="width: 80%;">住院人信息</view>
						<view style="width: 20%;text-align: right;" class="text-right">
							<!-- <i class="el-icon-close" @click="showAddPatient = false"></i> -->
							<text class="iconfont icon-guanbi" @click="showAddPatient = false"></text>
						</view>
					</view>
					<view class="add-patient-input">
						<view style="width: 25%;">姓名</view>
						<view style="width: 75%;">
							<uni-easyinput type="text" v-model="patient.name" placeholder="请输入姓名">
							</uni-easyinput>
							<!-- <input placeholder="请输入姓名" v-model="patient.name"></input> -->
						</view>
					</view>
					<view class="add-patient-input">
						<view style="width: 25%;">住院号</view>
						<view style="width: 75%;">
							<uni-easyinput type="number" v-model="patient.admissionNumber" placeholder="请输入住院号">
							</uni-easyinput>
							<!-- <input type="number" placeholder="请输入住院号" v-model="patient.admissionNumber"></input> -->
						</view>
					</view>
					<div class="confirm-btn">
						<button @click="confirmBinding" :style="{
              background:
                patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',
            }">
							确认绑定
						</button>
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
	import "./hospitalization-payment-records.scss";
	// 引入vuex辅助函数
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "缴费记录", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				patientInfo: {},
				patient: {
					name: "",
					admissionNumber: undefined
				},
				hospInfoList: [{
					name: "123",
					deptName: "123"
				}],
				showAddPatient: false,
				showBox: true,
				showHospInfo: false,
				recordsList: [{
					id: 1,
					zyr: "程淑琴",
					num: "0000328021",
					ks: "内一病区",
					rysj: "2019-06-16",
					yjze: "1550.00",
					fyze: "5285.02",
					qf: "3735.05",
				}, ],
			}
		},
		methods: {
			goToDetail(item) {
				// let loadingInstance = Loading.service({});
				// const params = {
				//   inpatientNo: this.hospInfoList[0].inpatientNo,
				//   inDate: this.hospInfoList[0].inDate,
				// };
				// this.$api.outpatientDepartmentService
				//   .getHosptFeeList(params)
				//   .then((data) => {
				//     loadingInstance.close();
				let hosptFeeList = [{
						id: 1,
						feetype: "医疗器具明细",
						show: true,
						isShow: true,
						feeList: [{
								itemname: "静脉注射（静脉采血）*",
								itemnum: "6",
								totalfee: "32.22",
							},
							{
								itemname: "一次性使用真空采血针",
								itemnum: "3",
								totalfee: "3.61",
							},
							{
								itemname: "一次性使用真空采血管",
								itemnum: "3",
								totalfee: "7.13",
							},
							{
								itemname: "静脉输液*",
								itemnum: "32",
								totalfee: "52.35"
							},
							{
								itemname: "一次性使用注射器及针头",
								itemnum: "15",
								totalfee: "28.13",
							},
							{
								itemname: "一次性使用输液器",
								itemnum: "15",
								totalfee: "15.65"
							},
							{
								itemname: "一次性使用静脉留置针",
								itemnum: "2",
								totalfee: "8.57",
							},
						],
					},
					{
						id: 2,
						feetype: "检查治疗明细",
						show: true,
						isShow: true,
						feeList: [{
								itemname: "阑尾切除手术*",
								itemnum: "3",
								totalfee: "8,851.18"
							},
							{
								itemname: "全身麻醉",
								itemnum: "1",
								totalfee: "1071.23"
							},
							{
								itemname: "阑尾切除",
								itemnum: "1",
								totalfee: "7569.81"
							},
							{
								itemname: "手术用具",
								itemnum: "1",
								totalfee: "210.14"
							},
						],
					},
					{
						id: 3,
						feetype: "医疗药品明细",
						show: true,
						isShow: true,
						feeList: [{
								itemname: "静脉输液*",
								itemnum: "120",
								totalfee: "2,471.94"
							},
							{
								itemname: "头孢呋辛",
								itemnum: "15",
								totalfee: "230.48"
							},
							{
								itemname: "哌拉西林钠他唑巴坦",
								itemnum: "15",
								totalfee: "298.58",
							},
							{
								itemname: "甲硝唑",
								itemnum: "15",
								totalfee: "316.43"
							},
							{
								itemname: "奥硝唑",
								itemnum: "15",
								totalfee: "390.53"
							},
							{
								itemname: "复方氨基酸",
								itemnum: "15",
								totalfee: "288.63"
							},
							{
								itemname: "脂肪乳",
								itemnum: "15",
								totalfee: "278.31"
							},
							{
								itemname: "维生素B类",
								itemnum: "15",
								totalfee: "348.32"
							},
							{
								itemname: "地佐辛",
								itemnum: "15",
								totalfee: "320.66"
							},
						],
					},
				];
				uni.navigateTo({
					url: '/pages/hospitalizationPayment/inpatient-payment-details/inpatient-payment-details?hosptFeeList=' +
						JSON.stringify(hosptFeeList) +
						"&hosptInfo=" +
						JSON.stringify(item)
				});
				// this.$router.push(
				// 	"/inpatientPaymentDetails?hosptFeeList=" +
				// 	JSON.stringify(hosptFeeList) +
				// 	"&hosptInfo=" +
				// 	JSON.stringify(item)
				// );
				// })
				// .catch(() => {
				//   loadingInstance.close();
				// });
			},
			openAddPatient() {
				this.showAddPatient = true;
				this.patient = {
					name: "",
					admissionNumber: undefined
				};
			},
			confirmBinding() {
				if (!this.patient.name || !this.patient.admissionNumber) {
					return;
				}

				const params = {
					hosptName: this.patient.name,
					hosptId: this.patient.admissionNumber,
					code: "100011",
				};
				// let loadingInstance = Loading.service({});
				// this.$api.outpatientDepartmentService.checkHosptInfo(params)
				//   .then((data) => {
				//     console.log(data);
				//     if (data.code !== 200) {
				//       this.$message.warning(data.msg);
				//     } else {
				this.showAddPatient = false;
				this.getHosptList();
				// }
				//     loadingInstance.close();
				//   }).catch(() => {
				//   loadingInstance.close();
				// })
			},
			// 获取住院信息
			getHosptList() {
				const params = {
					code: "100011",
					hosptId: this.patient.admissionNumber,
				};
				this.hospInfoList = [];
				// let loadingInstance = Loading.service({});
				// this.$api.outpatientDepartmentService.getHosptList(params)
				//   .then((data) => {
				//     console.log(data);
				this.hospInfoList = [
					// {
					//   name: "冷夜",
					//   inpatientNo: 123456,
					//   deptName: "测试科",
					//   inDate: "2022-04-12",
					//   prepayCost: "2112.63",
					//   totCost: "1357.6",
					//   freeCost: 0,
					//   inState: "N",
					// },
					{
						name: "小狐狸",
						inpatientNo: "12345678",
						deptName: "内一病区",
						inDate: "2019-06-16",
						prepayCost: "3000.00",
						totCost: "11407.69",
						freeCost: 8407.69,
						inState: "O",
					},
				];
				this.showBox =
					this.hospInfoList != "" &&
					this.hospInfoList != undefined &&
					this.hospInfoList != "" ?
					false :
					true;
				// this.hospInfoList = data && data.data ? data.data : [];
				this.showHospInfo = true;
				// loadingInstance.close();
				//   }).catch(() => {
				//   loadingInstance.close();
				// })

			},

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
/* 
	.zhuti {
		margin-top: 190rpx;
	} */

	.record-wrapper>>>.uni-card {
		padding: 0 !important;

	}
</style>
