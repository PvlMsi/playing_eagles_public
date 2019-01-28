<template>
  <div class="dashboard">
    <div class="search-box bg-light card sticky-top">
      <b-form @submit.prevent="loadGames">
        <b-row class="justify-content-md-center">
          <b-col md="auto">
            <b-form-group>
              <b-form-input
                v-model="params.city"
                placeholder="Miasto"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="auto">
            <b-form-group>
              <b-form-input
                v-model="params.address"
                placeholder="Adres"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="auto">
            <b-form-group>
              <b-form-input
                type="date"
                v-model="params.dateFrom"
                placeholder="Data od:"
              />
            </b-form-group>
          </b-col>
          <b-col md="auto">
            <b-form-group>
              <b-form-input
                type="date"
                v-model="params.dateTo"
                placeholder="Data do:"
              />
            </b-form-group>
          </b-col>
          <b-col md="auto">
            <b-button type="submit" class="float-right" variant="primary">Szukaj</b-button>
          </b-col>
        </b-row>
      </b-form>
      <b-pagination align="center" :total-rows="totalGames" v-model="params.currentPage" :per-page="10" />
    </div>
    <div v-if="isLoading" class="spinner-box">
      <spinner :animation-duration="1200" :size="80" :color="'rgb(0, 105, 217)'" class="spinner" />
    </div>
    <app-game v-for="game in games" :key="game.id" :game="game"></app-game> 
  </div>
</template>

<script>
  import Game from './Game.vue'
  import { OrbitSpinner } from 'epic-spinners'

  export default {
    data () {
      return {
        params: {
          dateFrom: null,
          dateTo: null,
          city: null,
          address: null,
          currentPage: 1,
        }
      }
    },
    components: {
      appGame: Game,
      spinner: OrbitSpinner,
    },
    created() {
      this.$store.dispatch('loadGames', this.params);
    },
    computed: { 
      games() {
        return this.$store.getters.games;
      },
      isLoading() {
        return this.$store.getters.isLoading;
      },
      totalGames() {
        return this.$store.getters.totalGames;
      }
    },
    methods: {
      loadGames () {
        this.$store.dispatch('loadGames', this.params)
      }
    },
    watch: {
      'params.currentPage' () {
        this.$store.dispatch('loadGames', this.params)
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

  .search-box {
    padding: 10px;
    top: 2.5rem;
    width: 100%;
    text-align: center;
  }
</style>

