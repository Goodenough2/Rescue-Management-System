import { login, logout, getAccess } from '@/api/account'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  user: {},
  access: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ACCESS: (state, access) => {
    state.access = access
  }
}

const actions = {
  // user login
  login({ commit }, loginModel) {
    const { username, password } = loginModel
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // 存放token放入localStorage
        // commit('SET_TOKEN', response.token)
        // commit('SET_USER', response.user)
        // setToken(response.token)
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user access
  getAccess({ commit }) {
    return new Promise((resolve, reject) => {
      const access = getAccess().data.access
      // 将access本地存储
      commit('SET_ACCESS', access)
      resolve({ access })

      // getAccess().then(response => {
      //   const access = response.data.access
      //   if (!access) {
      //     reject('请重新登录！')
      //   }
      //
      //   // 将access本地存储
      //   commit('SET_ACCESS', access)
      //   resolve({ access })
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ACCESS', null)
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ACCESS', null)
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { access } = await dispatch('getAccess')
      //
      resetRouter()

      // generate accessible routes map based on access
      const accessRoutes = await dispatch('permission/generateRoutes', access, { root: true })

      // dynamically add accessible routes
      // eslint-disable-next-line no-undef
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
