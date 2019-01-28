<template>
  <div>
    <component v-bind:is="layout"></component>
  </div>
</template>
 
<script>
  export default {
    created() {
      this.$store.dispatch('tryAutoLogin')
    },
    computed: {
      layout () {
        return this.$route.meta.layout || 'default-layout'
      }
    }
  }
</script>
