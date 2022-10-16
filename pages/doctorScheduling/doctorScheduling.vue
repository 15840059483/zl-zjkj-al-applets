<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" :mask=true></zero-loading>
		<view class="zhuti">
			<uni-card>
				<div class="bg-white doc-container">
					<view style="display: flex;">
						<view style="width: 30%;">
							<div class="doc-img">
								<img :src="baseUrl + '/hospt/doctorsImg/' + doctor.docID">
							</div>
						</view>
						<view style="padding:10px 5px 10px 0;width: 60%;">
							<div style="font-size: 16px;">{{doctor.docName}} <text class="doc-position"
									style="margin-left: 3%;">{{doctor.regLevelName}}</text></div>
							<div class="doc-introduce">
								{{doctorInfo!=null&&doctorInfo.introduce!=null?doctorInfo.introduce:'暂无介绍'}}
							</div>
						</view>
						<view style="width: 10%;" class="text-center">
							<div>
								<div class="doc-collection-icon">
									<!--                <i v-if="!doctorInfo.isCollection" class="el-icon-star-off"></i>-->
									<!--                <i v-if="doctorInfo.isCollection" class="el-icon-star-on"></i>-->
								</div>
								<div class="doc-collection-font">
									<!--                <span v-if="!doctorInfo.isCollection">未收藏</span>-->
									<!--                <span v-if="doctorInfo.isCollection">已收藏</span>-->
								</div>
							</div>
						</view>
					</view>
				</div>
			</uni-card>
			<div class="bg-white">
				<!--        <uni-row class="select-am-row" @click.native="openConfirm">-->
				<!--          <view :span="14">-->
				<!--            {{today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}}-->
				<!--             上午 剩余号：12-->
				<!--          </view>-->
				<!--          <view :span="5" class="doc-money text-right">￥{{doctorInfo.money}}</view>-->
				<!--          <view :span="5" class="text-center">-->
				<!--            <span class="doc-remainder">预约挂号</span>-->
				<!--          </view>-->
				<!--        </uni-row>-->
				<view class="select-am-row select-pm-row" v-for="item in seeDate" v-bind:key="item.iD"
					@click.native="openConfirm(item)" style="display: flex;">
					<view style="width: 70%;">
						{{item.seeTime}}
						|
						{{doctor.noonID=='1'?'上午':'下午'}}
					</view>
					<view style="width: 15%;text-align: center" class="doc-money text-right">￥{{totalFee}}</view>
					<view style="width: 15%;text-align: right;" class="text-center">
						<text class="doc-remainder">挂号</text>
					</view>
				</view>
			</div>


			<view name="el-fade-in-linear">
				<div class="confirm-div" v-if="isShowConfirm"></div>
			</view>
			<view name="el-fade-in-linear">
				<div class="confirm-container bg-white" v-if="isShowConfirm" style="background-color: #fff;">
					<div class="text-center confirm-doc">
						<div style="margin-bottom: .5rem;text-align: center;">{{doctor.docName}}&nbsp;&nbsp;&nbsp;&nbsp;
							<text
								style="font-size: .35rem;">{{doctorInfo!=null&&doctorInfo.position!=null?doctorInfo.position:''}}</text>
						</div>
						<!-- 根据vuex中的科室名称是否为空限制显示 -->
						<div v-if="keshiname !=''" style="text-align: center;">{{keshiname}}&nbsp;&nbsp;&nbsp;&nbsp;
							{{(selectDayInfo.month) + ' - ' + tody}}&nbsp;&nbsp;&nbsp;&nbsp;
							星期{{selectDayIndex}}
						</div>
						<!-- 原有的，如果需要改回原有的将v-eles与上面v-if中所有内容删掉 -->
						<div v-else style="text-align: center;">{{doctor.deptName}}&nbsp;&nbsp;&nbsp;&nbsp;
							{{(selectDayInfo.month) + ' - ' + tody}}&nbsp;&nbsp;&nbsp;&nbsp;
							星期{{selectDayIndex}}
						</div>
					</div>
					<div class="confirm-time">
						<div>{{seeDateInfo.seeTime}}|{{doctor.noonID=='1'?'上午':'下午'}}</div>
						<!--            <div>10:30</div>-->
					</div>
					<view class="text-center confirm-btn-row" style="display: flex;">
						<view style="width: 50%;text-align: center;" class="confirm-btn" @click.native="closeConfirm">取消
						</view>
						<view style="width: 50%;text-align: center;" class="confirm-btn confirm-btn-save"
							@click.native="goToPage()">确认</view>
					</view>
				</div>
			</view>
			<div class="no-list" v-if="seeDate.length === 0">
				<div>
					<img src="https://s1.ax1x.com/2022/09/21/ximvbq.png">
				</div>
				<p>暂未获取到医生排班信息</p>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入scss文件
	import '../makeAppointmentRegister/makeAppointmentRegister.scss'
	import './doctorScheduling.scss';
	import '../outPatientFeeListIndex/outpatientPayment.scss'
	// 引入base
	import base from "../../request/base";
	// 引入vuex文件
	import store from "../../store";
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "医生排班", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,
				baseUrl: base.base.sq,
				doctorInfo: {},
				doctor: {},
				feeBill: {},
				isShowDate: true,
				today: new Date(),
				weeks: [],
				days: [],
				selectDay: 0,
				isShowConfirm: false,
				testDay: "",
				selectDayIndex: "",
				tody: "",
				//todyNo:parseInt(this.$route.query.selectDayIndex),
				selectDayInfo: {},
				RegLevelID: "",
				date: "",

				totalFee: 0,
				seeDate: [],
				seeDateInfo: {},
				keshiname: '', //获取vuex中的科室名称
			}
		},
		// 在uniapp中如果要使用路由传参必须使用onload(路由传参中的参数值)
		onLoad(e) {
			console.log(e);
			this.doctor = JSON.parse(e.doctorInfo);
			this.testDay = e.testDay;
			this.selectDayIndex = e.selectDayIndex;
			this.tody = e.selectDay;
			//todyNo:parseInt(this.$route.query.selectDayIndex);
			this.selectDayInfo = JSON.parse(e.selectDayInfo);
			this.RegLevelID = e.regLevelID;
			this.date = e.date;
			this.jiazai()
		},
		methods: {
			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},
			getDoctorDate() {
				const params = {
				  SchemaID:this.doctor.iD,
				};
				this.$myRequest({
					url: "/hospt/getDoctorDate",
					data: params,
				}).then(data => {
					this.seeDate = data.data.schemaqueues;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			onSelectDayBtn(day, index) {
				if (index > 0) {
					this.$message.warning('暂不支持预约挂号');
					return false;
				}
				this.selectDay = day;
				this.selectDayIndex = index;
				this.getDetDoctorInfo();
			},
			getDoctorInfo() {
				const params = {
					doctorId: this.doctor.docID,
				};
				this.$myRequest({
					url: "/hospt/getDoctorPage",
					data: params,
				}).then(data => {
					const doctorInfo = data.data;
					this.doctorInfo = doctorInfo.records[0];
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			getDoctorFeeInfo() {
				//console.log(this.doctor)
				const params = {
					RegLevelID: this.RegLevelID,
				};
				
				this.$myRequest({
					url: "/hospt/getDoctorFeeBill",
					data: params,
				}).then(data => {
					const feeBill = data.data;
					this.feeBill = feeBill;
					this.doctor.totalFee = this.feeBill.DigFee;
					this.totalFee = this.feeBill.DigFee;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			getDays(day, month) {
				let currentDay = day;
				for (let i = 0; i < 7; i++) {
					switch (month + 1) {
						case 1:
						case 3:
						case 5:
						case 7:
						case 8:
						case 10:
						case 12:
							if (currentDay === 31) {
								currentDay = 1;
							}
							break;
						case 4:
						case 6:
						case 9:
						case 11:
							if (currentDay === 30) {
								currentDay = 1;
							}
							break;
						default:
							if (currentDay === 28) {
								currentDay = 1;
							}
							break;
					}
					this.days.push(currentDay++);
					this.selectDay = this.days[0];
				}
			},
			getWeeks(week) {
				let currentWeek = week;
				for (let i = 0; i < 7; i++) {
					this.weeks.push(this.processingWeekDisplay(currentWeek));
					currentWeek++
					if (currentWeek === 8) {
						currentWeek = 1;
					}
				}
			},
			processingWeekDisplay(num) {
				switch (num) {
					case 1:
						return '一';
					case 2:
						return '二';
					case 3:
						return '三';
					case 4:
						return '四';
					case 5:
						return '五';
					case 6:
						return '六';
					case 7:
						return '日';
				}
			},
			openConfirm(items) {
				this.seeDateInfo = null;
				this.seeDateInfo = items
				this.isShowConfirm = true;
			},
			closeConfirm() {
				this.isShowConfirm = false;
			},
			goToPage() {
				console.log(this.seeDateInfo)
				let noonName = '[' + (this.doctor.noonID == '1' ? '上午' : '下午') + ']';
				uni.navigateTo({
					url: '/pages/registrationConfirmation/registrationConfirmation?doctorInfo=' +
						encodeURIComponent(JSON.stringify(this.doctor)) +
						'&seeInfo=' + encodeURIComponent(JSON.stringify(this.seeDateInfo)) + '&date=' + this.date +
						'&noonName=' + noonName +
						'&schemaId=' + this.doctor.iD +
						'&noonID=' + this.doctor.noonID,
				});
				this.closeConfirm();
			}
		},
		// 这是uni的生命周期
		onShow() {
			this.jiazai()
		},
		mounted() {
			this.getDays(this.today.getDate(), this.today.getMonth());
			this.getWeeks(this.today.getDay());
			this.getDoctorFeeInfo();
			this.getDoctorInfo();
			this.getDoctorDate();
			//获取vuex中的科室名称
			this.keshiname = store.state.keshiname;
			(this.selectDayInfo)
			console.log(this.keshiname)
			//console.log(parseInt(this.todyNo)+1)
			this.jiazai()
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
		margin-top: 170rpx;
	} */

	.zhuti>>>.uni-card {
		padding: 0 !important;
	}
</style>
