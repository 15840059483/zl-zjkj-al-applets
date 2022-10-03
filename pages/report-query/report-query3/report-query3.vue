<template>
	<view>
		<view class="zhuti">
			<template v-for="item in sampleList">
				<div class="query3-infocon">
					<p>检验报告</p>
					<div class="query3-info">
						<div>
							<p>姓名</p>
							<p>{{item.patientname}}</p>
						</div>
						<div>
							<p>性别</p>
							<p>{{item.patientsex}}</p>
						</div>
						<div>
							<p>年龄</p>
							<p>{{item.patientage}}</p>
						</div>
					</div>
				</div>

				<div class="center doctor7-center" style="margin: 1rem 0;">
					<div>
						<div>开方医生</div>
						<div>{{item.doctorname}}</div>
					</div>
					<div>
						<div>开方科室</div>
						<div>{{item.deptname}}</div>
					</div>
					<div>
						<div>报告时间</div>
						<div>{{item.sampletime}}</div>
					</div>
					<div>
						<div>报告单号</div>
						<div>{{item.barcode}}</div>
					</div>
				</div>
			</template>
			<view class="liebiao">
				<uni-table class="query3-uni-table">
					<uni-tr class="query3-theader">
						<uni-td>检查项目</uni-td>
						<uni-td>结果</uni-td>
						<uni-td>参考值</uni-td>
					</uni-tr>
					<uni-tr v-for="item in resultList">
						<uni-td>{{item.itemname}}</uni-td>
						<uni-td>{{item.rangeinfo}}</uni-td>
						<uni-td v-if="item.Color=='blue'" style="color: rgb(0,142,254)">
							{{item.reportvalue}}&nbsp{{item.resultflag}}
						</uni-td>
						<uni-td v-if="item.Color=='red'" :class="item.Color=='red'?red:black" style="color: red">{{item.reportvalue}}&nbsp{{item.resultflag}}</uni-td>
						<uni-td v-if="item.Color=='black'">{{item.reportvalue}}</uni-td>
					</uni-tr>
				
				</uni-table>
			</view>
			
		</view>
	</view>
</template>

<script>
	import './report-query3.css'
	export default {
		// 调用头部组件
		components: {
			
		},
		data() {
			return {
				title: "挂号确认", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				sampleList: {},
				resultList: {},
			}
		},
		methods: {

		},
		// 这是uni的生命周期
		// 在uniapp中如果要使用路由传参必须使用onload(路由传参中的参数值)
		onLoad(e) {
			console.log(e);
			this.sampleList = JSON.parse(decodeURIComponent(e.sampleList));
			this.resultList=JSON.parse(decodeURIComponent(e.resultList));
			console.log(this.sampleList,this.resultList)
		},
		mounted() {

		},
	};
</script>

<style scoped>

</style>
