<template>
	<div>
		<div class="printing-wrapper">
			<div class="printing-title">
				请上传<span>*淑琴</span>的身份证正反面照片
			</div>
			<div class="upload-img-wrapper" @click="image(1)">
				<img src="https://s1.ax1x.com/2022/09/28/xmAWeH.jpg" v-if="!zhengImgSrc">
				<img :src="zhengImgSrc" v-if="zhengImgSrc">
				<!-- <input type="file" accept="image/*" class="upload-input" @change="camera($event, 1)"></input> -->
			</div>
			<div class="upload-img-wrapper" @click="image(2)">
				<img src="https://s1.ax1x.com/2022/09/28/xmAhTA.jpg" v-if="!fanImgSrc">
				<img :src="fanImgSrc" v-if="fanImgSrc">
				<!-- <input type="file" accept="image/*" class="upload-input" @change="camera($event, 2)"></input> -->
			</div>
			<div class="requirement-wrapper">
				<div class="requirement-title">拍摄照片要求</div>
				<div class="requirement-img">
					<div class="requirement-img-item">
						<img src="https://s1.ax1x.com/2022/09/28/xmAIYt.png" style="height: 50px;">
						<div class="requirement-item-font">
							<text class="iconfont icon-check" style="font-size: 12px;"></text>标准拍照
						</div>
					</div>
					<div class="requirement-img-item">
						<img src="https://s1.ax1x.com/2022/09/28/xmAofP.png" style="height: 50px;">
						<div class="requirement-item-font">
							<text class="iconfont icon-close" style="font-size: 12px;color:red;"></text>边框缺失
						</div>
					</div>
					<div class="requirement-img-item">
						<img src="https://s1.ax1x.com/2022/09/28/xmAHl8.png" style="height: 50px;">
						<div class="requirement-item-font">
							<text class="iconfont icon-close" style="font-size: 12px;color:red;"></text>照片模糊
						</div>
					</div>
					<div class="requirement-img-item">
						<img src="https://s1.ax1x.com/2022/09/28/xmAOmQ.png" style="height: 50px;">
						<div class="requirement-item-font">
							<text class="iconfont icon-close" style="font-size: 12px;color:red;"></text>闪光强烈
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="info-wrapper">
			<div class="info-item">
				<div>姓名：</div>
				<div class="info-item-right">自动识别</div>
			</div>
			<div class="info-item">
				<div>性别：</div>
				<div class="info-item-right">自动识别</div>
			</div>
			<div class="info-item">
				<div>身份证号：</div>
				<div class="info-item-right">自动识别</div>
			</div>
		</div>

		<div style="padding-bottom: 1rem">
			<div class="printing-btn">
				提 交
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "self-service-printing",
		components: {},
		data() {
			return {
				zhengImgSrc: '',
				fanImgSrc: '',
				img: '' // 图片url
			}
		},
		methods: {
			// 调取相机或相册选择图片并转为base64格式预览
			image(num) {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择album，相机拍摄camera
					success: function(res) {
						let tempFilePaths = res.tempFilePaths[0]
						// 图片转 base64
						uni.getFileSystemManager().readFile({
							filePath: tempFilePaths, //选择图片返回的相对路径  
							encoding: 'base64', //编码格式  
							success: v => { //成功的回调  
								let base64 = v
									.data // 返回的是没有 'data:image/jpeg;base64,'头的数据, 需要在页面显示图片可自行追加上 
								if (num === 1) {
									that.zhengImgSrc = 'data:image/jpeg;base64,' + base64
								} else {
									that.fanImgSrc = 'data:image/jpeg;base64,' + base64
								}

							}
						})
					}
				});
			},

			camera(event, num) {
				// 先获取用户上传的文件对象
				let file = event.target.files[0];
				let type = file.type.split('/')[0];
				if (type === 'image') {
					//将图片img转化为base64
					let reader = new FileReader();
					reader.readAsDataURL(file);
					let self = this;
					reader.onloadend = function() {
						if (num === 1) {
							self.zhengImgSrc = reader.result;
						} else {
							self.fanImgSrc = reader.result;
						}
					}
				} else {
					alert('上传了非图片');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.printing-wrapper {
		background: #ffffff;
		padding-bottom: .5rem;

		.printing-title {
			text-align: center;
			padding: 1rem 0;

			span {
				color: #008cfe;
			}
		}

		.upload-img-wrapper {
			width: 280px;
			height: 145px;
			margin: 0 auto .5rem;
			position: relative;

			img {
				width: 100%;
				height: 100%;
			}

			.upload-input {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				opacity: 0;
				z-index: 9;
			}
		}

		.requirement-wrapper {
			width: 80%;
			margin: 0 auto;

			.requirement-title {
				text-align: center;
				color: #9d9d9d;
				font-size: .35rem;
			}

			.requirement-img {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: .5rem;

				.requirement-img-item {
					width: 20%;

					img {
						width: 100%;
					}

					.requirement-item-font {
						font-size: .2rem;
						color: #9d9d9d;

						.el-icon-close {
							color: red;

						}

						.el-icon-check {
							color: green;
						}
					}
				}
			}
		}
	}

	.info-wrapper {
		background: #ffffff;
		margin-top: 1rem;

		.info-item {
			display: flex;
			justify-content: space-between;
			padding: .3rem .5rem;
			border-bottom: 1px solid #e1e1e1;

			.info-item-right {
				color: #9d9d9d;
			}
		}
	}

	.printing-btn {
		width: 270px;
		height: 45px;
		background: #008cfe;
		border-radius: 10px;
		text-align: center;
		line-height: 45px;
		color: #ffffff;
		margin: 1rem auto 0;
	}
</style>
