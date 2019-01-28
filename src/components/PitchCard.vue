<template>
   <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col text-center">
          <h5>{{ pitch.address }}, {{ pitch.city }}</h5>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <router-link :to="pitch.url" class="nav-link" tag="li">
            <a href="#" class="btn btn-primary">Szczegóły</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['pitch']
  }
</script>

<style>
  .card {
    margin-bottom: 20px;
  }
</style>