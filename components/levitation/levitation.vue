<template>
	<view>
		<movable-area class="movable-area">
			<movable-view class="movable-view" :x="x" :y="y" direction="all">
				<!-- <contact-button tnt-inst-id="v3J_3KJ7" scene="SCE01229090"/>
				<image src="https://s1.ax1x.com/2022/09/27/xZ4AJO.png"></image> -->
				<view class="btn">
					<contact-button tnt-inst-id="ThU_Jr9e" scene="SCE01230424"
						icon="https://s1.ax1x.com/2022/09/27/xZ4AJO.png" size="50" />
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x: 320, //x坐标
				y: 520, //y坐标
			}
		}
	}
</script>

<style lang="scss">
	$all_width: 96rpx;
	$all_height:96rpx;

	.movable-area {
		height: 100vh;
		width: 750rpx;
		position: fixed;
		z-index: 99;

		top: 0;
		position: fixed;
		pointer-events: none; //此处要加，鼠标事件可以渗透

		.movable-view {
			width: $all_width;
			height: $all_height;
			border-radius: 50%;
			//box-shadow: inset 0px 15px 10px -15px #000;
			// background-color: #fff;
			pointer-events: auto; //恢复鼠标事件

			image {
				border-radius: 50%;
				width: $all_width;
				height: $all_height;
			}
		}
	}
</style>
