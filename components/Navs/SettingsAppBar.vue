<template>
  <span>
    <v-app-bar color="white" app clipped-left>
      <v-img
        :src="require(`~/assets/logo_transparent.png`)"
        max-height="64"
        max-width="64"
        contain
      ></v-img>
      <router-link v-if="isLoggedIn" to="/dashboard">Dashboard</router-link>
      <v-spacer></v-spacer>

      <v-menu offset-y>
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
