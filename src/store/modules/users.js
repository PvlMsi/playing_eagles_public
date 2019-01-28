import Api from '../../services/Api'

const state = {
  users: [],
  user: ''
}

const mutations = {
  SET_USERS (state, users) {
    state.users = users;
  },
  CLEAR_USER (state) {
    state.user = '';
  },
  LOAD_USER (state, user) {
    state.user = user;
  },
  SET_LOADING () {
  }
};

const actions = {
  loadUsers: ({ commit }) => {
    commit('SET_LOADING', true)
    Api()
      .get('/users')
      .then(r => r.data)
      .then(users => {
        commit('SET_USERS', users)
      })
  },
  loadUser: ({ commit }, user_id) => {
    console.log('loaduser')
    commit('CLEAR_USER', true);
    commit('SET_LOADING', true);
    Api()
      .get('/users/' + user_id)
      .then(r => r.data)
      .then(user => {
        commit('LOAD_USER', user)
      })
  },
  editUser({ commit }, inputData) {
    return new Promise(function (resolve, reject) {
      Api().put('/users/'+inputData.id, {
        user: {
          first_name: inputData.first_name,
          last_name: inputData.last_name,
          birth_date: inputData.birth_date,
          phone_number: inputData.phone_number,
          city: inputData.city,
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
  users: state => state.users,
  user: state => state.user
};

export default {
  state,
  mutations,
  actions,
  getters
};