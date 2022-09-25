import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login({ commit }, loginData) {
      // 调用接口发送请求
      const data = await login(loginData)
      console.log(data)
      // ...存入的操作
    }

  }
}
