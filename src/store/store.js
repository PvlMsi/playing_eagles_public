import Vue from 'vue';
import Vuex from 'vuex';

import games from './modules/games';
import game from './modules/game';
import users from './modules/users';
import auth from './modules/auth';
import pitches from './modules/pitches';
import gamesHistory from './modules/gamesHistory';
import opinions from './modules/opinions';
import calendar from './modules/calendar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    games,
    game,
    users,
    auth,
    pitches,
    gamesHistory,
    opinions,
    calendar
  }
});