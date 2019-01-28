<template>
  <div class="user-profile">
    <div>
      <div>
        <div class="useravatar">
          <font-awesome-icon
            icon="user"
            class="fa-5x"
          />
        </div>
        <div class="card-info">
          <h3>{{user.first_name}} {{user.last_name}}</h3>
        </div>
      </div>
      <div>
        <b-tabs>
          <b-tab title="Dane" active>
            <table>
              <tr>
                <td>Email</td>
                <td>{{user.email}}</td>
              </tr>
              <tr>
                <td>Miasto</td>
                <td>{{user.city}}</td>
              </tr>
              <tr>
                <td>Data urodzenia:</td>
                <td>{{user.birth_date}}</td>
              </tr>
            </table>
          </b-tab>
          <b-tab title="Historia gier" >
            <games-history :user_id="user_id"/>
          </b-tab>
          <b-tab title="Opinie">
            <app-opinions :user_id="user_id"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import GamesHistory from './history/GamesHistory'
  import Opinions from './Opinions'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUser } from '@fortawesome/free-solid-svg-icons'
  library.add(faUser)

  export default {
    created() {
      this.$store.dispatch('loadUser', this.user_id);
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      user_id() {
        const path = window.location.pathname.split("/");
        return path[path.length-1];
      }
    },
    components: {
      GamesHistory,
      appOpinions: Opinions
    }
  }
</script>

<style lang="scss">
  .useravatar {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, 0.5);
    background-color: grey;
    text-align: center;
    margin: auto;
    line-height: 10em;
    overflow: hidden;
  }

  .user-profile {
    width: 100%;
    text-align: center;
    // color: rgba(255, 255, 255, 0.5);
  }
  
</style>
