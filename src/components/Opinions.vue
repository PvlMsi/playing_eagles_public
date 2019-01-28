<template>
  <div>
    <div class="pagination-box bg-light sticky-top">
      <b-pagination align="center" :total-rows="totalOpinions" v-model="currentPage" :per-page="10" />
    </div>
    <div class="card-body">
      <app-opinion v-for="opinion in opinions" :key="opinion.id" :opinion="opinion"/>
    </div>
  </div>
</template>

<script>
  import Opinion from './Opinion'

  export default {
    data () {
      return {
        currentPage: 1
      }
    },
    props: ['user_id'],
    created() {
      this.$store.dispatch('loadOpinions', this.payload);
    },
    computed: {
      opinions() {
        return this.$store.getters.opinions
      },
      totalOpinions() {
        return this.$store.getters.totalOpinions
      },
      payload() {
        return {
          page: this.currentPage,
          user_id: this.$props.user_id
        } 
      }
    },
    components: {
      appOpinion: Opinion
    },
    watch: {
      currentPage () {
        this.$store.dispatch('loadOpinions', this.payload)
      }
    }
  }
</script>
