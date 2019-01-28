<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link" tag="li">
            <a>
              <font-awesome-icon
                icon="futbol"
                class="fa-lg"
              />
              Lista gier <span class="sr-only">(current)</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/new_game" class="nav-link" activeClass="active" tag="li">
            <a>
              <font-awesome-icon
                icon="calendar-alt"
                class="fa-lg"
              />
              Zorganiuzj gre
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/pitches" class="nav-link" activeClass="active" tag="li">
            <a>
              <font-awesome-icon
                icon="map-marker-alt"
                class="fa-lg"
              />
              Boiska
            </a>
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <!-- <span>Mój profil</span> -->
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link :to="'/user/'+user_id" class="nav-link" tag="li">
            <a>
              <font-awesome-icon
                icon="user"
                class="fa-lg"
              />
              Mój profil
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/edit_profile" class="nav-link" tag="li">
            <a>
              <font-awesome-icon
                icon="address-card"
                class="fa-lg"
              />
              Edytuj profil
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faFutbol  } from '@fortawesome/free-solid-svg-icons'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
  import { faAddressCard  } from '@fortawesome/free-solid-svg-icons'
  import { faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons'
  
  library.add(faFutbol)
  library.add(faCalendarAlt)
  library.add(faAddressCard)
  library.add(faMapMarkerAlt)

  export default {
    computed: {
      user_id() {
        return localStorage.getItem('user-id')
      }
    }
  }
</script>


<style>
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
  }

  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }

  .sidebar .nav-link {
    color: gray;
  }

  .sidebar .nav-link.active {
    color: #007bff;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }

</style>
