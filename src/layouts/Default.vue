<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row">
        <app-nav-bar></app-nav-bar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  import Header from '../components/Header.vue'
  export default {
    components: {
      appNavBar: NavBar,
      appHeader: Header
    }
  }
</script>

<style lang="scss">
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
</style>
