<template>
	<div>
		<div class="record-container">
			<div class="record-item" v-for="item in listData" @click="goToDetail(item)">
				<img class="icon-success" v-if="item.paymentstatusId == 3010" src="../../static/icon-success.png">
				<img class="icon-success" v-else src="../../static/yes-yi.png">
				<div class="record-right">
					<div>
						<div>{{ item.paymentstatusId == 3010 ? '缴费成功' : '缴费失败' }}</div>
						<div class="item-bot">{{ item.patientName || '-' }}</div>
					</div>
					<div style="text-align: right">
						<div style="color: #EB7C00">￥{{ item.payMount || 0 }}</div>
						<div class="item-bot">{{ item.paymentTime }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "payment-record",
		data() {
			return {
				listData: []
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				this.$myRequest({
					url: '/hospt/getWechatOrderList',
				}).then(data => {
					this.listData = data.data
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			goToDetail(item) {
				uni.navigateTo({
					url: '/pages/register-success/register-success?orderDetail=' + JSON.stringify(item) +
						'&backGo=-1'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.record-container {
		.record-item {
			background: #FFFFFF;
			border-bottom: 1px solid #E2E3E4;
			padding: .3rem .5rem;
			display: flex;
			align-items: center;

			.icon-success {
				width: 1rem;
				height: 1rem;
				margin-right: .5rem;
			}

			.record-right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: .25srem;

				.item-bot {
					color: #DFE0E1;
					margin-top: .2rem;
				}
			}
		}
	}
</style>
