<template>
  <div class="container">
    <div class="register-box">
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
        <b-form-group
          label="Potwierdź hasło:"
        >
          <b-form-input
            type="password"
            v-model="password_confirmation"
            required
            placeholder="Potwierdź hasło"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="float-right" variant="primary">Rejestruj</b-button>
        <router-link to="/signin">
          <a href="#">Posiadam już konto</a>
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
        password: '',
        password_confirmation: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        this.$store.dispatch('signUp', formData).then(() => {
          this.$router.push('/signin')
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
  .register-box{
    height: 350px;
    margin: 0 auto;
    width: 400px;
    padding: 20px;
    border: 2px solid grey;
    border-radius: 20px;
  }
</style>