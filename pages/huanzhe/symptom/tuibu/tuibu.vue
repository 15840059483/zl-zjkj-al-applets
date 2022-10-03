<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask=true></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- 	<view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="biaoti"><span>推荐科室</span></div>
			<div class="demo-collapse">
				<!-- uni手风琴下拉效果 -->
				<uni-collapse accordion v-model="activeName">
					<!-- 通过zhengzhuang循环渲染列表，这个循环的主键是zhengzhuang中的name -->
					<view accordion v-for="item in zhengzhuang" v-bind:key="item.name">
						<!-- 使这个列表的表头为zhengzhuang中的name -->
						<uni-collapse-item :title="item.name">
							<!-- 这里通过上面循环的数组中的tuijiankeshi对象数组再次循环，主键为索引，
						每次循环都会显示zhengzhuang数组中的tuijiankeshi中的[索引位置] -->
							<div class="keshi" v-for="(tuijianxiangmu, index) in item.tuijiankeshi" v-bind:key="index"
								@click="tiaozhuan(item.tuijiankeshi[index])">
								<span>{{ item.tuijiankeshi[index] }}</span>
								<div class="juli">
									<text class="iconfont icon-youjiantou"></text>
								</div>
							</div>
						</uni-collapse-item>
					</view>
				</uni-collapse>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入scss组件
	import "../toubu/toubukeshi.scss";
	// 引入VueX组件
	import store from "../../../../store";
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	export default {
		// 调用头部组件
		components: {
			// header
		},
		// 计算属性
		computed: {

		},
		data() {
			return {
				title: "提交审核", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,

				activeName: 1, // 下拉列表的双向绑定
				keshiname: "", //科室名称
				 //症状以及推荐的科室
				      zhengzhuang: [
				        {
				          name: "腿痛",
				          tuijiankeshi: ["关节外科","骨科","脊柱外科","康复科","疼痛科","血管外科","内分泌科"],
				        },
				        {
				          name: "脚痛 ",
				          tuijiankeshi: ["骨科","关节外科","关节科"],
				        },
				        {
				          name: "膝盖运动损伤",
				          tuijiankeshi: ["骨科","关节外科","运动医学"],
				        },
				        {
				          name: "膝关节疼痛",
				          tuijiankeshi: ["骨科","关节外科"],
				        },
				        {
				          name: "膝关节疼痛伴有其他关节疼痛",
				          tuijiankeshi: ["骨关节外科"],
				        },
				        {
				          name: "外伤",
				          tuijiankeshi: ["创伤骨科","骨科","急诊","创伤科"],
				        },
				        {
				          name: "下肢静脉曲张",
				          tuijiankeshi: ["血管外科"],
				        },
				        {
				          name: "脚肿、腿肿",
				          tuijiankeshi: [
				            "普通外科"
				          ],
				        },
				        {
				          name: "儿童症状",
				          tuijiankeshi: ["儿科"],
				        },
				      ],
			}
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
			// 跳转到对应的科室，这里的参数为科室名称
			tiaozhuan(keshiname) {
				// 根据if限制keshiname必须等于对应的科室才可以跳转
				// if (keshiname == "神经内科") {
				uni.navigateTo({
					url: '/pages/makeAppointmentRegister/makeAppointmentRegister'
				});
				// this.$router.push("/pages/makeAppointmentRegister/makeAppointmentRegister");
				// }
				console.log(keshiname);
				// 这里通过vuexkeshiname的方法将科室名称存进了vuex
				store.commit("keshiname", keshiname);
			},
			// 让dongtai变量的值等于症状中的症状名称
			dongtainame() {
				this.dongtai = this.zhengzhuang.name;
				console.log(this.dongtai);
			},
		},
		// 这是uni的生命周期
		onLoad() {
			this.jiazai()
		},
		onShow() {
			this.jiazai()
		},
		mounted() {
			//让页面一加载就执行下面两个方法
			this.dongtainame();
			this.jiazai();

		},
	};
</script>

<style scoped>
	/* .header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

	/* 	.zhuti {
		margin-top: 190rpx;
	}
 */
	.biaoti {
		width: 100%;
		height: 35px;
		background-color: #fff;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		line-height: 35px;
		color: rgb(120, 120, 120);
	}

	.keshi {
		display: flex;
		width: 100%;
		height: 50px;
		padding: 0;
		margin: 0;
		/* margin-top: 10px; */
		border-top: 1px solid #ccc;
	}

	.keshi>span {
		line-height: 50px;
		padding-left: 20px;
		font-size: 16px;
		color: rgb(120, 120, 120);
	}

	.juli {
		width: 50px;
		height: 50px;
		line-height: 50px;
		margin: 0 0 0 auto;
		/* background: sandybrown; */
		text-align: center;
	}

	.juli>>>text {
		color: #ccc;
	}
</style>
