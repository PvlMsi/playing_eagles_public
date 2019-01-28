<template>
  <div class="dashboard">
    <div class="search-box bg-light card sticky-top">
      <b-form @submit.prevent="loadPitches">
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
            <b-button type="submit" class="float-right" variant="primary">Szukaj</b-button>
          </b-col>
        </b-row>
      </b-form>
      <b-pagination align="center" :total-rows="totalPitches" v-model="params.currentPage" :per-page="10" />
    </div>
    <pitch-card v-for="pitch in pitches" :key="pitch.id" :pitch="pitch"/>
  </div>
</template>

<script>
  import PitchCard from './PitchCard'
  export default {
    data () {
      return {
        params: {
          city: null,
          address: null,
          currentPage: 1
        }
      }
    },
    components: {
      PitchCard
    },
    created() {
      this.$store.dispatch('loadPitches', this.params);
    },
    computed: {
      pitches() {
        return this.$store.getters.pitches
      },
      totalPitches() {
        return this.$store.getters.totalPitches
      }
    },
    methods: {
      loadPitches () {
        this.$store.dispatch('loadPitches', this.params)
      }
    },
    watch: {
      'params.currentPage' () {
        this.$store.dispatch('loadPitches', this.params)
      }
    }
  }
</script>

<style scoped>
  .dashboard {
    width: 100%;
  }
  .search-box {
    padding: 10px;
    top: 2.5rem;
    width: 100%;
    text-align: center;
  }
</style>

