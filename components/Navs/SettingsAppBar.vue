<template>
  <span>
    <v-app-bar color="white" app>
      <v-toolbar-title class="ml-2">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-if="!$auth.isAuthenticated" class="mr-2" @click="dologin"
        >Login/Register</v-btn
      >
      <v-menu v-if="$auth.isAuthenticated" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            {{ $auth.user.attributes.given_name }}
            <v-icon>mdi-menu-down</v-icon>
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
  methods: {
    dologin() {
      this.$auth.loginWith('auth0')
    },
    async dologout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
  },
}
</script>
