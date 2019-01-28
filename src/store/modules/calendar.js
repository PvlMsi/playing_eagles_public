import Api from '../../services/Api'

const state = {
  events: []
}

const mutations = {
  LOAD_EVENTS (state, events) {
    state.events = events
  }
}

const actions = {
  loadEvents: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      Api().get('/pitches/' + payload.pitch_id + '/calendar', {
        params: {
          date: payload.date
        }
      })
      .then(res => res.data)
      .then(events => {
        commit('LOAD_EVENTS', events)
        resolve(events)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const getters = {
  events: state => state.events,
};

export default {
  state,
  mutations,
  actions,
  getters
};