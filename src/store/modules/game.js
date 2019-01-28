import Api from '../../services/Api'

const state = {
  game: '',
  players: '',
}

const mutations = {
  LOAD_GAME (state, game) {
    state.game = game;
  },
  CLEAR_GAME (state) {
    state.game = ''
    state.players = ''
  },
  SET_LOADING () {
  },
  LOAD_PLAYERS (state, players) {
    state.players = players
  },
  ADD_PLAYER (state, player) {
    const alreadySigned = state.players.first_team.concat(state.players.second_team).find(el => el.user_id === player.user_id)
    if (alreadySigned) {
      alreadySigned.user_id = ''
      alreadySigned.name = ''
    }
    const record = state.players.first_team.concat(state.players.second_team).find(el => el.id === player.id)
    if (record) {
      record.user_id = player.user_id
      record.name = player.fullname
    }
  },
  REMOVE_PLAYER(state, player) {
    const record = state.players.first_team.concat(state.players.second_team).find(el => el.id === player.id)
    if (record) {
      record.user_id = ''
      record.name = ''
    }
  }
};

const actions = {
  loadGame: ({ commit }, game_id) => {
    commit('CLEAR_GAME', true);
    commit('SET_LOADING', true);
    Api()
      .get('/games/' + game_id)
      .then(r => r.data.data)
      .then(game => {
        commit('LOAD_GAME', game)
        commit('LOAD_PLAYERS', game.players)
      })
  },
  joinGame: ({commit}, player_id) => {
    return new Promise(function (resolve, reject) {
      Api()
        .post('/players/' + player_id + '/sign_in')
        .then(r => r.data.data)
        .then(player => {
          resolve(commit('ADD_PLAYER', player))
        })
        .catch(err => reject(err))
    })
  },
  signOutGame: ({ commit }, player_id) => {
    return new Promise(function (resolve, reject) {
      Api()
        .post('/players/' + player_id + '/sign_out')
        .then(r => r.data.data)
        .then(player => {
          resolve(commit('REMOVE_PLAYER', player))
        })
        .catch(err => reject(err))
    })
  }
};

const getters = {
  game: state => state.game,
  players: state => state.players
};

export default {
  state,
  mutations,
  actions,
  getters
};