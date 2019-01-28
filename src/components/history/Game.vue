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
            <ul>
              <router-link :to="'/games/' + game.id" class="nav-link" tag="li">
                <a href="#" class="btn btn-primary">Szczegóły</a>
              </router-link>
            </ul>
          </div>
          <div class="col">
            tu bedzie boisko
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['game']
  }
</script>


<style>
  .card {
    margin-bottom: 20px;
  }
</style>
