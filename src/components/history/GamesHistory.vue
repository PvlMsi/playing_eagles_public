<template>
  <div>
    <div class="pagination-box bg-light sticky-top">
      <b-pagination align="center" :total-rows="totalGames" v-model="params.currentPage" :per-page="10" />
    </div>
    <div class="card-body">
      <div v-if="isLoading" class="spinner-box">
        <spinner :animation-duration="1200" :size="80" :color="'rgb(0, 105, 217)'" class="spinner" />
      </div>
      <app-game v-for="game in games" :key="game.id" :game="game"></app-game> 
    </div>
  </div>
</template>

<script>
  import Game from './Game.vue'
  import { OrbitSpinner } from 'epic-spinners'

  export default {
    data () {
      return {
        currentPage: 1,
      }
    },
    props: ['user_id'],
    components: {
      appGame: Game,
      spinner: OrbitSpinner,
    },
    created() {
      this.$store.dispatch(
        'loadGamesHistory',
        this.params
      );
    },
    computed: { 
      games() {
        return this.$store.getters.historicalGames;
      },
      isLoading() {
        return this.$store.getters.isHistoryLoading;
      },
      totalGames() {
        return this.$store.getters.totalHistoricalGames;
      },
      params() {
        return {
          page: this.currentPage,
          user_id: this.user_id
        }
      }
    },
    methods: {
      loadGames () {
        this.$store.dispatch(
          'loadGamesHistory',
          this.params
        )
      }
    },
    watch: {
      'params.currentPage' () {
        this.$store.dispatch(
          'loadGamesHistory',
          this.params
        )
      }
    }
  }
</script>

<style>
  .dashboard {
    width: 100%;
  }
  .spinner-box {
    width: 100%;
    height: 100vh;
  }
  .spinner {
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }

  .pagination-box {
    padding: 10px;
    top: 2.5rem;
    width: 100%;
    text-align: center;
  }
</style>

