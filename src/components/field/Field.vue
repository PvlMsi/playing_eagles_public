<template>
  <div class="field">
    <app-field-half :team="players.first_team" :type="'top'"></app-field-half>
    <app-field-half :team="players.second_team" :type="'bottom'"></app-field-half>
  </div>
</template>

<script>
  import FieldHalf from "./FieldHalf.vue";

  export default {
    props: ['players'],
    components: {
      appFieldHalf: FieldHalf
    }
  }
</script>

<style lang="scss">
  .field {
    background-color: #e7eef1;
    border: 10px solid #e7eef1;
    width: 30em;
  }
</style>

