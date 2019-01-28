<template>
  <div class="container">
    <div style="height: 400px">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Boisko:">
          <model-select
            :options="pitches"
            v-model="pitch"
            placeholder="Wybierz boisko"
          />
        </b-form-group>
        <b-form-group label="Data:">
          <datetime 
            type="datetime"
            v-model="date"
            :max-time="22"
            :phrases="{ ok: 'Kontynuuj', cancel: 'Anuluj' }"
            auto
          />
        </b-form-group>
        <b-form-group label="Czas gry">
          <b-form-input
            type="number"
            v-model="time_length"
          />
        </b-form-group>
        <b-form-group label="Ilość graczy">
          <b-form-select 
            v-model="players"
            :options="options"
          />
        </b-form-group>
        <b-button :disabled="isError" type="submit" class="float-right" variant="primary">Utwórz</b-button>
      </b-form>
      <p class="alert" v-if="isError">Gra W tym terminie jest niemozliwa</p>
    </div>
    <calendar-day
      v-if="pitch"
      :pitch_id="pitch"
      :start_hour="8"
      :end_hour="22"
      :date="date"
      :new_event="new_event"
      v-on:error="showAlert()"
    />
  </div>
</template>

<script>
  import { ModelSelect } from 'vue-search-select'
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'

  import CalendarDay from './calendar/CalendarDay'

  export default {
    data () {
      return {
        pitch: null,
        date: null,
        time_length: null,
        players: null,
        options: [5, 6, 7],
        isError: false
      }
    },
    created() {
      this.$store.dispatch('loadPitches', {per_page: ''})
    },
    methods: {
      onSubmit () {
        const formData = {
          pitch_id: this.pitch,
          date: this.date,
          time_length: this.time_length,
          players_quantity: this.players
        }
        this.$store.dispatch('addGame', formData).then(() => {
          this.$router.push('/games/' + this.$store.getters.newGame)
        })
      },
    },
    computed: {
      showAlert() {
        this.isError = true
      },
      pitches() {
        return this.$store.getters.pitches.map(pitch => 
          (
            {
              value: pitch.id,
              text: pitch.city + ' | ' + pitch.address
            }
          )
        )
      },
      new_event() {
        const start_date = new Date(this.date)
        const end_date = new Date(start_date.setMinutes(start_date.getMinutes() + ~~this.time_length))
        const time_from = start_date.getHours() + ':' + start_date.getMinutes()
        const time_to = end_date.getHours() + ':' + end_date.getMinutes()
        return {
          description: "Twoja gra",
          time_from: time_from,
          time_to: time_to,
          type: "NewGame"
        }
      }
    },
    components: {
      ModelSelect,
      Datetime,
      CalendarDay
    }
  }
</script>

<style>
  .alert {
    color: red;
    font-size: 16pt;
    text-align: center;
  }
</style>