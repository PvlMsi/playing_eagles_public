<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5 class="card-title">{{ game.pitch.address }}, {{ game.pitch.city }}</h5>
        <div class="row">
          <div class="col">
            <p class="card-text">Czas gry: {{ game.time_length }} minut</p>
            <p class="card-text">Wolnych miejsc: {{ game.seats_left.length }}</p>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Imie</th>
                  <th scope="col">Pozycja</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in players.first_team" :key="player.user_id+'table'" v-if="player.user_id != ''">
                  <th scope="row"></th>
                  <td>{{ player.name }}</td>
                  <td>{{ position(player.position) }}</td>
                  <router-link :to="'/user/' + player.user_id" tag="td">
                    <a href="#" class="btn btn-primary">Profil</a>
                    <b-btn v-if="canGiveOpinion(player.user_id, players)" v-b-modal="'player-'+player.id+'-modal'">Wystaw opinie</b-btn>
                    <b-btn
                      v-if="canSignOut(player.user_id)"
                      class="btn btn-danger"
                      @click="signOut(player.id)"
                    >Wypisz się</b-btn>
                  </router-link>
                  <new-opinion :player="player"/>
                </tr>
                <tr v-for="player in players.second_team" :key="player.user_id+'table'" v-if="player.user_id != ''">
                  <th scope="row"></th>
                  <td>{{ player.name }}</td>
                  <td>{{ position(player.position) }}</td>
                  <router-link :to="'/users/' + player.user_id" tag="td">
                    <a href="#" class="btn btn-primary">Profil</a>
                    <b-btn v-if="canGiveOpinion(player.user_id, players)" v-b-modal="'player-'+player.id+'-modal'">Wystaw opinie</b-btn>
                    <b-btn
                      v-if="canSignOut(player.user_id)"
                      class="btn btn-danger"
                      @click="signOut(player.id)"
                    >Wypisz się</b-btn>
                  </router-link>
                  <new-opinion :player="player"/>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col">
            <app-field :players="players"></app-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Field from "./field/Field.vue";
  import NewOpinion from "./NewOpinion.vue"

  export default {
    data: () => {
      return {
        game_id: null,
        game_finished: true
      }
    },
    components: {
      appField: Field,
      NewOpinion
    },
    created() {
      const path = window.location.pathname.split("/")
      this.game_id = path[path.length-1];
      this.$store.dispatch('loadGame', this.game_id)
      this.gameFinished()
    },
    computed: {
      game() {
        return this.$store.getters.game;
      },
      players() {
        return this.$store.getters.players;
      },
    },
    methods: {
      isSigned() {
        record = this.$store.getters.players.first_team
          .concat(this.$store.getters.players.second_team)
          .find(p => p.id === this.player.id)
        return record ? true : false
      },
      isOneOfPlayers(players) {
        const players_ids = []
        _.map(players.first_team, (player) => { 
          if (player.user_id !='')
          {
            players_ids.push(player.user_id)
          }
        });
        _.map(players.second_team, (player) => { 
          if (player.user_id !='')
          {
            players_ids.push(player.user_id)
          }
        });
        return players_ids.includes(~~localStorage.getItem('user-id'))
      },
      isMe(user_id) {
        return user_id == localStorage.getItem('user-id')
      },
      gameFinished() {
        const splittedDate = this.game.date.split(/\s|\.|\:/);
        const fomratedDate = new Date(splittedDate[2], splittedDate[1]-1, splittedDate[0], splittedDate[3], splittedDate[4])
        const finishingDate = fomratedDate.setMinutes( fomratedDate.getMinutes() + this.game.time_length )
        return new Date > new Date(finishingDate)
      },
      gameAboutToStart() {
        const splittedDate = this.game.date.split(/\s|\.|\:/);
        const fomratedDate = new Date(splittedDate[2], splittedDate[1]-1, splittedDate[0], splittedDate[3], splittedDate[4])
        const finishingDate = fomratedDate.setMinutes( fomratedDate.getMinutes() - 15 )
        return new Date > new Date(finishingDate)
      },
      canGiveOpinion(user_id, players) {
        return this.gameFinished() && !this.isMe(user_id) && this.isOneOfPlayers(players)
      },
      canSignOut(user_id) {
        return this.isMe(user_id) && !this.gameAboutToStart()
      },
      signOut(player_id) {
        this.$store.dispatch('signOutGame', player_id)
      },
      position(value) {
        var pos = null
        switch(value) {
          case 0:
            pos = 'B'
            break
          case 1:
            pos = 'O'
            break
          case 2:
            pos = 'N'
            break
        }
        return pos
      }
    },
    watch: {
      players: function () {
      }
    }
  }
</script>

<style lang="scss">
  .card {
    width: 100%;
  }
</style>
