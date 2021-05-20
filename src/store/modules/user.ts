import { getToken, setToken } from '@/utils/auth'
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { ActionContext } from 'vuex'
import { userStore } from '@/model/store'
const state: userStore = {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
}

const mutations = {
  SET_CODE: (state: userStore, code: string) => {
    state.code = code
  },
  SET_TOKEN: (state: userStore, token: string) => {
    state.token = token
  }
}
const actions = {
  // 用户名登录
  LoginByUsername(context: ActionContext<userStore, any>, userInfo: any) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(response => {
        const data = response.data
        context.commit('SET_TOKEN', data.token)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}