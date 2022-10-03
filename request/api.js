// 请求封装好的axios
import axios from './http';
// 请求未封装的axios
import axiosa from 'axios'
// 封装的URL地址
import base from './base'
// axios的qs方法，qs.stringify()将对象 序列化成URL的形式，以&进行拼接
import qs from 'qs';

// 正式的URL
const baseUrl = base.sq;

// 登录注册
const loginService = {
	// 执行登录
	login(params) {
		return axios.get(`${baseUrl}/wechat/auth/login?code=${params}`);
	},
	// 注册普通用户
	register(params) {
		return axios.post(`${baseUrl}/wechat/register/normal`, qs.stringify(params));
	},
	// /wechat/auth/readCardImg
	// 身份证卡片信息
	readCardImg(params) {
		return axios.post(`${baseUrl}/wechat/auth/readCardImg`, params);
	}
}

// 首页
const indexService = {
	// 获取首页菜单列表
	getHospMenu(params) {
		return axios.post(`${baseUrl}/menu/getHospMenu`, qs.stringify(params));
	},

	// 绑定就诊者信息
	addInfo(params) {
		return axios.post(`${baseUrl}/wechat/user/addPtCard/info`, params);
	},
}

// 挂号
const registerService = {
	getDoctorDate(params) {
		return axios.post(`${baseUrl}/hospt/getDoctorDate`, qs.stringify(params));
	},
	// 获取科室列表
	getDeptInfo(params) {
		return axios.post(`${baseUrl}/hospt/getDeptInfo`, qs.stringify(params));
	},

	// 获取医院科室医生信息
	getDetDoctorInfo(params) {
		return axios.post(`${baseUrl}/hospt/getDetDoctorInfo`, qs.stringify(params));
	},

	// 获取挂号信息
	getRegistrationRecords(params) {
		return axios.post(`${baseUrl}/hospt/getRegList`, qs.stringify(params))
	},
	//获取医生价格信息
	getDoctorFeeInfo(params) {
		return axios.post(`${baseUrl}/hospt/getDoctorFeeBill`, qs.stringify(params))
	},
	//获取医生介绍
	getDoctorInfo(params) {
		return axios.post(`${baseUrl}/hospt/getDoctorPage`, qs.stringify(params))
	},
}

// 获取就诊人信息
const patientService = {
	// 用户就诊默认绑定信息
	getDfltPtCardInfo() {
		return axios.post(`${baseUrl}/wechat/user/dfltPtCard/info`);
	},
	// 获取用户就诊绑定信息
	getPatientInfo() {
		return axios.post(`${baseUrl}/wechat/user/patientcard/info`);
	},
	// 修改用户就诊绑定信息
	updatePatientInfo(params) {
		return axios.post(`${baseUrl}/wechat/user/update/patientinfo`, qs.stringify(params));
	},
	// 删除用户
	deletePtCardInfo(params) {
		return axios.post(`${baseUrl}/wechat/user/deletePtCard/info`, qs.stringify(params));
	},
}

// 挂号下单
const payRegisterService = {
	// 挂号下单 /wechat/pay/reg
	payRegister(params) {
		return axios.post(`${baseUrl}/wechat/pay/reg`, qs.stringify(params));
	},
}

// 门诊服务
const outpatientDepartmentService = {
	// 获取患者id所有挂号门诊费用订单
	getOutPayList(params) {
		return axios.post(`${baseUrl}/hospt/getOutPayList`, qs.stringify(params));
	},

	// 校验住院信息
	checkHosptInfo(params) {
		return axios.post(`${baseUrl}/hospt/checkHosptInfo`, qs.stringify(params));
	},

	// 获取住院id所有住院信息
	getHosptList(params) {
		return axios.post(`${baseUrl}/hospt/getHosptList`, qs.stringify(params));
	},

	// 住院缴费
	hospPayment(params) {
		return axios.post(`${baseUrl}/wechat/pay/hosp`, qs.stringify(params))
	},

	// 门诊缴费 /wechat/pay/out
	outpatientPayment(params) {
		return axios.post(`${baseUrl}/wechat/pay/out`, qs.stringify(params));
	},
	// 门诊面对面缴费 /wechat/pay/out
	outpatientFacePayment(params) {
		return axios.post(`${baseUrl}/wechat/pay/face`, qs.stringify(params));
	},

	// 门诊已缴费信息 /wechat/pay/out
	queryOutFeeList(params) {
		return axios.post(`${baseUrl}/hospt/getOutBillList`, qs.stringify(params));
	},

	// 获取订单信息
	getOrderInfo(params) {
		return axios.post(`${baseUrl}/hospt/getWechatOrderList`, qs.stringify(params))
	},
	// 获取面对面订单信息
	getFaceOrderInfo(params) {
		return axios.post(`${baseUrl}/hospt/getFaceWechatOrderList`, qs.stringify(params))
	},
	//获取住院流水清单
	getHosptFeeList(params) {
		return axios.post(`${baseUrl}/hospt/getHosptFeeList`, qs.stringify(params))
	},
	//获取预约住院信息
	getSubscribeInfo(id) {
		return axios.post(`${baseUrl}/hospt/getSubscribeInfo/${id}`)
	},
	//保存预约住院信息
	saveSubscribeInfo(params) {
		return axios.post(`${baseUrl}/hospt/saveSubscribeInfo`, params)
	},
	//保存预约住院信息
	querySubscribeInfo(params) {
		return axios.post(`${baseUrl}/hospt/querySubscribeInfo`, params)
	},
	//查询题目与答案
	queryTitleAndAnswer(params) {
		return axios.post(`${baseUrl}/epidemic/queryTitleAndAnswer`, params)
	},
	//查询检验报告
	getZjkjList(params) {
		return axios.post(`${baseUrl}/zjkj/list`, qs.stringify(params))
	},
}

const ceshi = {
	ceshi() {
		return axios.get(`http://127.0.0.1:4523/m1/1382226-0-default/pet/1`)
	}
}

export default {
	loginService,
	indexService,
	registerService,
	patientService,
	payRegisterService,
	outpatientDepartmentService,
	ceshi
};
