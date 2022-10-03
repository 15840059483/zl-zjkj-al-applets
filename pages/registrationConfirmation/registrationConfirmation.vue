<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask=true></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card>
				<div class="bg-white patient-container" style="margin-bottom:0;">
					<view style="display: flex;padding:10px .3rem 10px .3rem;" class="patient-container-row">
						<view style="width: 40%;text-align: left;">挂号类别</view>
						<view style="width: 60%;text-align: right;" class="text-right">{{doctorInfo.regLevelName}}
						</view>
					</view>
					<view style="display: flex;padding:10px .3rem 10px .3rem;" class="patient-container-row">
						<view style="width: 40%;text-align: left;">就诊科室</view>
						<!-- 根据vuex中的科室名称是否为空限制显示 -->
						<view style="width: 60%;text-align: right;" class="text-right" v-if="keshiname != ''">
							{{keshiname}}
						</view>
						<!-- 原有的，如果需要改回原有的将v-eles与上面v-if中所有内容删掉 -->
						<view style="width: 60%;text-align: right;" class="text-right" v-else>{{doctorInfo.deptName}}
						</view>
					</view>
					<view style="display: flex;padding:10px .3rem 10px .3rem;" class="patient-container-row"
						v-if="doctorInfo.docName&&doctorInfo.regLevelID!='1'">
						<view style="width: 40%;text-align: left;">就诊医生</view>
						<view style="width: 60%;text-align: right;" class="text-right">{{doctorInfo.docName}}</view>
					</view>
					<view style="display: flex;padding:10px .3rem 10px .3rem;" class="patient-container-row">
						<view style="width: 40%;text-align: left;">就诊时间</view>
						<view style="width: 60%;text-align: right;" class="text-right red-font">{{seeDateInfo.seeTime}}
						</view>
					</view>
				</div>
			</uni-card>
			<uni-card>
				<div class="bg-white patient-container" style="margin-bottom:0;">
					<view style="display: flex;padding: 0 0.3rem;" class="patient-container-row">
						<view style="width: 40%;text-align: left;">诊查费</view>
						<view style="width: 60%;text-align: right;" class="text-right red-font">￥{{doctorInfo.totalFee}}
						</view>
					</view>
					<!--      <view class="patient-container-row">-->
					<!--        <view :span="10">工本费</view>-->
					<!--        <view :span="14" class="text-right red-font">￥1.00</view>-->
					<!--      </view>-->
					<!--      <view class="patient-container-row">-->
					<!--        <view :span="10">合计金额</view>-->
					<!--        <view :span="14" class="text-right red-font">￥20.00</view>-->
					<!--      </view>-->
				</div>
			</uni-card>
			<uni-card>
				<div style="margin-bottom:0;" class="bg-white patient-container">
					<view style="display: flex;" class="patient-container-row" @click.native="showMore()">
						<view style="width: 40%;text-align: left;">就诊人</view>
						<view class="text-right" style="position: relative;width: 60%;">
							<div class="select-patient-show">
								<text class="red-font">{{selectPatient.patientName}}</text>
								<text v-if="!showOtherPatient" class="iconfont icon-youjiantou"
									style="font-size: 24px;"></text>
								<text v-if="showOtherPatient" class="iconfont icon-xiajiantou"
									style="font-size: 24px;"></text>
							</div>
						</view>
					</view>
					<!-- 此处使用了过渡动画   <view class="show-more" :class="[isShowDate ? 'show-more-click' : '']">-->
					<view class="show-more" :class="[showOtherPatient ? 'show-more-click' : '']">

						<view v-show="isShowText">
							<div v-if="showOtherPatient" class="zoom-patient-container">
								<view style="display: flex;padding:10px .3rem 10px .3rem;"
									class="patient-container-row"
									:class="item.patientId === selectPatient.patientId ? 'select-bg' : ''"
									v-for="(item,index) in patients" v-bind:key="index"
									@click.native="selectPatient = item">
									<view style="width: 50%;text-align: left;">{{item.patientName}}</view>
									<view style="width: 50%;text-align: right;" class="text-right">
										{{item.cardNumber}}
									</view>
								</view>
							</div>
						</view>

					</view>
					<view style="display: flex;padding:10px .3rem 10px .3rem;" class="patient-container-row">
						<view style="width: 50%;text-align: left;">就诊号</view>
						<view style="width: 50%;text-align: right;" class="text-right red-font">
							{{selectPatient.cardNumber}}
						</view>
					</view>
					<view style="display: flex;" class="patient-container-row">
						<view style="font-size:12px;color:red;width: 10%;">注意</view>
						<view class="text-right red-font" style="font-size:12px;color:red;width: 90%;">
							如需退号请在挂号时间点前半个小时进行退号，过期不退！
						</view>
					</view>
				</div>
			</uni-card>
			<div class="anniu">
				<button type="primary" style="width: 100%;height: 60%;" @click="dialog()">提 交</button>
				<!-- <zg-button type="primary" @click="dialog()" class="tijiaoanniu" block size="base">
					提 交
				</zg-button> -->
				<!-- <el-button class="submit-btn" @click="dialog()">提 交</el-button> -->
			</div>

			<!-- 挂号提示书弹出框，设置点击空白不会退出 is_mask="true" maskFun="false"，无关闭按钮 is_close="false"-->
			<pop ref="popo" direction="center" :width="80" height="fit-content">
				<view class="biaoti">
					提示
				</view>
				<view class="neirong-wai">
					<view class="neirong" style="padding: .5rem;">
						<text>挂号成功后请在{{seeDateInfo.seeTime}}前,前往院内自助机打印凭条方便就诊</text>
					</view>
				</view>
				<view class="zizhuanniu">
					<view @click="payRegister()">确 定</view>
				</view>
			</pop>


			<!-- <el-dialog title="提示" :visible.sync="centerDialogVisible" width="70%" center>
				<span>挂号成功后请在{{seeDateInfo.seeTime}}前,前往院内自助机<br>打印凭条方便就诊</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="payRegister">确 定</el-button>
				</span>
			</el-dialog> -->

		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	import '../patient-management/patient-management.scss';
	import './registrationConfirmation.scss';
	import store from "../../store";
	// 引入弹窗组件
	import pop from "@/components/ming-pop/ming-pop.vue";
	export default {
		// 调用头部组件
		components: {
			// header,
			pop
		},
		data() {
			return {
				title: "挂号确认", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,
				isShowText: true, // 控制内容显示
				// 这里是控制点击速度的变量
				lastTime: 0, //默认上一次点击时间为0

				doctorInfo: {},
				registrationDate: '',
				patients: [],
				selectPatient: {},
				showOtherPatient: true,
				centerDialogVisible: false,
				noonID: '',
				noonName: '',
				seeDateInfo: {},
				keshiname: '', //获取vuex中的科室名称
			}
		},
		methods: {
			// 开启弹窗的方法
			dialog() {
				this.$refs.popo.show();
			},

			// 控制动画的方法
			showMore() {
				//获取当前时间的时间戳

				let now = new Date().valueOf();

				//第一次点击
				// 控制两秒内点击多次只触发一次方法
				if (this.lastTime == 0) {

					console.log('触发事件');
					// 控制显示
					this.showOtherPatient = !this.showOtherPatient

					// 先展开500毫秒后再显示文字,收缩200毫秒后再隐藏文字
					if (this.isShowText) {
						setTimeout(() => {
							this.isShowText = !this.isShowText
						}, 500)
					} else {
						setTimeout(() => {
							this.isShowText = !this.isShowText
						}, 900)
					}
					this.lastTime = now;

				} else {

					if ((now - this.lastTime) > 2000) {

						//重置上一次点击时间，2000是我自己设置的2秒间隔，根据自己的需要更改
						// 控制显示
						this.showOtherPatient = !this.showOtherPatient

						// 先展开500毫秒后再显示文字,收缩200毫秒后再隐藏文字
						if (this.isShowText) {
							setTimeout(() => {
								this.isShowText = !this.isShowText
							}, 500)
						} else {
							setTimeout(() => {
								this.isShowText = !this.isShowText
							}, 900)
						}
						this.lastTime = now;

						console.log('间隔大于2秒，触发方法');

						//添加自己要调用的方法

					} else {
						uni.showToast({
							title: '点的太快啦！QAQ',
							icon: 'none',
							duration: 2000
						});
						console.log('不触发');

					}

				}
			},

			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},

			getPatientInfo() {
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
					}
				]
				this.patients = data;
				this.selectPatient = data[0];
			},
			payRegister() {
				// 关闭弹窗
				this.$refs.popo.close();
				uni.navigateTo({
					url: '/pages/paymentPage/paymentPage?orderNo=' + 1
				});

				// _this.$router.push('/paymentPage?orderNo=' + 1);

			}
		},
		// 这是uni的生命周期
		// 在uniapp中如果要使用路由传参必须使用onload(路由传参中的参数值)
		onLoad(e) {
			console.log(e);
			let doctorInfo = decodeURIComponent(e.doctorInfo);
			this.doctorInfo = JSON.parse(doctorInfo);
			this.registrationDate = e.date;
			this.noonName = e.noonName;
			this.seeDateInfo = JSON.parse(decodeURIComponent(e.seeInfo));
			this.jiazai()
		},
		onShow() {
			this.jiazai()
		},
		mounted() {
			this.getPatientInfo();
			//获取vuex中的科室名称
			this.keshiname = store.state.keshiname;
			this.jiazai()
			console.log(this.doctorInfo, this.registrationDate, this.noonName, this.seeDateInfo)
		},
	};
</script>

<style scoped>
	/* 	.header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */
	/* 
	.zhuti {
		margin-top: 190rpx;
	} */

	.zhuti>>>.uni-card {
		padding: 0 !important;
	}

	/* 动画样式 */
	/* 点击更多的样式 */
	.show-more {
		width: 100%;
		height: 1px;
		transition: height 1s;
		-moz-transition: height 1s;
		/* Firefox 4 */
		-webkit-transition: height 1s;
		/* Safari and Chrome */
		-o-transition: height 1s;
		/* Opera */
	}

	/* 动画样式 */
	.show-more-click {
		height: 2.5rem;
	}

	.biaoti {
		font-size: 18px;
		font-weight: 800;
		text-align: center;
		margin-bottom: 10px;

	}

	.neirong-wai {
		border-top: 1px solid rgb(212, 212, 212);
		border-bottom: 1px solid rgb(212, 212, 212);
	}

	.zizhuanniu {
		color: rgb(0, 147, 255);
		padding: 0;
		margin-top: 10px;
		text-align: center;
		width: 100%;
		font-size: 16px;
		font-weight: 800;
	}

	.anniu {
		width: 65%;
		height: 80px;
		margin: 0 auto;
		display: flex;
	}
</style>
