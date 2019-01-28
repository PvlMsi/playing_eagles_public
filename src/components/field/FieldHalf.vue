<template>
  <div class="field-half">
    <table>
      <tbody v-if="type === 'top'">
        <tr>
          <td colspan="3" v-for="player in team" :key="player.id" v-if="player.position === 0">
            <app-player :player="player"></app-player>
          </td>                      
        </tr>
        <tr>
          <td v-for="player in team" :key="player.id" v-if="player.position === 1">
            <app-player :player="player"></app-player>
          </td>
        </tr>
        <tr>
          <td v-for="player in team" :key="player.id" v-if="player.position === 2">
            <app-player :player="player"></app-player>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td v-for="player in team" :key="player.id" v-if="player.position === 2">
            <app-player :player="player"></app-player>
          </td>
        </tr>
        <tr>
          <td v-for="player in team" :key="player.id" v-if="player.position === 1">
            <app-player :player="player"></app-player>
          </td>
        </tr>
        <tr>
          <td colspan="3" v-for="player in team" :key="player.id" v-if="player.position === 0">
            <app-player :player="player"></app-player>
          </td>                      
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Player from './Player.vue'

  export default {
    props: [
      'team',
      'type'
    ],
    components: {
      appPlayer: Player
    }
  }
</script>


<style lang="scss">
  .field-half {
    background-color: green;
    height: 21em;
    margin-bottom: 10px;

    table {
      width: 100%
    }
    td {
      text-align: center;
      height: 7em;
    }
  }
</style>

