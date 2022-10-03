<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="xianzhi">
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="bg-white card-container" v-if="huanzhexinxi.name == null">
					<div style="display: flex; width: 100%;">
						<div class="shangceng">

							<span>{{ processingName(currentPatient.patientName) }}</span>

						</div>
						<view :span="12" class="change-patient-name">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);line-height: .5rem;border-radius: 20px 20px;"
								@click="switchPatient">切换就诊人</button>
						</view>
					</div>

					<div style="width: 100%;">
						<div class="xiaceng">
							<text>就诊号</text>
							<text style="margin-left:5px;">：</text>
							<text style="margin-left:5px;">{{ currentPatient.cardNumber }}</text>
						</div>
					</div>
					<!-- <div class="qiehuananniu">
						<button class="change-patient-name-btn" @click="switchPatient">
							切换就诊人
						</button>
					</div> -->
				</div>
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名不为空渲染这个div -->
				<div class="bg-white card-container" v-else>
					<div style="display: flex; width: 100%;">
						<div class="shangceng">
							<div class="xingming">
								<span>{{processingName( huanzhexinxi.patientName)}}</span>
							</div>
						</div>
						<view :span="12" class="change-patient-name">
							<button class="change-patient-name-btn" @click="switchPatient">切换就诊人</button>
						</view>
					</div>
					<div style="width: 100%;">
						<div class="xiaceng">
							<text>就诊号</text>
							<text style="margin-left:5px;">：</text>
							<text style="margin-left:5px;">{{ huanzhexinxi.cardNumber }}</text>
						</div>
					</div>
					<!-- <div class="qiehuananniu">
						<button class="change-patient-name-btn" @click="switchPatient">
							切换就诊人
						</button>
					</div> -->
				</div>
			</uni-card>
			<!-- 切换就诊人的弹出框 -->
			<div v-if="showSwitchPatient" class="switch-patient-bg">
				<!-- 如果如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="switch-patient-container bg-white" v-if="huanzhexinxi.name == null">
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<!-- <i class="el-icon-error" @click="showSwitchPatient = false"></i> -->
						<text class="iconfont icon-guanbi" @click="showSwitchPatient = false"></text>
					</div>
					<div class="border-bottom switch-patient-list" v-for="item in switchPatientList"
						v-bind:key="item.cardNumber" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">*{{ item.patientName }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							就诊号：{{ item.cardNumber }}</div>
						<!-- <i class="el-icon-check" v-if="currentPatient.shenfenID === item.shenfenID"
							style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="currentPatient.cardNumber === item.cardNumber"
							style="color: #008cfe"></text>
					</div>

					<view style="display: flex;padding: 10px 0;">
						<view style="width: 50%;" class="switch-patient-btn switch-patient-btn-l"
							@click.native="addPatient">
							添加就诊人</view>
						<view style="width: 50%;" class="switch-patient-btn" @click.native="managePatient">管理就诊人</view>
					</view>
				</div>

				<!-- 如果如果huanzhexinxi中的患者姓名不为空渲染这个div -->
				<div class="switch-patient-container bg-white" v-else>
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<!-- <i class="el-icon-error" @click="showSwitchPatient = false"></i> -->
						<text class="iconfont icon-guanbi" @click="showSwitchPatient = false"></text>
					</div>
					<div class="border-bottom switch-patient-list" v-for="item in switchPatientList"
						v-bind:key="item.cardNumber" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">{{ item.patientName }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							就诊号：{{ item.cardNumber }}</div>
						<!-- <i class="el-icon-check" v-if="huanzhexinxi.shenfenID === item.shenfenID" style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="huanzhexinxi.cardNumber === item.cardNumber"
							style="color: #008cfe"></text>
					</div>

					<view style="display: flex;padding: 10px 0;">
						<view style="width: 50%;" class="switch-patient-btn switch-patient-btn-l"
							@click.native="addPatient">
							添加就诊人</view>
						<view style="width: 50%;" class="switch-patient-btn" @click.native="managePatient">管理就诊人</view>
					</view>
				</div>
			</div>

			<div class="no-list" v-if="paymentList.length === 0">
				<div>
					<img src="https://s1.ax1x.com/2022/09/28/xe6wLV.png" />
				</div>
				<p>暂未获取到您的代缴费信息</p>
			</div>
			<view class="neiwaibianju">
				<uni-card>
					<div v-if="paymentList.length > 0">
						<div class="bg-white payment-container" v-for="item in paymentList" v-bind:key="item.count">
							<view class="payment-row" style="display: flex;padding: 10px 0;">
								<view style="width: 10%;text-align: left;">
									<text class="iconfont icon-circle-check" style="color: #b7b7b7"
										v-if="!isChecked(item)" @click="paymentCheck(item)"></text>
									<text class="iconfont icon-circle-check" style="color: #008cfe"
										v-if="isChecked(item)" @click="paymentCheck(item)"></text>
								</view>
								<view style="width:65% ;" @click.native="openList(item)">
									挂号科室：{{ item.regInfos.deptName }}({{ item.regInfos.regNo }})
								</view>
								<view style="width: 20%;text-align: right;" @click.native="openList(item)"
									class="text-right">
									{{ handRegDate(item.regInfos.regDate) }}
								</view>
								<view style="width: 5%;" @click.native="openList(item)" class="text-center">
									<text class="iconfont icon-xiajiantou" v-if="item.isOpen"
										style="color: #b7b7b7"></text>
									<text class="iconfont icon-youjiantou" v-if="!item.isOpen"
										style="color: #b7b7b7"></text>
								</view>
							</view>

							<div>
								<div class="prescription-container" v-show="item.isOpen"
									v-for="(outFee, index) in item.outFeeList" v-bind:key="index"
									style="padding: 10px 0;border-top: 1px solid #b8b8b8;">
									<view class="prescription-row" style="display: flex;">
										<view style="width: 10%;text-align: center;">
											<text class="iconfont icon-circle-check" style="color: #b7b7b7"
												v-if="selectPaymentMoOrderList.indexOf(outFee.recipeNo) === -1"
												@click="selectOutFee(item, outFee)"></text>
											<text class="iconfont icon-circle-check" style="color: #008cfe"
												v-if="selectPaymentMoOrderList.indexOf(outFee.recipeNo) > -1"
												@click="selectOutFee(item, outFee)"></text>
										</view>
										<view style="color: #979797;width: 70%;">处方号：{{ outFee.recipeNo }}</view>
										<view class="text-right" style="color: #008cfe;width: 20%;text-align: right;">
											<!--                  <span v-if="outFee.isPayment">已支付</span>-->
											<!--                  <span v-if="!outFee.isPayment">未支付</span>-->
											<span>未支付</span>
										</view>
									</view>
									<view class="prescription-row" v-for="(prescriptionItem, ind) in outFee.feeList"
										:key="ind" style="display: flex;padding: 5px 0;">
										<!-- v-for="prescriptionItem in prescription.prescriptionItems" v-bind:key="prescriptionItem.id"-->
										<view style="width: 5%;">&nbsp;</view>
										<view style="width: 70%;">{{ prescriptionItem.itemName }}</view>
										<view class="text-right" style="color: #b8b8b8;width: 25%;text-align: right;">
											{{ prescriptionItem.itemPrice }}*{{ prescriptionItem.itemNum }}
										</view>
									</view>
								</div>
							</div>

							<div class="payment-bot bg-white">
								<view style="display: flex;">
									<!--            <view :span="7" class="text-center pay-sel-all">-->
									<!--              <el-checkbox v-model="isSelectAll" @change="onSelectAllBtn" class="pay-check"></el-checkbox>-->
									<!--              全选-->
									<!--            </view>-->
									<view style="padding:5px;width: 70%">
										总额：<span style="color: #ec6c25">￥{{ item.totalMoney }}</span>
									</view>
									<view style="width: 30%;" class="text-center" @click.native="goToPayment(item)">
										<button style="width: 100%;border-radius: 20px 20px;" class="mini-btn"
											type="primary">去缴费</button>
									</view>
								</view>
							</div>
						</div>
					</div>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss组件
	import "./outpatientPayment.scss";
	export default {
		// 调用头部组件
		components: {
			// header
		},
		// 计算属性
		computed: {
			processingName() {
				return function(val) {
					if (!val) {
						return "-";
					}
					return "*" + val.substr(1);
				}
			},
			zongjiner(xiangmujiner, xiangmucishu) {
				let chufangsum = xiangmujiner * xiangmucishu + chufangsum;
				return chufangsum;
			},
		},
		data() {
			return {
				title: "缴费列表", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				//就诊人中的所有值
				showSwitchPatient: false, //切换就诊人的弹窗值，如果此值为true弹窗会打开
				huanzhexinxi: {}, //存放患者信息的值
				paymentList: [],
				switchPatientList: [],
				currentPatient: {},
				selectPaymentList: [],
				selectPaymentMoOrderList: [],
				isSelectAll: false,
				totalMoney: 0,

			}
		},
		methods: {

			// 就诊人中的全部方法
			//触发切换就诊人的弹窗
			switchPatient() {
				this.showSwitchPatient = true;
			},
			//就诊人信息的数据
			getPatientInfo() {
				let _this = this;
				let data = [{
						"cardId": "1485542028335468546",
						"cardNumber": "A000009644",
						"cardState": "1021",
						"patientAge": "26",
						"patientBirthday": "1996-10-10",
						"patientCardId": "210281199610101025",
						"patientId": "1485541535202758657",
						"patientName": "狐狸",
						"patientPhone": "18840069483",
						"patientRelationship": "1030",
						"patientSex": "男",
						"patientState": "1011"
					},
					{
						"cardId": "1513338116588986369",
						"cardNumber": "A000010865",
						"cardState": "1021",
						"dataSourdces": "json",
						"patientAge": "24",
						"patientBirthday": "1997-10-10",
						"patientCardId": "210281199710102024",
						"patientCardType": "11001",
						"patientId": "1513338114705743874",
						"patientName": "蚯蚓",
						"patientPhone": "15840059481",
						"patientRelationship": "1031",
						"patientSex": "女",
						"patientState": "1011"
					},
					{
						"cardId": "1517390116221976578",
						"cardNumber": "0000000001",
						"cardState": "1020",
						"dataSourdces": "json",
						"patientAge": "24",
						"patientBirthday": "1997-10-10",
						"patientCardId": "210281199710102056",
						"patientCardType": "11001",
						"patientId": "1517390115580248066",
						"patientName": "青蛙",
						"patientPhone": "15840059483",
						"patientRelationship": "1033",
						"patientSex": "男",
						"patientState": "1010"
					},
				];
				_this.switchPatientList = data;
				// 让currentPatient等于数组data中索引位置为0的信息
				_this.currentPatient = data[0];
				this.getOutPayList();

			},
			//切换就诊人，这个参数中包含就诊人信息
			// onSwitchPatientBtn(item) {
			// 	this.currentPatient = item;
			// 	// 让huanzhexinxi等于就诊人信息
			// 	this.huanzhexinxi = item;
			// },
			// 切换就诊人
			onSwitchPatientBtn(item) {
				this.currentPatient = item;
				this.isSelectAll = false;
				this.selectPaymentList = [];
				this.selectPaymentMoOrderList = [];
				this.paymentList = [];
				this.getOutPayList();
			},
			// 添加就诊人
			addPatient() {},
			// 管理就诊人
			managePatient() {},

			// 获取缴费信息列表
			getOutPayList() {
				let data = {
					"code": 0,
					"data": [{
						"count": "117.40",
						"outFeeList": [{
								"feeList": [{
									"deptId": "0008",
									"deptName": "眼门",
									"dosage": "0.0",
									"dosageSpec": "",
									"drugFlag": "0",
									"drugSendWindow": "",
									"execDeptName": "眼门",
									"feeDate": "0001/1/1 0:00:00",
									"feeStatCode": "08",
									"feeStatName": "检查费",
									"feeType": "007",
									"frequency": "ST",
									"itemId": "F00000016229",
									"itemName": "复视检查",
									"itemNum": "1",
									"itemPrice": "23.70",
									"itemSpec": "",
									"moOrder": "62546328",
									"recipeDrName": "",
									"recipeFeeSeq": "7911194",
									"recipeNo": "10756774",
									"recipeSeq": "1",
									"regNo": "",
									"sysType": "UC",
									"totalCost": 23.7,
									"usage": ""
								}],
								"recipeNo": "10756774"
							},
							{
								"feeList": [{
									"deptId": "0008",
									"deptName": "眼门",
									"dosage": "0.0",
									"dosageSpec": "",
									"drugFlag": "0",
									"drugSendWindow": "",
									"execDeptName": "眼门",
									"feeDate": "0001/1/1 0:00:00",
									"feeStatCode": "10",
									"feeStatName": "治疗费",
									"feeType": "006",
									"frequency": "ST",
									"itemId": "F00000016123",
									"itemName": "大换药",
									"itemNum": "1",
									"itemPrice": "27.50",
									"itemSpec": "",
									"moOrder": "62546313",
									"recipeDrName": "",
									"recipeFeeSeq": "7911194",
									"recipeNo": "10756773",
									"recipeSeq": "1",
									"regNo": "",
									"sysType": "UZ",
									"totalCost": 27.5,
									"usage": ""
								}],
								"recipeNo": "10756773"
							},
							{
								"feeList": [{
									"deptId": "0008",
									"deptName": "眼门",
									"dosage": "0.0",
									"dosageSpec": "",
									"drugFlag": "0",
									"drugSendWindow": "",
									"execDeptName": "中检室",
									"feeDate": "0001/1/1 0:00:00",
									"feeStatCode": "08",
									"feeStatName": "检查费",
									"feeType": "007",
									"frequency": "ST",
									"itemId": "F00000015135",
									"itemName": "色觉检查",
									"itemNum": "1",
									"itemPrice": "2.50",
									"itemSpec": "",
									"moOrder": "62546312",
									"recipeDrName": "",
									"recipeFeeSeq": "7911194",
									"recipeNo": "10756772",
									"recipeSeq": "1",
									"regNo": "",
									"sysType": "UC",
									"totalCost": 2.5,
									"usage": ""
								}],
								"recipeNo": "10756772"
							},
							{
								"feeList": [{
										"deptId": "0008",
										"deptName": "眼门",
										"dosage": "0.0",
										"drugFlag": "0",
										"drugSendWindow": "",
										"execDeptName": "检验科",
										"feeDate": "0001/1/1 0:00:00",
										"feeStatCode": "06",
										"feeStatName": "化验费",
										"feeType": "012",
										"frequency": "",
										"itemId": "F00000030275",
										"itemName": "血清低密度脂蛋白胆固醇测定",
										"itemNum": "1",
										"itemPrice": "17.10",
										"itemSpec": "",
										"moOrder": "62546314",
										"recipeDrName": "",
										"recipeFeeSeq": "7911194",
										"recipeNo": "10756771",
										"recipeSeq": "1",
										"regNo": "F00000030275",
										"sysType": "UL",
										"totalCost": 17.1,
										"usage": ""
									},
									{
										"deptId": "0008",
										"deptName": "眼门",
										"dosage": "0.0",
										"drugFlag": "0",
										"drugSendWindow": "",
										"execDeptName": "检验科",
										"feeDate": "0001/1/1 0:00:00",
										"feeStatCode": "06",
										"feeStatName": "化验费",
										"feeType": "012",
										"frequency": "",
										"itemId": "F00000030274",
										"itemName": "血清高密度脂蛋白胆固醇测定",
										"itemNum": "1",
										"itemPrice": "14.30",
										"itemSpec": "",
										"moOrder": "62546314",
										"recipeDrName": "",
										"recipeFeeSeq": "7911194",
										"recipeNo": "10756771",
										"recipeSeq": "2",
										"regNo": "F00000030274",
										"sysType": "UL",
										"totalCost": 14.3,
										"usage": ""
									},
									{
										"deptId": "0008",
										"deptName": "眼门",
										"dosage": "0.0",
										"drugFlag": "0",
										"drugSendWindow": "",
										"execDeptName": "检验科",
										"feeDate": "0001/1/1 0:00:00",
										"feeStatCode": "06",
										"feeStatName": "化验费",
										"feeType": "012",
										"frequency": "",
										"itemId": "F00000015256",
										"itemName": "血清总胆固醇测定【酶法】",
										"itemNum": "1",
										"itemPrice": "5.10",
										"itemSpec": "",
										"moOrder": "62546314",
										"recipeDrName": "",
										"recipeFeeSeq": "7911194",
										"recipeNo": "10756771",
										"recipeSeq": "3",
										"regNo": "F00000015256",
										"sysType": "UL",
										"totalCost": 5.1,
										"usage": ""
									},
									{
										"deptId": "0008",
										"deptName": "眼门",
										"dosage": "0.0",
										"drugFlag": "0",
										"drugSendWindow": "",
										"execDeptName": "检验科",
										"feeDate": "0001/1/1 0:00:00",
										"feeStatCode": "06",
										"feeStatName": "化验费",
										"feeType": "012",
										"frequency": "",
										"itemId": "F00000052484",
										"itemName": "血清甘油三脂测定（酶法）",
										"itemNum": "1",
										"itemPrice": "10.10",
										"itemSpec": "",
										"moOrder": "62546314",
										"recipeDrName": "",
										"recipeFeeSeq": "7911194",
										"recipeNo": "10756771",
										"recipeSeq": "4",
										"regNo": "F00000052484",
										"sysType": "UL",
										"totalCost": 10.1,
										"usage": ""
									},
									{
										"deptId": "0008",
										"deptName": "眼门",
										"dosage": "0.0",
										"dosageSpec": "",
										"drugFlag": "0",
										"drugSendWindow": "",
										"execDeptName": "检验科",
										"feeDate": "0001/1/1 0:00:00",
										"feeStatCode": "06",
										"feeStatName": "化验费",
										"feeType": "012",
										"frequency": "ST",
										"itemId": "F00000030275",
										"itemName": "血清低密度脂蛋白胆固醇测定",
										"itemNum": "1",
										"itemPrice": "17.10",
										"itemSpec": "",
										"moOrder": "62546330",
										"recipeDrName": "",
										"recipeFeeSeq": "7911194",
										"recipeNo": "10756771",
										"recipeSeq": "1",
										"regNo": "",
										"sysType": "UL",
										"totalCost": 17.1,
										"usage": ""
									}
								],
								"recipeNo": "10756771"
							}
						],
						"regInfos": {
							"bookTime": "",
							"cardNo": "0000000001",
							"deptId": "0008",
							"deptName": "眼门",
							"doctorId": "",
							"doctorName": "",
							"inspectFee": "0.0",
							"isSee": "1",
							"outTradelNumber": "",
							"outpatientId": "0000000001",
							"patientName": "李英明",
							"paymentStatus": "不可退费",
							"paymentWay": "",
							"regDate": "20220618141709",
							"regFee": "0.0",
							"regLevelId": "6",
							"regLevelName": "伤残",
							"regNo": "2798444",
							"scheduleId": "",
							"scheduleName": "下午",
							"seeBegintime": "20220618000000",
							"seeEndtime": "20220618000000",
							"termialID": "",
							"totalFee": "0.0",
							"visitTime": ""
						}
					}]
				};
				this.paymentList = data.data;
				this.paymentList.forEach(item => {
					item.isOpen = true;
					item.totalMoney = 0
				});

			},
			openList(item) {
				this.$forceUpdate();
				this.$set(item, "isOpen", !item.isOpen);
			},
			isChecked(item) {
				let selectNum = 0;
				this.selectPaymentList.forEach(pay => {
					if (pay.regNo === item.regInfos.regNo) {
						selectNum++;
					}
				})
				return selectNum === item.outFeeList.length;
			},
			paymentCheck(item) {
				if (this.selectPaymentList.length && this.selectPaymentList[0].regNo != item.regInfos.regNo) {
					this.selectPaymentList = [];
					this.selectPaymentMoOrderList = [];
				}
				if (this.isChecked(item)) {
					for (let i = this.selectPaymentList.length - 1; i >= 0; i--) {
						if (this.selectPaymentList[i].regNo === item.regInfos.regNo) {
							this.selectPaymentList.splice(i, 1);
							this.selectPaymentMoOrderList.splice(i, 1);
						}
					}
				} else {
					item.outFeeList.forEach(outFee => {
						const recipe = this.selectPaymentList.map(list => list.recipeNo)
						if (recipe.indexOf(outFee.recipeNo) === -1) {
							outFee.regNo = item.regInfos.regNo;
							this.selectPaymentList.push(outFee);
							this.selectPaymentMoOrderList.push(outFee.recipeNo);
						}
					});
				}
				this.calculationTotalMoney(item);
				// this.judgeWhetherSelectAll();
			},
			// 选择处方
			selectOutFee(item, outFee) {
				const index = this.selectPaymentMoOrderList.indexOf(outFee.recipeNo);
				if (index > -1) {
					this.selectPaymentList.splice(index, 1);
					this.selectPaymentMoOrderList.splice(index, 1);
				} else {
					outFee.regNo = item.regInfos.regNo;
					this.selectPaymentList.push(outFee);
					this.selectPaymentMoOrderList.push(outFee.recipeNo);
				}
				this.calculationTotalMoney(item);
				// this.judgeWhetherSelectAll();
			},
			// 全选
			onSelectAllBtn() {
				this.selectPaymentList = [];
				this.selectPaymentMoOrderList = [];
				if (this.isSelectAll) {
					this.paymentList.forEach(item => {
						item.outFeeList.forEach(outFee => {
							outFee.regNo = item.regInfos.regNo;
							this.selectPaymentList.push(outFee);
							this.selectPaymentMoOrderList.push(outFee.recipeNo);
						});
					});
				}
				this.calculationTotalMoney();
			},
			// 是否全选
			judgeWhetherSelectAll() {
				let len = 0;
				this.paymentList.forEach(item => {
					len += item.outFeeList.length;
				})
				this.isSelectAll = this.selectPaymentMoOrderList.length === len;
			},
			// 计算金额
			calculationTotalMoney(item) {
				let money = 0;
				this.selectPaymentList.forEach(item => {
					item.feeList.forEach(outFee => {
						money += Number((outFee.itemPrice * outFee.itemNum).toFixed(2));
					})
				});
				item.totalMoney = Number(money).toFixed(2);
			},
			handRegDate(str) {
				const date = str.substr(4, 2) + '月' + str.substr(6, 2) + '日';
				return date;
			},
			goToPage(url) {
				if (!url) {
					return;
				}
				this.$router.push(url);
			},
			goToPayment(item) {
				if (this.selectPaymentMoOrderList.length === 0 || this.selectPaymentList[0].regNo !== item.regInfos
					.regNo) {
					uni.showToast({
						title: '请选择缴费项目',
						icon: 'none',
						duration: 2000
					});
					// this.$message.info('请选择缴费项目')
					return
				}
				uni.navigateTo({
					url: '/pages/paymentPage/paymentPage?orderNo'
				});
				// this.$router.push('/paymentPage?orderNo');
			}
		},
		mounted() {
			this.getPatientInfo();
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
		margin-top: 190rpx;
	} */

	.change-patient-name {
		text-align: right;
		width: 35%;
		height: 50rpx;
	}

	.change-patient-name-btn {
		width: 100%;
		height: 50rpx;
		font-size: 20rpx;
		border-radius: .4rem;
		background: no-repeat;
		border: 1px solid rgb(0, 142, 254);
		padding: 0 .4rem;
		color: rgb(0, 142, 254);
		outline: none;
		margin: 0;
	}

	.shangceng {
		width: 65%;
		display: flex;
	}



	.xiaceng {
		margin-top: 5px;
	}

	.xingming {
		width: 35%;
	}

	.shangceng>span {
		color: rgb(8, 8, 8);
		font-size: 16px;
		font-weight: bold;
	}

	.xiaceng>text {
		font-size: 12px;
		color: rgb(146, 146, 146);
		/* margin-left: 1px; */
	}

	.jibenxinxi {
		width: 70%;
	}

	.qiehuananniu {
		width: 30%;
		text-align: right;
		line-height: 50px;
	}

	.shangceng {
		width: 100%;

		display: flex;
	}

	.xiaceng {
		margin-top: 5px;
	}

	.xingming>span {
		font-size: 16px;
		font-weight: 600;
	}

	.xiaceng>span {
		font-size: 14px;
		color: rgb(163, 163, 163);
	}

	.neiwaibianju>>>.uni-card {
		/* margin: 5px !important; */
		padding: 0 !important;
		/* background-color: saddlebrown; */
		/* background-color: salmon; */
	}
</style>
