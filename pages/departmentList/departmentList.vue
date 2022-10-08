<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<view class="zhuti">
			<div class="input-div">
				<!-- 搜索框 -->
				<div class="sousuo">
					<mSearch @search="search($event,0)" button="inside"></mSearch>
				</div>
			</div>
			<div>
				<view v-if="deptList.length>0" v-for="item in deptList" v-bind:key="item.deptId" class="list-item"
					@click.native="goToPage(item.deptId)" style="display: flex;">
					<view style="width: 80%;">{{item.deptName}}</view>
					<view style="width: 20%;text-align: right;" class="text-right">
						<text class="iconfont icon-youjiantou" style="color: #b7b7b7;font-size: 22px;"></text>
					</view>
				</view>			
				<div class="no-list" v-if="deptList.length==0">
					<div>
						<img src="https://s1.ax1x.com/2022/09/28/xe6wLV.png" />
					</div>
					<p>暂未获取到有效科室信息</p>
				</div>
			</div>
			</div>
		</view>
	</view>
</template>

<script>
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
			this['val' + val] = e;
			this.searchText = e;
			this.getDeptInfo();
		},

		getDeptInfo() {
			/*  hospId 医院id  deptName 搜索科室的名称可为空 */
			this.loading = true;
			const params = {
				deptName: this.searchText,
				hospId: this.$hospitalId
			};
			
			/* 获取医院下有效科室的接口 并支持查询搜索功能 */
			this.$myRequest({
				url: "/hospt/getDeptInfo",
				data: params,
			}).then(data => {
				this.deptList = data.data;
				this.loading = false;
			}).catch(err => {
				this.loading = false;
			})

		},
		goToPage(id) {
			uni.navigateTo({
				url: '/pages/makeAppointmentRegister/makeAppointmentRegister?id=' + id,
			});
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
