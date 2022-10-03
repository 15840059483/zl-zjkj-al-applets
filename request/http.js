/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../pages.json';
import store from '../store/index';
// import {Message} from "element-ui";


// 解决uniapp 适配axios请求，避免报adapter is not a function错误
axios.defaults.adapter = config => {
	return new Promise((resolve, reject) => {
		let settle = require('axios/lib/core/settle');
		let buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				// console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}


/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
	console.log(msg)
	Message.warning(msg);
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
	router.replace({
		path: '/register',
		query: {
			redirect: router.currentRoute.fullPath
		}
	});
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, msg) => {
	// 状态码判断
	if (status === 90000002 || status === 90000000) {
		Message.warning(msg);
		// localStorage.removeItem('token');
		// store.commit('loginSuccess', null);
		// setTimeout(() => {
		// toLogin();
		// router.replace({
		//   path: '/register',
		//   query: {
		//     redirect: router.currentRoute.fullPath
		//   }
		// });
		// }, 1000);
	} else {
		Message.warning(msg);
	}
	// switch (status) {
	//   // 90000002: 未登录状态，跳转登录页/token过期
	//   // 清除token并跳转登录页
	//   case 90000002:
	//     // tip(msg);
	//     Message.warning(msg);
	//     localStorage.removeItem('token');
	//     // store.commit('loginSuccess', null);
	//     setTimeout(() => {
	//       // toLogin();
	//       console.log('aaa')
	//       router.replace({
	//         path: '/register',
	//         query: {
	//           redirect: router.currentRoute.fullPath
	//         }
	//       });
	//     }, 1000);
	//     break;
	//   // 404请求不存在
	//   case 404:
	//     tip('请求的资源不存在');
	//     break;
	//   default:
	//     console.log(msg);
	// }
}

// 创建axios实例
var instance = axios.create({
	timeout: 1000 * 12
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //x-www-form-urlencoded
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
	config => {
		// 登录流程控制中，根据本地是否存在token判断用户的登录情况
		// 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
		// 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
		// 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
		const token = localStorage.getItem('token');
		// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDI2MTE0MTEsInVzZXJhY2NvdW50IjoiMTc4NDAwNTk0ODMifQ.2j8dgR8SKSNf-HBZlAkIx_ef-iaasxMrcX_OGKQqf7g';
		token && (config.headers.Authorization = token);
		return config;
	},
	error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
	// 请求成功
	res => {
		if (res.status === 200) {
			if (res.data.code === 200 || res.data.code === 0) {
				return Promise.resolve(res.data)
			} else {
				//   // 请求已发出，但是不在2xx的范围
				errorHandle(res.data.code, res.data.msg);
				return Promise.reject(res.data)
			}
		} else {
			return Promise.reject(res.data)
		}
	},
	// 请求失败
	error => {
		// const { response } = error;
		// if (response) {
		//   // 请求已发出，但是不在2xx的范围
		//   errorHandle(response.status, response.data.message);
		//   return Promise.reject(response);
		// } else {
		// 处理断网的情况
		// eg:请求超时或断网时，更新state的network状态
		// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
		// 关于断网组件中的刷新重新获取数据，会在断网组件中说明
		if (!window.navigator.onLine) {
			store.commit('changeNetwork', false);
		} else {
			return Promise.reject(error);
		}
		// }
	});

export default instance;
