import request from '@/utils/request.js'
// 验证码的请求
export function imgCode() {
  return request({
    //   带上请求随机数
    url: `/user-service/user/imageCode/${Math.random()}`,
    responseType: 'blob'
  })
}
// 登录获取token的请求
export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
