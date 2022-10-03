<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask=true></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header title="调查问卷" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="survey-container" style="margin-top: .5rem">
				<div class="survey-info">
					<div style="width: 30%">姓名</div>
					<div style="flex: 1;width: 70%;text-align: right;"><input style="width: 100%;border: none;outline: none" v-model="name"></input>
					</div>
				</div>
				<div class="survey-info">
					<div style="width: 30%">联系电话</div>
					<div style="flex: 1;width: 70%;text-align: right;"><input style="width: 100%;border: none;outline: none" v-model="iPhone"></input>
					</div>
				</div>
				<div class="survey-info">
					<div style="width: 30%">身份证号</div>
					<div style="flex: 1;width: 70%;text-align: right;"><input style="width: 100%;border: none;outline: none" v-model="cardNo"></input>
					</div>
				</div>
				<div class="survey-info">
					<div>人员类型</div>
					<div>
						<radio-group @change="radioChange ">
							<radio :checked="state==='患者'?true:false" value="患者" color="#409EFF"
								style="transform: scale(0.9);"/>患者
							
							<radio :checked="state==='家属'?true:false" value="家属" color="#409EFF"
								style="transform: scale(0.9);"/>家属
							
							<!-- <input type="radio" id="huanZhe" name="person-type" value="患者" v-model="state">
						<label for="huanZhe">患者</label>
						<input type="radio" id="jiaShu" name="person-type" value="家属" v-model="state">
						<label for="jiaShu">家属</label> -->
						</radio-group>
					</div>
				</div>
			</div>
			<div class="survey-container">
				<div v-for="item in title" v-bind:key="item.id" :ref="item.id+'A'">
					<div class="margin-bot" :id="item.id">{{item.queue}}、{{item.titleName}}</div>
					<radio-group>

						<div class="margin-bot" v-for="items in answer" v-bind:key="items.id"
							v-if="item.id==items.titleId" :ref="item.id">
							<radio v-if="item.tileType=='0'" :checked="items.answerType=='0'" :id="items.id"
								:name="item.id" :value="items.answerType" color="#409EFF"
								@click="check($event,items,item.id)" style="transform: scale(0.7);" />
							<label v-if="item.tileType=='0'" :for="items.id"
								@click="check($event,items,item.id)">{{items.answerName}}</label>
							<checkbox-group @change="check($event,items,item.id)">
								<checkbox v-if="item.tileType!='0'" :checked="items.answerType=='0'" :id="items.id"
									:name="item.id" :value="items.answerType" color="#409EFF"
									style="transform: scale(0.7);" />
								<label v-if="item.tileType!='0'" :for="items.id">{{items.answerName}}</label>
							</checkbox-group>
						</div>

					</radio-group>
				</div>


				<div class="margin-bot from-tip">备注：填写问卷人承诺上述情况属实，如有隐瞒，愿承担法律责任。</div>
			</div>
			<div class="survey-submit" @click="submit">提 交</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss样式
	import './survey-new-coupons.scss'
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				// title: "调查问卷", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				title: [],
				answer: [],
				answers: [],
				name: '伶俐的狐狸',
				cardNo: '21000111101',
				state: '患者',
				iPhone: '158999999',
				ceshi: [],
				zhuangtai: false,
				loading: true,
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

			// 单选按钮的改变事件方法
			radioChange(val) {
				console.log(val);
				this.state = val.detail.value;
			},

			ceshibiaodan(el, item, titleId) {
				console.log(el);
				console.log(item);
				console.log(el);
			},

			submit() {
				if (!this.name) {
					// this.$message.error('请填写姓名')
					uni.showToast({
						title: '请填写姓名',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (!this.iPhone) {
					// this.$message.error('请填写手机号')
					uni.showToast({
						title: '请填写手机号',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (!this.cardNo) {
					// this.$message.error('请填写身份证')
					uni.showToast({
						title: '请填写身份证',
						icon: 'none',
						duration: 2000,
					});
					return
				}
				if (!this.state) {
					// this.$message.error('请选择角色')
					uni.showToast({
						title: '请选择角色',
						icon: 'none',
						duration: 2000,
					});
					return
				}

				// if (!this.submitcheck()) {
				// 	// this.$message.error('请完善问卷调查')
				// 	uni.showToast({
				// 		title: '请完善问卷调查',
				// 		icon:'none',
				// 		duration: 2000,
				// 		});
				// 	return
				// }
				console.log(this.$refs)

				let map = this.$refs;
				let l = [];
				let state = '0';
				for (var key in map) {
					//console.log("属性：" + key + ",值：" + this.$refs[key] Array.from());
					if (key.indexOf('A') != -1) {
						//console.log(map[key][0].children)
						let info = {
							titleName: '',
							titleId: '',
							answerName: [],
							answerValue: [],
							answerId: []
						};
						Array.from(map[key][0].children).forEach((an, index) => {
							if (index == 0) {
								info.titleName = an.innerText
								info.titleId = key.replace("A", "")
							} else {
								//console.log(index+"####"+an.children[0].checked)
								if (an.children[0].checked) {
									info.answerName.push(an.children[1].innerText)
									info.answerValue.push(an.children[0].value)
									info.answerId.push(an.children[0].id)
									if (an.children[0].value === '1') {
										state = '1'
									}
									// console.log( an.children[0].value)
									// console.log( an.children[0].id)
								}
							}

						})
						l.push(info);

					}

				}
				let result = {};
				let info = {
					name: this.name,
					cardNo: this.cardNo,
					iPhone: this.iPhone,
					state: this.state,
					date: this.formatDate('YY-MM-DD hh:mm:ss')
				}
				result.info = info
				result.item = l;
				result.state = state;
				console.log(result)
				this.$router.push({
					name: 'SurveyResults',
					query: {
						result: encodeURIComponent(JSON.stringify(result))
					}
				})
			},
			formatDate(fmt) {
				const date = new Date()
				const o = {
					'Y+': date.getFullYear(),
					'M+': date.getMonth() + 1, // 月
					'D+': date.getDate(), // 日
					'h+': date.getHours(), // 时
					'm+': date.getMinutes(), // 分
					's+': date.getSeconds(), // 秒
					W: date.getDay() // 周
				}
				for (let k in o) {
					if (new RegExp('(' + k + ')').test(fmt)) {
						fmt = fmt.replace(RegExp.$1, () => {
							if (k === 'W') {
								// 星期几
								const week = ['日', '一', '二', '三', '四', '五', '六']
								return week[o[k]]
							} else if (k === 'Y+' || RegExp.$1.length === 1) {
								// 年份 or 小于10不加0
								return o[k]
							} else {
								return ('00' + o[k]).substr(('' + o[k]).length) // 小于10补位0
							}
						})
					}
				}
				return fmt
			},
			submitcheck() {
				let map = this.$refs;
				let type = 0;
				for (var key in map) {
					//console.log("属性：" + key + ",值：" + this.$refs[key] Array.from());
					if (key.indexOf('A') != -1) {
						//console.log(map[key][0].children)
						let info = {};
						let a = Array.from(map[key][0].children)
						let l = [];
						for (let i = 0; i < a.length; i++) {

							if (i > 0 && a[i].children[0].checked) {
								//console.log(a[i])
								l.push(1)
								if (l.length == 1) {
									type = type + 1
								}

								continue
							}
						}
					}

				}
				//console.log(type>=this.title.length)
				if (type < this.title.length) {
					//alert(type);
					//alert(this.title.length);
					return false;
				} else {
					return true
				}
			},

			getList() {
				let data = {
					"answer": [{
							"answerName": "发热（37.3℃以上）",
							"answerType": "1",
							"createTime": "2022-01-19T14:51:39",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#FC0303",
							"id": "1483693619092209665",
							"titleId": "1483689472544555009"
						},
						{
							"answerName": "不发热（37.3℃以下）",
							"answerType": "0",
							"createTime": "2022-01-19T14:53:02",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483693968586784769",
							"titleId": "1483689472544555009"
						},
						{
							"answerName": "是",
							"answerType": "1",
							"createTime": "2022-01-19T14:53:37",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694116670881793",
							"titleId": "1483689729504395266"
						},
						{
							"answerName": "否",
							"answerType": "0",
							"createTime": "2022-01-19T14:53:43",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694140490334209",
							"titleId": "1483689729504395266"
						},
						{
							"answerName": "是",
							"answerType": "1",
							"createTime": "2022-01-19T14:54:11",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694257817600002",
							"titleId": "1483691008280576001"
						},
						{
							"answerName": "否",
							"answerType": "0",
							"createTime": "2022-01-19T14:54:17",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694282517856257",
							"titleId": "1483691008280576001"
						},
						{
							"answerName": "是",
							"answerType": "1",
							"createTime": "2022-01-19T14:54:26",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694319394177026",
							"titleId": "1483692188150874114"
						},
						{
							"answerName": "否",
							"answerType": "0",
							"createTime": "2022-01-19T14:54:30",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694337601650690",
							"titleId": "1483692188150874114"
						},
						{
							"answerName": "云南省德宏州（6月14日以来）",
							"answerType": "1",
							"createTime": "2022-01-19T14:55:33",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694602241261570",
							"titleId": "1483692596256653313"
						},
						{
							"answerName": "陕西西安市（12月1日以来）",
							"answerType": "1",
							"createTime": "2022-01-19T14:55:55",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694694125879297",
							"titleId": "1483692596256653313"
						},
						{
							"answerName": "河南周口市（12月19日以来）",
							"answerType": "1",
							"createTime": "2022-01-19T14:56:24",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694815970410498",
							"titleId": "1483692596256653313"
						},
						{
							"answerName": "河南洛阳市（12月17日以来）",
							"answerType": "1",
							"createTime": "2022-01-19T14:57:11",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483695011756326914",
							"titleId": "1483692596256653313"
						},
						{
							"answerName": "无",
							"answerType": "0",
							"createTime": "2022-01-19T14:56:30",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483694842738458626",
							"titleId": "1483692596256653313"
						},
						{
							"answerName": "有国内新冠疫情中高风险地区旅居史人员接触史（21天内）",
							"answerType": "1",
							"createTime": "2022-01-19T14:58:16",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483695286487433218",
							"titleId": "1483692902617006081"
						},
						{
							"answerName": "有聚集性发病史（2例及以上发热或呼吸道症状病例）（14天内）",
							"answerType": "1",
							"createTime": "2022-01-19T14:58:46",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483695411775488001",
							"titleId": "1483692902617006081"
						},
						{
							"answerName": "无接触史",
							"answerType": "0",
							"createTime": "2022-01-19T14:57:46",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000000",
							"id": "1483695161274875906",
							"titleId": "1483692902617006081"
						},
					],
					"title": [{
							"arrange": "1",
							"createTime": "2022-01-19T14:35:10",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000407",
							"id": "1483689472544555009",
							"queue": "1",
							"tileType": "0",
							"titleName": "一周内是否出现发热症状（单选）"
						},
						{
							"arrange": "0",
							"createTime": "2022-01-19T14:36:11",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000407",
							"id": "1483689729504395266",
							"queue": "2",
							"tileType": "0",
							"titleName": "近一周内是否吃过退烧药（单选）"
						},
						{
							"arrange": "0",
							"createTime": "2022-01-19T14:41:16",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000407",
							"id": "1483691008280576001",
							"queue": "3",
							"tileType": "0",
							"titleName": "患者目前是否有以下症状：发热、味（嗅）觉异常、咳嗽、咳痰、乏力伴有鼻塞、流涕、咽痛、结膜炎、腹泻和听力丧失（单选）"
						},
						{
							"arrange": "0",
							"createTime": "2022-01-19T14:45:57",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000407",
							"id": "1483692188150874114",
							"queue": "4",
							"tileType": "0",
							"titleName": "近两周是否接触过明确新冠病毒感染者（核酸检测阳性者）或发热、咳嗽等症状人群（单选）"
						},
						{
							"arrange": "1",
							"createTime": "2022-01-19T14:47:35",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000407",
							"id": "1483692596256653313",
							"queue": "5",
							"tileType": "1",
							"titleName": "是否有以下地区旅居史（多选）"
						},
						{
							"arrange": "1",
							"createTime": "2022-01-19T14:48:48",
							"creator": "1329673766364340226",
							"delFlag": "0",
							"fontColor": "#000407",
							"id": "1483692902617006081",
							"queue": "6",
							"tileType": "1",
							"titleName": "是否有以下接触史（多选）"
						}
					]
				};
				// let loadingInstance = Loading.service({});

				this.answer = data.answer
				this.title = data.title;
				// loadingInstance.close();
			},
			check(el, item, titleId) {
				console.log(el)
				console.log(item)
				if (item.answerType === '0' && el.currentTarget.checked) {
					this.$refs[titleId].forEach(an => {
						if (an.children[0] != el.currentTarget) {
							an.children[0].checked = false
						}
					})
					//console.log(this.$refs[titleId])
					//console.log(el.currentTarget )
				} else {
					this.$refs[titleId].forEach(an => {
						if (an.children[0].value == '0') {
							an.children[0].checked = false
						}
					})
				}
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
			this.getList()
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
		margin-top: 190rpx;
	} */
</style>
