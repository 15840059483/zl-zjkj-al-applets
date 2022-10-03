<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask=true></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="input-div">
				<!-- 搜索框 -->
				<div class="sousuo">
					<mSearch @search="search($event,0)" button="inside"></mSearch>
				</div>
				<!-- <el-input placeholder="搜索" v-model="searchText" @input="getDeptInfo">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input> -->
			</div>
			<div>
				<view v-for="item in deptList" v-bind:key="item.deptId" class="list-item"
					@click.native="goToPage(item.deptId)" style="display: flex;">
					<view style="width: 80%;">{{item.deptName}}</view>
					<view style="width: 20%;text-align: right;" class="text-right">
						<!-- <i class="el-icon-arrow-right"></i> -->
						<text class="iconfont icon-youjiantou" style="color: #b7b7b7;font-size: 22px;"></text>
					</view>
				</view>
			</div>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss文件
	import './departmentList.scss'
	// 引入搜索栏组件
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		// 调用头部组件
		components: {
			// header,
			mSearch
		},
		data() {
			return {
				title: "科室列表", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true, // 加载动画

				searchText: '',
				deptList: []

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

			//搜索栏调用的组件方法
			search(e, val) {
				// console.log(e, val);
				this['val' + val] = e;
				// this.sousuo(e);
				this.searchText = e;
				console.log(this.searchText)
			},

			getDeptInfo() {

				const params = {
					deptName: this.searchText,
					hospId: this.$root.hospitalId
				};
				this.deptList = [{
						"deptId": "0030",
						"deptName": "望花眼门"
					},
					{
						"deptId": "4038",
						"deptName": "准分子"
					},
					{
						"deptId": "0008",
						"deptName": "眼门"
					},
					{
						"deptId": "0007",
						"deptName": "眼门专家"
					}
				]

			},
			goToPage(id) {
				uni.navigateTo({
					url: '/pages/makeAppointmentRegister/makeAppointmentRegister?id=' + id,
				});
				// this.$router.push({
				// 	path: '/makeAppointmentRegister',
				// 	query: {
				// 		id: id
				// 	}
				// });
			}
		},
		// 这是uni的生命周期
		onLoad() {
			this.jiazai()
		},
		onShow() {
			this.jiazai()
		},
		mounted() {
			this.getDeptInfo();
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

	/* .zhuti {
		margin-top: 170rpx;
	} */
</style>
