import Api from '../../services/Api'

const state = {
  games: [],
  newGame: '',
  game: '',
  joinGame: '',
  isLoading: false,
  totalGames: null
}

const mutations = {
  SET_GAMES (state, games) {
    state.games = games;
  },
  SET_TOTAL_GAMES(state, totalGames) {
    state.totalGames = ~~totalGames;
  },
  CLEAR_GAME (state) {
    state.game = '';
  },
  ADD_GAME (state, gameObject) {
    state.games.push(gameObject)
  },
  SET_NEW_GAME (state, newGame) {
    state.newGame = newGame
  },
  SET_LOADING (state, isLoading) {
    state.isLoading = isLoading
  }
};

const actions = {
  loadGames: ({ commit }, payload) => {
    return new Promise( (resolve, reject) => {      
      commit('SET_LOADING', true)
      Api()
        .get('/games', {
          params: {
            page: payload.currentPage,
            'q[pitch_address_cont]': payload.address,
            'q[pitch_city_cont]': payload.city,
            'q[date_gteq]': payload.dateFrom,
            'q[date_lteq]': payload.dateTo
          }
        })
        .then(res => {
          const games = res.data.data
          const totalGames = res.headers['x-total-count']
          commit('SET_TOTAL_GAMES', totalGames)
          commit('SET_LOADING', false)
          commit('SET_GAMES', games)
        })
        .then(() => resolve(state.games))
        .catch(err => {
          reject(err)
        })
    })
  },
  addGame: ({ commit, state }, inputData) => {
    return new Promise(function (resolve, reject) {
      Api().post('/games', {
        game: {
          pitch_id: inputData.pitch_id,
          date: inputData.date,
          players_quantity: inputData.players_quantity,
          time_length: inputData.time_length
        }
      })
      .then(res => {
        const game = res.data.data
        commit('ADD_GAME', game)
        commit('SET_NEW_GAME', game.id)
        resolve(game)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
};

const getters = {
  games: state => state.games,
  newGame: state => state.newGame,
  isLoading: state => state.isLoading,
  totalGames: state => state.totalGames
};

export default {
  state,
  mutations,
  actions,
  getters
};