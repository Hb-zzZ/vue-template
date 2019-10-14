import $fetch from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import constantRoutes from '@/router/modules/constantRoutes'

const state = {
  routes: constantRoutes,
  token: getToken(),
  isLogin: false,
  name: '',
  avatar: '',
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ISLOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      $fetch.user
        .login(userInfo)
        .then((res) => {
          const { data } = res
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      $fetch.user
        .getInfo({ token: state.token })
        .then((res) => {
          const { data } = res

          if (!data) {
            reject('非法登录，请重新登陆')
          }

          const { name, avatar } = data

          commit('SET_ISLOGIN', true)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_USERINFO', data)

          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  resetUserInfo({ commit }) {
    commit('SET_ISLOGIN', false)
    commit('SET_NAME', '')
    commit('SET_AVATAR', '')
    commit('SET_USERINFO', {})
  },

  // user logout
  logout({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      $fetch.user
        .logout(state.token)
        .then(() => {
          resetRouter()
          dispatch('resetToken')
          dispatch('resetUserInfo')
          dispatch('resetRoutes')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  async addRoutes({ commit, state }, routes) {
    const newRoutes = [...state.routes, ...routes]
    return commit('SET_ROUTES', newRoutes)
  },
  resetRoutes({ commit }) {
    const newRoutes = constantRoutes
    commit('SET_ROUTES', newRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
