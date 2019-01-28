<template>
  <div class='player' :class="{ taken: isTaken() }">
    <b-btn class="btn-watch" v-if="isTaken()" :class="{ me: isMe() }" :id="'popover-' + player.id" variant="player">{{player.name[0]}}</b-btn>
    <b-popover :target="'popover-' + player.id" triggers="click">
      <template slot="title">{{ player.name }}</template>
      <router-link :to="'/user/' + player.user_id">
        <a href="#" class="btn btn-primary">Profil</a>
      </router-link>
    </b-popover>
    <b-btn v-b-popover.hover.top="'Dołącz'"
      v-if="!isTaken()"
      class="btn btn-player btn-join"
      @click="joinIn"
    >+</b-btn>
  </div>
</template>

<script>
  import Api from '../../services/Api'

  export default {
    props: ['player'],
    methods: {
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      joinIn() {
        this.$store.dispatch('joinGame', this.player.id)
      },
      game () {
        return this.$props.player
      },
      isTaken() {
        return this.$props.player.user_id != ''
      },
      isMe() {
        return this.$props.player.user_id == localStorage.getItem('user-id')
      }
    },
    watch: {
      'player.user_id': () => console.log('ehehhe')
    }
  }
</script>

<style lang="scss">
  .player {
    width: 3em;
    height: 3em;
    border-radius: 50px;
    background-color: rgb(118, 132, 150);
    margin: auto;
    border: 3px solid black;
  }

  .btn-watch {
    background-color: rgb(222, 25, 0);
  }

  .btn-watch.me {
    background-color: rgb(20, 64, 208);
  }

  .btn-player {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }

  .btn-join {
    background-color: rgb(118, 132, 150);    
  }

  .btn-join:hover {
    background-color: rgb(74, 84, 95);
  }

  .btn-watch:hover {
    background-color: rgb(192, 38, 76);
  }

  .btn-watch.me:hover {
    background-color: rgb(16, 45, 140);
  }
</style>

