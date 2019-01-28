<template>
  <div class="calendar">
    <table class="table">
      <tbody>
        <tr v-for="hour in hours">
          <td style="width: 5%;">{{hour[0]}}</td>
          <td :class="{ 
            game: hour[1] && hour[1].type == 'Game',
            'scheduled-event': hour[1] && hour[1].type == 'ScheduledEvent',
            'new-game': hour[1] && hour[1].type == 'NewGame'}" >
            <router-link v-if="hour[1] && hour[1].type != 'NewGame'" style='display: block;' :to="hour[1].event_url">
              {{hour[1].description}}
            </router-link>
            <template v-if="hour[1] && hour[1].type == 'NewGame'">{{hour[1].description}}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: []
    }
  },
  props: [
    'pitch_id',
    'start_hour',
    'end_hour',
    'date',
    'new_event'
  ],
  computed: {
    hours() {
      const hours = Array.from(Array(this.$props.end_hour - this.$props.start_hour), (_,x) => x + this.$props.start_hour);
      const minutes = ['00', '15', '30', '45']
      var timeLine = []
      hours.forEach((hour) => {
        minutes.forEach((minute) => {
          var event = null
          var time = (hour < 10 ? '0' : '') + hour + ':' + minute
          this.events.map((e) => {
            if (e.time_from <= time && time <= e.time_to) {
              event = e
            }
          })
          const n_e = this.$props.new_event
          if (n_e) {
            if (n_e.time_from <= time && time <= n_e.time_to) {
              if (event) {
                this.$emit('error')
                this.$props.new_event = null
              } else {
                event = n_e
              }
            }
          }
          timeLine.push([time, event])
        })
      })
      return timeLine
    },
    isTaken() {
      return true
    }
  },
  watch: {
    date: function () {
      this.$store.dispatch('loadEvents', {
        pitch_id: this.$props.pitch_id, 
        date: this.$props.date
      }).then(() => {
        this.events = this.$store.getters.events
      })
    },
    'new_event.time_to': function () {
      console.log('sdsdsd')
    }
  }
}
</script>

<style scoped>
  .game {
    background-color: red;
    border: none !important;
  }
  .scheduled-event {
    background-color: cornflowerblue;
    border: none !important;
  }
  .new-game {
    background-color: lightgreen;
    border: none !important;
  }
  .calendar {
    position:relative;
    height:400px;
    overflow-y:scroll;
  }
</style>
