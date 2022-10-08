<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<view :span="12" class="change-patient-name">
				<button class="change-patient-name-btn" @click="addPatient">添加就诊人</button>
			</view>
			<div class="add-people-num">
				您已添加<span>{{patientList.length}}</span>人，还可添加<span>{{5 - patientList.length}}</span>人
			</div>
			<div class="bg-white patient-container" v-for="item in patientList" v-bind:key="item.id">
				<el-row class="patient-container-row">
					<el-col :span="10">姓名</el-col>
					<el-col :span="14" class="text-right">{{item.patientName}}</el-col>
				</el-row>
				<el-row class="patient-container-row">
					<el-col :span="10">年龄</el-col>
					<el-col :span="14" class="text-right">{{item.patientAge}}</el-col>
				</el-row>
				<el-row class="patient-container-row">
					<el-col :span="10">身份证号</el-col>
					<el-col :span="14" class="text-right">{{item.patientCardId}}</el-col>
				</el-row>
				<el-row class="patient-container-row">
					<el-col :span="10">就诊卡号</el-col>
					<el-col :span="14" class="text-right">{{item.cardNumber}}</el-col>
				</el-row>
				<el-row class="patient-container-row">
					<el-col :span="10">与就诊者关系</el-col>
					<el-col :span="14" class="text-right">{{item.patientRelationship | patientRelationship}}</el-col>
				</el-row>
				<el-row class="patient-radio-row">
					<el-col :span="10">
						<div @click="selectPatient(item)" class="patient-radio-col-l">
							<div class="radio-container">
								<div class="radio-checked" v-if="item.patientId === currentSelectPatient.patientId">
								</div>
							</div>
							当前就诊人
						</div>
					</el-col>
					<el-col :span="14" class="text-right patient-radio-col-r">
						<i class="el-icon-delete" @click="deletePatient(item)"></i>
					</el-col>
				</el-row>
			</div>

			<view name="el-fade-in-linear">
				<div class="confirm-del" v-if="isShowDelConfirm"></div>
			</view>
			<view name="el-fade-in-linear">
				<div class="del-container bg-white" v-if="isShowDelConfirm">
					<el-row class="del-container-row">
						<el-col class="text-center del-container-col">确定要删除该患者吗？</el-col>
					</el-row>
					<el-row>
						<el-col :span="12" class="text-center del-container-col del-container-cancel"
							@click.native="closeConfirm">取消
						</el-col>
						<el-col :span="12" class="text-center del-container-col del-container-del"
							@click.native="confirmDel">删除</el-col>
					</el-row>
				</div>
			</view>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss样式
	import './patient-management.scss'
	export default {
		// 注册使用导航栏组件
		components: {
			// header,
		},
		data() {
			return {
				title: "就诊者管理", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				isShowDelConfirm: false,
				patientList: [],
				currentSelectPatient: {},
				currentDelSelectPatient: {},
			}
		},
		filters: {
			patientRelationship(val) {
				if (!val) return ''
				const arr = [{
						label: '本人',
						value: '1030'
					},
					{
						label: '家属',
						value: '1031'
					},
					{
						label: '同事',
						value: '1032'
					},
					{
						label: '其他',
						value: '1033'
					},
				]
				const obj = arr.filter(item => item.value === val)
				return obj[0].label
			}
		},
		methods: {
			// 由于无接口，所以控制台报错关于无patientService的问题
			getDfltPtCardInfo() {
				this.$myRequest({
					url: "/wechat/user/dfltPtCard/info"
				}).then(data => {
					this.currentSelectPatient = data.data;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			getPatientInfo() {
				this.$myRequest({
					url: "/wechat/user/patientcard/info"
				}).then(data => {
					this.patientList = data.data;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			addPatient() {
				uni.navigateTo({
					url: '/pages/patient-management/add-patient/add-patient'
				})
			},
			selectPatient(item) {
				if (!item || !item.patientId) {
					return;
				}
				const params = {
					patientId: item.patientId
				}
				this.$myRequest({
					url: "/wechat/user/update/patientinfo",
					data: params
				}).then(data => {
					this.getDfltPtCardInfo();
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			deletePatient(item) {
				if (!item.patientId) {
					return;
				}
				this.isShowDelConfirm = true;
				this.currentDelSelectPatient = item;
			},
			closeConfirm() {
				this.$myRequest({
					url: "/wechat/user/deletePtCard/info",
					data: {
						patientId: this.currentDelSelectPatient.patientId
					}
				}).then(data => {
					this.$message.success('删除成功')
					this.getDfltPtCardInfo()
					this.getPatientInfo()
					this.isShowDelConfirm = false;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			confirmDel() {
				this.closeConfirm();
			}
		},
		mounted() {
			this.getDfltPtCardInfo()
			this.getPatientInfo()
		},
	}
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
</style>
