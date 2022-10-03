<template>
	<view>
		<view class="zhuti">
			<div class="record-wrapper">
				<uni-card>
					<div class="patient-wrapper bg-white" v-if="!patientInfo.name">
						<div class="patient-wrapper-button" @click="openAddPatient">使用，请添写住院人</div>
					</div>
					<div v-if="patientInfo.name">
						<view class="patient-info-row" style="display: flex;padding:10px 0">
							<view style="width: 80%;font-size: .22rem">
								住院人：{{ patientInfo.name }}[{{ patientInfo.inpatientNo }}]</view>
							<view style="width: 20%;text-align: right;" class="text-right">
								<img style="width: .35rem;height: .35rem;"
									src="https://s1.ax1x.com/2022/09/28/xeI4gS.png" @click="openAddPatient" />
							</view>
						</view>
						<view class="patient-info-row" style="display: flex;padding:10px 0;font-size: .22rem">
							<view style="width: 40%;">科室：{{ patientInfo.deptName }}</view>
							<view style="width: 60%;">入院时间：{{ patientInfo.inDate.substr(0, 10) }}</view>
						</view>
						<view class="patient-info-row" style="display: flex;padding:10px 0;font-size: .22rem">
							<view style="width: 33%;text-align: left;">押金总额：<span
									style="color: #008cfe">{{ patientInfo.prepayCost }}元</span>
							</view>
							<view style="width: 33%;text-align: center;">费用总额：<span
									style="color: #008cfe">{{ patientInfo.totCost }}元</span>
							</view>
							<view style="width: 33%;text-align: right;">欠费：<span style="color: #008cfe">￥{{ patientInfo.freeCost }}</span>
							</view>
						</view>
					</div>
				</uni-card>
			</div>

			<uni-card>
				<div class="bg-white money-container">
					<div class="flex">
						<div>选择充值金额</div>
						<div class="text-right" style="font-size: .3rem;color: #8e8e8e">
							余额：
							<span style="color: #008cfe" v-if="patientInfo.freeCost">￥{{ patientInfo.freeCost }}</span>
							<span style="color: #008cfe" v-else>￥</span>
						</div>
					</div>
					<div class="money-num flex">
						<div :class="selectMoney === 500 ? 'bg-blue' : ''" @click="clickMoney(500)">500</div>
						<div :class="selectMoney === 1000 ? 'bg-blue' : ''" @click="clickMoney(1000)">1000元</div>
						<div :class="selectMoney === 2000 ? 'bg-blue' : ''" @click="clickMoney(2000)">2000元</div>
					</div>
					<view style="width: 90%;margin:0 auto;">
						<input type="number" style="width: 100%;border: #ccc 1px solid;" class="money-input"
							placeholder="请输入大于一千元的整百金额" @input="moneyChange()" v-model="moneyNum">
						</input>
					</view>
				</div>
			</uni-card>
			<div class="recharge">
				<button class="recharge-btn" @click="onRechargeBtn"
					:style="{background: patientInfo ? '#008cfe' : '#bfbfbf'}">充值
				</button>
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
						<button type="primary" @click="confirmBinding"
							:style="{background:patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',}">确认绑定</button>
						<!-- <button @click="confirmBinding" :style="{
			  background:
			    patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',
			}">
							确认绑定
						</button> -->
					</div>
				</div>
			</div>

		</view>
	</view>
</template>

