import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		userList: {}, // 用户信息
		login: false, // 用户登录状态

		token: '',
		xiangmu: '', //获取核酸检测中用户选择的项目信息
		yuyueriqi: '', //获取核酸检测中用户选择的预约日期
		huanzhejibenxinxi: '', //获取核酸检测中患者的基本信息
		keshiname: '', //获取智能导诊中选择的科室名称
	},
	mutations: {
		Add_userList(state, userList) {
			state.userList = userList
		},
		Add_login(state, login) {
			state.login = login
		},
		//获取智能导诊中选择的科室名称的方法
		keshiname(state, keshiname) {
			state.keshiname = keshiname;
		},
		//获取核酸检测中患者的基本信息的方法
		Add_huanzhejibenxinxi(state, huanzhejibenxinxi) {
			state.huanzhejibenxinxi = huanzhejibenxinxi;
		},
		//获取核酸检测中用户选择的项目信息的方法
		Add_xiangmuxinxi(state, xiangmu) {
			state.xiangmu = xiangmu;
		},
		//获取核酸检测中用户选择的预约日期的方法
		Add_yuyueriqi(state, yuyueriqi) {
			state.yuyueriqi = yuyueriqi;
		},
		set_token(state, token) {
			state.token = token
			sessionStorage.token = token
		},
		del_token(state) {
			state.token = ''
			sessionStorage.removeItem('token')
		}
	}
})
export default store
