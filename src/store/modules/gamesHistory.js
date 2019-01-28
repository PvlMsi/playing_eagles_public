import Api from '../../services/Api'

const state = {
  games: [],
  isLoading: false,
  totalGames: null
}

const mutations = {
  SET_GAMES(state, games) {
    state.games = games;
  },
  SET_TOTAL_GAMES(state, totalGames) {
    state.totalGames = ~~totalGames;
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  }
};

const actions = {
  loadGamesHistory: ({ commit }, payload) => {
    return new Promise(function (resolve, reject) {
      commit('SET_LOADING', true)
      Api()
        .get('/users/' + payload.user_id + '/game_history', {
          params: {
            page: payload.page
          }
        })
        .then(r => {
          const games = r.data.data
          const totalGames = r.headers['x-total-count']
          commit('SET_TOTAL_GAMES', totalGames)
          commit('SET_LOADING', false)
          commit('SET_GAMES', games)
        })
        .then(() => resolve(state.games))
        .catch(err => {
          reject(err)
        })
    })
  }
};

const getters = {
  historicalGames: state => state.games,
  isHistoryLoading: state => state.isLoading,
  totalHistoricalGames: state => state.totalGames
};

export default {
  state,
  mutations,
  actions,
  getters
};