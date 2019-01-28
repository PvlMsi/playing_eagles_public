import Api from '../../services/Api'
import { resolve } from 'path';
import { rejects } from 'assert';

const state = {
  opinions: [],
  totalOpinions: null
}

const mutations = {
  ADD_OPINION (state, opinion) {
  },
  SET_TOTAL_OPINIONS (state, totalOpinions) {
    state.totalOpinions = totalOpinions
  },
  SET_OPINIONS (state, opinions) {
    state.opinions = opinions
  }
}

const actions = {
  loadOpinions: ({commit}, payload) => {
    return new Promise(() => {
      Api().get('/users/' + payload.user_id + '/opinions', {
        params: {
          page: payload.page
        }
      })
      .then(res => {
        const opinions = res.data
        const totalOpinions = res.headers['x-total-count']
        commit('SET_TOTAL_OPINIONS', totalOpinions)
        commit('SET_OPINIONS', opinions)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addOpinion: ({commit}, inputData) => {
    return new Promise(() => {
      Api().post('/opinions', {
        opinion: {
          player_id: inputData.player_id,
          description: inputData.comment,
          would_recommend_rate: inputData.wouldRecommend,
          fair_play_rate: inputData.fairPlay
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        rejects(err)
      })
    })
  }
}

const getters = {
  opinions: state => state.opinions,
  totalOpinions: state => state.totalOpinions
}

export default {
  state,
  mutations,
  actions,
  getters
}