<template>
  <span>
    <v-app-bar color="white" app>
      <router-link to="/"
        ><v-img
          :src="require(`~/assets/logo_transparent.png`)"
          max-height="64"
          max-width="64"
          contain
        ></v-img>
      </router-link>
      <router-link to="/">Vitae</router-link>
      <v-spacer></v-spacer>
      <div v-if="!isLoggedIn">
        <v-btn class="mr-2" to="/login">Login</v-btn>
        <v-btn class="mr-2" to="/register">Register</v-btn>
      </div>
      <v-menu v-if="isLoggedIn" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            {{ initials }}<v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="'/settings/myinformation'">
            <v-list-item-title>My Information</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dologout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </span>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Admin',
          to: '/admin',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      initials: 'getInitials',
    }),
  },
  methods: {
    dologin() {
      //  this.$auth.loginWith('awsCognito')
    },
    authModuleRegister() {
      // this.$auth.loginWith('awsCognito')
    },
    async dologout() {
      try {
        await this.$fire.auth.signOut()
        this.$router.push('/')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
