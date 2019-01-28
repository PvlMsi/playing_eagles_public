<template>
  <div class="card">
    <div class="card-header text-center">
      <h4>{{pitch.city}}, {{pitch.address}}</h4>
    </div>
    <div class="card-body">
      <p class="text-center"><b>Godziny otwarcia:</b> {{pitch.opening_hour}}:00 - {{pitch.closing_hour}}:00</p>
      <h4 class="text-center">Harmonogram</h4>
      <b-form-input type="date" v-model="date" />
      <calendar-day :pitch_id="pitch.id" :start_hour="pitch.opening_hour" :end_hour="pitch.closing_hour" :date="date"/>
    </div>
  </div>
</template>

<script>
  import CalendarDay from './calendar/CalendarDay'
  export default {
    data () {
      return {
        date: null,
        pitch_id: null
      }
    },
    created() {
      const path = window.location.pathname.split("/")
      this.pitch_id = path[path.length-1];
      this.$store.dispatch('loadPitch', this.pitch_id)
    },
    computed: {
      pitch() {
        return this.$store.getters.pitch
      }
    },
    components: {
      CalendarDay
    }
  }
</script>

<style>
  .card {
    width: 100%;
  }
</style>