<script>
	// 引入scss组件
	import './hospitalizationPayment.scss'
	export default {

		components: {

		},
		// 计算属性
		computed: {

		},
		data() {
			return {
				selectMoney: "",
				moneyNum: undefined,
				paymentMoney: 0,
				showAddPatient: false,
				patient: {
					name: '',
					admissionNumber: undefined
				},
				patientInfo: {},
			}
		},
		methods: {
			moneyChange() {
				if (this.moneyNum) {
					this.selectMoney = null
				}
			},
			clickMoney(num) {
				this.selectMoney = num
				this.moneyNum = null
			},
			onRechargeBtn() {
				if (!this.patientInfo.inpatientNo) {
					uni.showToast({
						title: '请绑定住院人',
						icon: 'none',
						duration: 2000
					});
					// this.$message.error('请绑定住院人')
					return
				}
				if (!this.moneyNum && !this.selectMoney) {
					uni.showToast({
						title: '请选择或输入充值金额',
						icon: 'none',
						duration: 2000
					});
					// this.$message.error('请选择或输入充值金额')
					return
				}
				if (this.moneyNum && (this.moneyNum < 1000 || this.moneyNum % 100 !== 0)) {
					uni.showToast({
						title: '请输入大于一千元的整百金额',
						icon: 'none',
						duration: 2000
					});
					// this.$message.error('请输入大于一千元的整百金额')
					return;
				}
				uni.navigateTo({
					url: '/pages/paymentPage/paymentPage'
				});
				// this.$router.push('/paymentPage');
			},
			openAddPatient() {
				this.showAddPatient = true;
				this.patient = {
					name: '',
					admissionNumber: undefined
				};
			},
			confirmBinding() {
				if (!this.patient.name || !this.patient.admissionNumber) {
					return;
				}
				let data = {
					"code": 200,
					"msg": "操作成功！"
				}
				console.log(data);
				if (data.code !== 200) {
					uni.showToast({
						title: data.msg,
						icon: 'none',
						duration: 2000
					});
					// this.$message.warning(data.msg);
				} else {
					this.showAddPatient = false;
					this.getHosptList();
				}

			},
			// 获取住院信息
			getHosptList() {
				let data = {
					"code": 0,
					"data": [{
						"airLimit": "0.0",
						"alterApproveCode": "",
						"alterApproveDate": "",
						"alterBegin": "0001-01-01T00:00:00",
						"alterEnd": "0001-01-01T00:00:00",
						"alterType": "",
						"anaphyFlag": "0",
						"babyFlag": "0",
						"balanceCost": "0.0",
						"balanceDate": "0001-01-01T00:00:00",
						"balanceNo": "0",
						"balancePrepay": "0.0",
						"bedLimit": "0.0",
						"bedNo": "1035031802",
						"bedoverdeal": "",
						"birthArea": "",
						"birthday": "1990-10-10T10:23:36",
						"bloodCode": "",
						"bloodDress": "",
						"bloodLatefee": "0.0",
						"boardCost": "0.0",
						"boardPrepay": "0.0",
						"boardState": "0",
						"bursaryTotmedfee": "",
						"cardNo": "0003082305",
						"caseFlag": "1",
						"casesendFlag": "0",
						"changePrepaycost": "0.0",
						"changeTotcost": "0.0",
						"chargeDocCode": "200032",
						"chargeDocName": "贾超",
						"chiefDocCode": "200096",
						"chiefDocName": "姜晶",
						"clinicDiagnose": "",
						"counCode": "",
						"criticalFlag": "0",
						"dayLimit": "0.0",
						"deptCode": "4035",
						"deptName": "青光眼科",
						"diagName": "",
						"dieteticMark": "",
						"dist": "",
						"dutyNurseCode": "200102",
						"dutyNurseName": "赵凤军",
						"ecoCost": "0.0",
						"emplCode": "200623",
						"extCode": "",
						"extFlag": "",
						"extFlag1": "",
						"extFlag2": "",
						"extNumber": "",
						"feeInterval": "1",
						"freeCost": "-22603.0",
						"height": "0",
						"hepatitisFlag": "0",
						"home": "",
						"homeTel": "",
						"homeZip": "",
						"houseDocCode": "200608",
						"houseDocName": "王新宇",
						"idcardtype": "",
						"idenno": "",
						"inAvenue": "1",
						"inCircs": "1",
						"inDate": "2021-09-24T13:02:02",
						"inIcu": "1",
						"inSource": "1",
						"inState": "I",
						"inTimes": "3",
						"inpatientNo": "ZY030000107781",
						"invoiceno": "",
						"isEncryptname": "0",
						"leaveFlag": "0",
						"limitOvertop": "0.0",
						"limitTot": "0.0",
						"linkmanAdd": "",
						"linkmanName": "",
						"linkmanTel": "",
						"localExtFlag1": "",
						"localExtFlag2": "",
						"mari": "",
						"mcardNo": "",
						"medicalType": "",
						"memo": "",
						"moneyAlert": "-2000.0",
						"name": "狐狸",
						"nationCode": "HA",
						"normalname": "",
						"nurseCellCode": "1035",
						"nurseCellName": "青光眼护士站",
						"oldsiNo": "",
						"operCode": "009999",
						"operDate": "2021-09-22T13:02:02",
						"othcost": "0.0",
						"outDate": "0002-01-01T00:00:00",
						"outdiagnose": "",
						"ownCost": "22611.50",
						"ownRate": "1.0",
						"pactCode": "0",
						"pactName": "普通",
						"patientNo": "0000107781",
						"payCost": "0.0",
						"payRate": "0.0",
						"paykindCode": "01",
						"prefixfeeDate": "2022-06-21T23:30:00",
						"prepayCost": 8.5,
						"prepayOutdate": "0001-01-01T00:00:00",
						"procreatePcno": "",
						"profCode": "",
						"pubCost": "0.0",
						"relaCode": "",
						"roomno": "0318",
						"sexCode": "F",
						"spellCode": "CS",
						"status": "0",
						"stopAcount": "0",
						"summary": "",
						"tend": "特殊护理",
						"totCost": 22611.5,
						"upperLimit": "0.0",
						"weight": "0",
						"workName": "",
						"workTel": "",
						"workZip": "",
						"zg": "02"
					}]
				};
				this.patientInfo = data && data.data ? data.data[0] : {};
			}
		},
		mounted() {

		},
	};
</script>

<style scoped>
	.record-wrapper>>>.uni-card {
		padding: 0 !important;

	}

	.zhuti>>>.uni-card {
		padding: 0 !important;
	}
</style>
