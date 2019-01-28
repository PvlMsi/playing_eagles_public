<template>
  <div class="card">
    <div class="card-header">
      {{ game.pitch.address }}, {{ game.pitch.city }}
    </div>
    <div class="card-body">
      <div class="container">
        <div class="row">
          <div class="col">
            <h5 class="card-title">{{ game.date }}</h5>
            <p class="card-text">Czas gry: {{ game.time_length }} minut</p>
            <p class="card-text">Wolnych miejsc: {{ game.seats_left.length }}</p>
            <ul>
              <router-link :to="'/games/' + game.id" :game_url="game.game_url" class="nav-link" tag="li">
                <a href="#" class="btn btn-primary">Szczegóły</a>
              </router-link>
            </ul>
          </div>
          <div class="col">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Field from "../field/Field.vue";
  export default {
    props: ['game'],
    components: {
      appField: Field
    },
  }
</script>


<style>
  .card {
    margin-bottom: 20px;
  }
</style>
