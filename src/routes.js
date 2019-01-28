import GamesDashboard from './components/dashboard/GamesDashboard.vue'
import Game from './components/Game.vue'
import NewGame from './components/NewGame.vue'
import User from './components/User.vue'
import Pitches from './components/Pitches.vue'
import PitchPage from './components/PitchPage.vue'
import GamesHistory from './components/history/GamesHistory.vue'
import SignIn from './components/auth/SignIn.vue'
import SignUp from './components/auth/SignUp.vue'
import EditUser from './components/EditUser.vue'

import store from './store/store'

const ifAuthenticated = (to, from, next) => {
  store.dispatch('tryAutoLogin')
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/signin')
}

export const routes = [
  { 
    path: '/',
    component: GamesDashboard,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/games/:id',
    component: Game,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/new_game',
    component: NewGame,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  {
    path: '/user/:id',
    component: User,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  {
    path: '/pitches',
    component: Pitches,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  {
    path: '/pitches/:id',
    component: PitchPage,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/user/:id/history',
    component: GamesHistory,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/signin',
    component: SignIn,
    meta: { layout: 'guest-layout' }
  },
  { 
    path: '/signup',
    component: SignUp,
    meta: { layout: 'guest-layout' }
  },
  {
    path: '/edit_profile',
    component: EditUser,
    meta: { layout: 'default-layout' },
    beforeEnter: ifAuthenticated
  }
];