<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="info-container">
				<div class="info">尊敬的先生（女士）：</div>
				<div class="info">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢您信任并选择到我院就诊，为了携手共同营造更好的医疗服务环境，恳请您就本次就诊感受做出评价，；留下宝贵意见。感谢合作与支持，祝健康、快乐。
				</div>
			</div>
			<div class="question-list">

				<uni-row class="list-item" v-for="(item, index) in questionList" v-bind:key="index">
					<view style="display: flex;">
						<view style="width: 10%;" class="item-num">{{index + 1}}. </view>
						<view style="width: 90%;">{{item.title}}</view>
					</view>
					<div style="width: 90%;margin-left: 10%;">
						<!-- <radio-group @change="ceshi($event,item)">
							<radio value="1" color="#409EFF" style="transform: scale(0.9);margin-left:5px;">
								满意
							</radio>
							<radio value="2" color="#409EFF" style="transform: scale(0.9);margin-left:5px;">
								基本满意
							</radio>
							<radio value="3" color="#409EFF" style="transform: scale(0.9);margin-left:5px;">
								不满意
							</radio>

						</radio-group> -->
						<div :span="22" :offset="2" :class="{'select-font': questionList[index].status === 1}"
							@click.native="questionList[index].status = 1">满意</div>
						<div :span="22" :offset="2" :class="{'select-font': questionList[index].status === 2}"
							@click.native="questionList[index].status = 2">基本满意</div>
						<div :span="22" :offset="2" :class="{'select-font': questionList[index].status === 3}"
							@click.native="questionList[index].status = 3">不满意</div>
					</div>
				</uni-row>

				<uni-row class="list-item">
					<view style="display: flex;">
						<view style="width: 10%;" class="item-num">12. </view>
						<view style="width: 90%;">根据您的感受，会向亲朋推荐我院吗？</view>
					</view>
					<view style="width: 90%;margin-left: 10%;">
						<!-- <radio-group @change="tuijian">
							<radio value="1" color="#409EFF" style="transform: scale(0.9);margin-left:5px;">
								会
							</radio>
							<radio value="2" color="#409EFF" style="transform: scale(0.9);margin-left:5px;">
								不会
							</radio>
						</radio-group> -->
						<view :span="22" :offset="2" :class="{'select-font': isRecommend === 1}"
							@click.native="isRecommend = 1">会</view>
						<view :span="22" :offset="2" :class="{'select-font': isRecommend === 2}"
							@click.native="isRecommend = 2">不会</view>
					</view>
				</uni-row>
				<uni-row class="list-item">
					<view style="display: flex;">
						<view style="width: 10%;" class="item-num">13. </view>
						<view style="width: 90%;">选择我院就医的原因？</view>
					</view>
					<view style="width: 90%;margin-left: 10%;">
						<view :span="22" :offset="2">
							<checkbox-group @change="check">
								<view>

								</view>
								<checkbox value="医疗技术" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								医疗技术
								<checkbox value="服务质量" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								服务质量

								<checkbox value="媒体宣传" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								媒体宣传

								<checkbox value="亲朋介绍" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								亲朋介绍

							</checkbox-group>
							<!-- <el-checkbox-group v-model="checkListOne">
								<el-checkbox label="医疗技术" class="checkout-item"></el-checkbox>
								<el-checkbox label="服务质量" class="checkout-item"></el-checkbox>
								<el-checkbox label="媒体宣传" class="checkout-item"></el-checkbox>
								<el-checkbox label="亲朋介绍" class="checkout-item"></el-checkbox>
							</el-checkbox-group> -->
						</view>
					</view>
				</uni-row>
				<uni-row class="list-item">
					<view style="display: flex;">
						<view style="width: 10%;" class="item-num">14. </view>
						<view style="width: 90%;">您认为我们需改进哪一方面会使您感到满意？</view>
					</view>
					<view style="width: 90%;margin-left: 10%;">
						<view :span="22" :offset="2">
							<checkbox-group @change="check">
								<checkbox value="医院环境" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								医院环境
								<checkbox value="服务质量" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								服务质量

								<checkbox value="医疗水平" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);" />
								医疗水平

								<checkbox value="其他" class="checkout-item" color="#409EFF"
									style="transform: scale(0.9);margin-left: 5rpx;" />
								其他

							</checkbox-group>
							<!-- <el-checkbox-group v-model="checkListOne">
								<el-checkbox label="医院环境" class="checkout-item"></el-checkbox>
								<el-checkbox label="服务质量" class="checkout-item"></el-checkbox>
								<el-checkbox label="医疗水平" class="checkout-item"></el-checkbox>
								<el-checkbox label="其他" class="checkout-item"></el-checkbox>
							</el-checkbox-group> -->
						</view>
					</view>
				</uni-row>
				<uni-row class="list-item">
					<view style="display: flex;">
						<view style="width: 10%;" class="item-num">15. </view>
						<view style="width: 90%;">您的建议或意见？</view>
					</view>
					<view style="width: 80%;margin-left: 10%;">
						<textarea v-model="proposal" placeholder="请输入..." style="width: 100%;" />
						<!-- <view :span="22" :offset="2">
							<el-input type="textarea" :rows="5" placeholder="请输入..." v-model="proposal">
							</el-input>
						</view> -->
					</view>
				</uni-row>
			</div>
			<div class="submit-btn">提 交</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "满意度问卷", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				questionList: [{
						title: '您在就诊期间对医院的整体印象如何？',
						status: null
					},
					{
						title: '您对导诊人员的服务是否满意？',
						status: null
					},
					{
						title: '您对挂号收费人员的服务是否满意？',
						status: null
					},
					{
						title: '您对医生的服务是否满意？',
						status: null
					},
					{
						title: '您对护士的服务是否满意？',
						status: null
					},
					{
						title: '您对药局人员的服务是否满意？',
						status: null
					},
					{
						title: '您对检验科室（放射线科、检验科、超声科、内镜科、心功能科等医辅科室）人员的服务是否满意？',
						status: null
					},
					{
						title: '您对预约挂号窗口服务是否满意？',
						status: null
					},
					{
						title: '您对电话预约挂号服务是否满意？',
						status: null
					},
					{
						title: '您对放线科、核医学科、超声科、内镜科、心功能科的预约服务是否满意？',
						status: null
					},
					{
						title: '您对我院物业人员（保洁人员、电梯人员、保安人员）服务是否满意？',
						status: null
					}
				],
				isRecommend: null,
				checkListOne: [],
				proposal: '',
			}
		},
		methods: {
			check(val) {
				this.checkListOne = val.detail.value
				this.List = this.checkListOne;
				console.log(this.List);
			},
		},
		mounted() {

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
		margin-top: 170rpx;
	} */

	.satisfaction {
		height: 100%;
		background: #FFFFFF;
		overflow-y: auto;
	}

	.info-container {
		background: #eeeeee;
		padding: .2rem .5rem;
	}

	.info,
	.question-list,
	.checkout-item {
		font-size: 16px;
		line-height: 25px;
		color: #2b2b2b;
	}

	.list-item {
		padding: .3rem .3rem 0 .3rem;
		line-height: .6rem;
	}

	.item-num {
		text-align: right;
		padding-right: .2rem;
	}

	.select-font {
		color: #008cfe;
	}

	.submit-btn {
		width: 80%;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #FFFFFF;
		font-size: 14px;
		margin: 20px auto 40px;
		background: #008cfe;
		border-radius: 5px;
	}

	.question-list>>>.uni-row {
		margin-top: 10px !important;
	}
</style>
