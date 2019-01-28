import Api from '../../services/Api'

const state = {
  pitches: [],
  isLoading: false,
  totalPitches: null,
  pitch: null
}

const mutations = {
  SET_PITCHES (state, pitches) {
    state.pitches = pitches
  },
  CLEAR_PITCHES (state) {
    state.pitches = null
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  SET_TOTAL_PITCHES (state, totalPitches) {
    state.totalPitches = ~~totalPitches
  },
  CLEAR_PITCH(state) {
    state.pitch = null
  },
  SET_PITCH (state, pitch) {
    state.pitch = pitch
  }
};

const actions = {
  loadPitches: ({commit}, params) => {
    commit('SET_LOADING', true)
    Api().get('/pitches', {
      params: {
        page: params.currentPage,
        per_page: params.per_page,
        'q[address_cont]': params.address,
        'q[city_cont]': params.city
      }
    })
    .then(res => {
      const pitches = res.data
      const totalPitches = res.headers['x-total-count']
      commit('SET_TOTAL_PITCHES', totalPitches)
      commit('SET_PITCHES', pitches)
      commit('SET_LOADING', false)
    })
    .catch(error => {
      console.log(error)
    })
  },
  loadPitch: ({commit}, pitch_id) => {
    return new Promise((resolve, reject) => {
      commit('CLEAR_PITCH', true);
      Api().get('/pitches/' + pitch_id)
      .then(res => res.data)
      .then(pitch => {
        commit('SET_PITCH', pitch)
        resolve(pitch)
      })
      .catch(err => {
        reject(err)
      })
    })
    
  }
}

const getters = {
  pitches: state => state.pitches,
  pitchesLoading: state => state.isLoading,
  totalPitches: state => state.totalPitches,
  pitch: state => state.pitch
};

export default {
  state,
  mutations,
  actions,
  getters
};