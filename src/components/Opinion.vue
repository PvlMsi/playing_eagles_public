<template>
  <div class="card">
    <div class="card-header">
    </div>
    <div class="card-body">
      <div class="container">
        <div class="row">
          <div class="col">
            <p>Ocena fair play: {{opinion.fair_play_rate}}</p>
            <p>Czy polecasz gracza: {{opinion.fair_play_rate}}</p>
            <p>Dotyczy gry:</p>
            <p>
              Wystawił:
              <router-link :to="'/user/' + opinion.issuing_user_id" class="nav-link" tag="li">
                <a href="#" class="btn btn-primary">{{opinion.issuing_user_name}}</a>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['opinion']
    
  }
</script>

<style>
  .card {
    margin-bottom: 20px;
  }
</style>
