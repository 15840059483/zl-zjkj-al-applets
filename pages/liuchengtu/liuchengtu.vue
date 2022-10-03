<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view style="padding: .2rem;">
			<!-- 抚顺市传染病医院核酸检测须知的弹出框，设置点击空白不会退出 is_mask="true" maskFun="false"，无关闭按钮 is_close="false"-->
			<pop ref="pop" direction="center" :is_close="false" :is_mask="true" :width="80" height="fit-content"
				:maskFun="false">
				<view class="biaoti">
					抚顺市传染病医院核酸检测须知
				</view>
				<view class="neirong-wai">
					<view class="neirong">
						一.按照《医保办发（2021）45号》文件规定，普通患者及健康筛查人群新冠核酸检测可采取单管采样、多人混检采样等不同采样方式进行检测
					</view>
					<view class="neirong">
						二.为减轻经济负担，我院目前普通患者及健康筛查人群采取多人混检采样，收费3.2元
					</view>
					<view class="neirong">三.但以下患者仍需单管采样，收费16元</view>
					<view class="neirong">1、发热门诊患者</view>
					<view class="neirong">2、新冠感染高风险人员。</view>
					<view style="padding-bottom: 10px;" class="neirong">3、急危重患者紧急送检，难以实现多人混检采样者</view>
				</view>
				<view class="anniu">
					<view @click="guanbi()">同意并阅读</view>
				</view>
			</pop>

			<!-- <el-dialog title="抚顺市传染病医院核酸检测须知" :showClose="false" :close-on-click-modal="false"
				:visible.sync="dialogVisible" width="93%" custom-class="dialogClass">
				<p>
					一.按照《医保办发（2021）45号》文件规定，普通患者及健康筛查人群新冠核酸检测可采取单管采样、多人混检采样等不同采样方式进行检测
				</p>
				<p>
					二.为减轻经济负担，我院目前普通患者及健康筛查人群采取多人混检采样，收费3.2元
				</p>
				<p>三.但以下患者仍需单管采样，收费16元</p>
				<p>1、发热门诊患者</p>
				<p>2、新冠感染高风险人员。</p>
				<p>3、急危重患者紧急送检，难以实现多人混检采样者</p>
				<view >
					<p @click="dialogVisible = false">同意并阅读</p>
				</view>
			</el-dialog> -->

			<div class="wai">
				<div class="tu">
					<uni-card class="wenzi" v-if="suoyin == 0">
						<div style="margin-top: 5px; margin-left: 10px">
							<span>步骤一：</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>1.扫描二维码或关注抚顺市传染病医院公众号</span>
						</div>
					</uni-card>
					<uni-card class="wenzi" v-if="suoyin == 1">
						<div style="margin-top: 3px; margin-left: 10px">
							<span>步骤二：</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>1.（选择诊疗服务-智慧医院-核酸检测）</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>2.注册个人信息（填写姓名、手机号、身份证18位）</span>
						</div>
					</uni-card>
					<uni-card class="wenzi" v-if="suoyin == 2">
						<div style="margin-top: 3px; margin-left: 10px">
							<span>步骤三：</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>1.选择核酸检测（混检）3.2元</span>
						</div>
					</uni-card>
					<uni-card class="wenzi" v-if="suoyin == 3">
						<div style="margin-top: 3px; margin-left: 10px">
							<span>步骤四：</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>1.确认收费信息</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>2.点击确认生成病历号</span>
						</div>
					</uni-card>
					<uni-card class="wenzi" v-if="suoyin == 4">
						<div style="margin-top: 3px; margin-left: 10px">
							<span>步骤五：</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>1.支付</span>
						</div>
					</uni-card>
					<uni-card class="wenzi" v-if="suoyin == 5">
						<div style="margin-top: 3px; margin-left: 10px">
							<span>步骤六：</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>1.出示缴费成功证明</span>
						</div>
						<div style="margin-top: 3px; margin-left: 10px">
							<span>2.至采样点采样。（有检验报告及发票，发票到8号楼门诊收费窗口换开，检验报告可在8号楼门诊大厅自助机打印）</span>
						</div>
					</uni-card>
					<!-- 根据动态绑定class来切换流程图 -->
					<uni-card style="margin-bottom: 10px;">
						<div :class="liucheng"></div>
					</uni-card>
				</div>
			</div>

		</view>

		<view class="dian">
			<div class="shangyibu">
				<view @click="shangyibu()">上一步</view>
			</div>
			<div class="xiayibu">
				<view @click="xiayibu()">下一步</view>
			</div>
		</view>
	</view>


