import $fetch from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { resetRouter } from '@/router'
import constantRoutes from '@/router/modules/constantRoutes'

const state = {
  routes: constantRoutes,
  token: getToken(),
  role: [],
  isFirstLogin: false,
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
  SET_ROLE: (state, role) => {
    let roleMap
    if (!Array.isArray(role)) {
      roleMap = role.split(',')
    } else {
      roleMap = role
    }
    const roleFilter = {
      '1': 'async'
    }

    const roleArr = []
    roleMap.map((role) => {
      roleArr.push(roleFilter[role])
    })
    state.role = roleArr
  },
  SET_ISFIRSTLOGIN: (state, isFirstLogin) => {
    state.isFirstLogin = isFirstLogin
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
        .then((response) => {
          const { body: data } = response
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
        .getInfo(state.token)
        .then((response) => {
          const { body: data } = response

          if (!data) {
            reject('非法登录，请重新登陆')
          }

          const { loginName: name, userType: role = [] } = data.user

          commit('SET_ISLOGIN', true)
          commit('SET_NAME', name)
          commit('SET_ROLE', role)
          commit('SET_USERINFO', data.user)

          if (Number(data.loginCount) <= 1) {
            commit('SET_ISFIRSTLOGIN', true)
          }

          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  resetIsFirstLogin({ commit }) {
    commit('SET_ISFIRSTLOGIN', false)
  },

  resetUserInfo({ commit }) {
    Cookies.set('firstLoginSkip', false)
    commit('SET_ISLOGIN', false)
    commit('SET_NAME', '')
    commit('SET_AVATAR', '')
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      $fetch.user
        .logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
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
