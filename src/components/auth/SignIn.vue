<template>
  <div class="container">
    <div class="login-box">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          label="Adres Email:"
        >
          <b-form-input
            type="email"
            v-model="email"
            required
            placeholder="Wprowadź Email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Hasło:"
        >
          <b-form-input
            type="password"
            v-model="password"
            required
            placeholder="Wprowadź hasło"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="float-right" variant="primary">Zaloguj</b-button>
        <router-link to="/signup">
          <a href="#">Nie masz konta?</a>
        </router-link>
      </b-form>
    </div>
  </div>
</template>

<script>
  import Api from '../../services/Api'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('signIn', formData).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="scss">
  .container{
    height: 100%;
    align-content: center;
  }
  .login-box{
    height: 250px;
    margin: 0 auto;
    width: 400px;
    padding: 20px;
    border: 2px solid grey;
    border-radius: 20px;
  }
</style>