</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入弹窗组件
	import pop from "@/components/ming-pop/ming-pop.vue";
	export default {
		// 注册使用导航栏组件，弹窗组件
		components: {
			// header,
			pop
		},
		data() {
			return {
				title: "就诊码", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				suoyin: 0, // 第几步的索引
				liucheng: "", // 某一步的class名
				// 流程名数组
				class: ["class1", "class2", "class3", "class4", "class5", "class6"],

				// dialogVisible: false, //抚顺市传染病医院核酸检测须知的弹出框双向绑定的值，当这个值变为true的时候弹出框打开
			}
		},
		methods: {
			// 关闭弹窗
			guanbi() {
				this.$refs.pop.close()
			},
			// 加载动画的方法
			// jiazai() {
			//   let loadingInstance = Loading.service({});
			//   loadingInstance.close();
			// },
			// 下一步的方法
			xiayibu() {
				this.suoyin++;
				if (this.suoyin < this.class.length) {
					this.liucheng = this.class[this.suoyin];
					console.log(this.liucheng);
				} else {
					this.suoyin = 0;
					this.liucheng = this.class[0];
				}
			},

			// 上一步的方法
			shangyibu() {
				if (this.suoyin == 0) {
					uni.showToast({
						title: '这是第一步哦~！',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.suoyin--;
					this.liucheng = this.class[this.suoyin];
					console.log(this.liucheng);
				}
			},
		},
		mounted() {
			// 刚进入此页面就展示加载动画
			// this.jiazai();
			// 刚进入此页面展示第一张流程图
			this.liucheng = this.class[0];
			// 刚进入此页面就打开弹窗
			// this.dialogVisible = true;
			this.$refs.pop.show();
		},
	}
</script>

<style scoped>
/* 	.header {
		position: fixed;
		top: 0;
		z-index: 999;
	}
 */
	/* .zhuti {
		margin-top: 200rpx;
	} */


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

	.neirong {
		margin-top: 5px;
	}

	.anniu {
		color: rgb(0, 147, 255);
		padding: 0;
		margin-top: 10px;
		text-align: center;
		width: 100%;
		font-size: 16px;
		font-weight: 800;
	}

	.class1 {
		height: 320px;
		background-image: url(https://s1.ax1x.com/2022/09/06/v7hwm4.jpg);
		background-size: 100% 100%;

	}

	.class2 {
		height: 400px;
		background-image: url(https://s1.ax1x.com/2022/09/06/v7hB79.png);
		background-size: 100% 100%;

	}

	.class3 {
		height: 270px;
		background-image: url(https://s1.ax1x.com/2022/09/06/v7hrkR.png);
		background-size: 100% 100%;

	}

	.class4 {
		height: 380px;
		background-image: url(https://s1.ax1x.com/2022/09/06/v7h00J.png);
		background-size: 100% 100%;

	}

	.class5 {
		height: 420px;
		background-image: url(https://s1.ax1x.com/2022/09/06/v7haXF.png);
		background-size: 100% 100%;

	}

	.class6 {
		height: 450px;
		background-image: url(https://s1.ax1x.com/2022/09/06/v7hU6U.png);
		background-size: 100% 100%;

	}

	/* 	div[class^="class"] {
		width: 368px;
		margin: 0 auto;
	} */

	.wai {
		width: 100%;
		/* height: 1500rpx; */
		margin-top: 45rpx;
		margin-bottom: 70px;
		/* background-color: sandybrown; */
	}

	.tu {
		width: 100%;
		/* height: 700px; */
		/* background-color: red; */
	}

	.dian {
		width: 100%;
		height: 50px;
		display: flex;
		border-top: 1px solid rgb(212, 212, 212);
		position: fixed;
		z-index: 1;
		bottom: 0rpx;
		background-color: #fff;
		/* background-color: slateblue; */
	}

	.shangyibu,
	.xiayibu {
		width: 50%;
		height: 30px;
		margin-top: 10px;
		text-align: center;
	}

	.shangyibu {
		border-right: 1px solid rgb(212, 212, 212);
	}

	.wenzi {
		margin: 0 auto;
		width: 368px;
		height: 125px;
		font-weight: 800;
		font-size: 16px;
		margin-block: 10px;
		border-radius: 10px;
		background-color: #fff;
	}

	.dian {
		font-weight: 800;
		color: rgb(0, 142, 254);
	}
</style>
