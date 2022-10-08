// 封装的request

const BASE_URL = "http://fsybzzj.natapp1.cc"
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'POST',
			data: options.data || {},
			header: {
				'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA1NjkzNTQsInVzZXJhY2NvdW50IjoiMTg4NDAwNjk0ODMifQ.0goK06Q3ST3k_amC_Lwq3uL83BsHCTJXBKL_Kzfr7DM',
				'Content-Type': options.contentType ||'application/x-www-form-urlencoded'
			},
			success: (res) => {
				if (res.data.code === 0 || res.data.code === 200) {
					resolve(res.data)
				} else {
				uni.showToast({
					title: res.data.msg || '请求失败'
				})
				}
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			}
		})
	})
}
