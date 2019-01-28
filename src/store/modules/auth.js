import Api from '../../services/Api'

const state = {
  token: null,
}

const mutations = {
  AUTH_USER(state, token) {
    state.token = token
  }
};
  
const actions = {
  signIn ({commit}, inputData) {
    return new Promise(function (resolve, reject) {
      Api().post('/login', {
        email: inputData.email,
        password: inputData.password
      })
      .then(res => {
        const token = res.data.access_token
        const user_id = res.data.user_id
        const expirationDate = new Date(res.data.expiration_date)
        localStorage.setItem('user-token', token)
        localStorage.setItem('user-id', user_id)
        localStorage.setItem('expiration-date', expirationDate)
        commit('AUTH_USER', token)
        resolve(res)
      })
      .catch(error => {
        localStorage.removeItem('user-token')
        localStorage.removeItem('expiration-date')
        reject(error)
      })
    })
  },
  tryAutoLogin({ commit }) {
    return new Promise(function (resolve, reject) {
      const token = localStorage.getItem('user-token')
      if (!token) {
        return
      }
      const expirationDate = new Date(localStorage.getItem('expiration-date'))
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      commit('AUTH_USER', token)
      resolve(token)
    })
  },
  logOut ({commit}) {
    localStorage.removeItem('user-token')
    localStorage.removeItem('expiration-date')
  },
  signUp ({commit}, inputData) {
    return new Promise(function (resolve, reject) {
      Api().post('/users', {
        user: {
          email: inputData.email,
          password: inputData.password,
          password_confirmation: inputData.password_confirmation
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
    })
  }
};

const getters = {
  isAuthenticated: state => !!state.token
};

export default {
  state,
  mutations,
  actions,
  getters
};