<template>
  <div class="container">
    <div>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Imię">
          <b-form-input
            v-model="user.first_name"
          />
        </b-form-group>
        <b-form-group label="Nazwisko">
          <b-form-input
            v-model="user.last_name"
          />
        </b-form-group>
        <b-form-group label="Data urodzenia:">
          <b-form-input
            v-model="user.birth_date"
            type="date"
          />
        </b-form-group>
        <b-form-group label="Numer telefonu:">
          <vue-tel-input
            v-model="user.phone_number"
            @onInput="onInput"
            :preferredCountries="['pl']">
          </vue-tel-input>
        </b-form-group>
        <b-form-group label="Miasto:">
          <b-form-input
            v-model="user.city"
          />
        </b-form-group>
        <b-form-group label="Hasło:">
          <b-form-input
            v-model="password"
            type="password"
          />
        </b-form-group>
        <b-form-group label="Powtórz hasło:">
          <b-form-input
            v-model="password_confirmation"
            type="password"
          />
        </b-form-group>
        <b-button type="submit" class="float-right" variant="primary">Edytuj</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
  import 'vue-tel-input/dist/vue-tel-input.css';
  import VueTelInput from 'vue-tel-input'

  export default {
    data () {
      return {
        password: null,
        password_confirmation: null
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch('editUser', this.user).then(() => {
          this.$router.push('/user/' + this.user.id)
        })
      },
      onInput({ number, isValid, country }) {
        console.log(number, isValid, country);
      },
    },
    created() {
      this.$store.dispatch('loadUser', localStorage.getItem('user-id'));
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
    },
    components: {
      VueTelInput,
    },
  }
</script>

<style lang="scss">

</style>