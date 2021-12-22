<template>
  <v-app>
    <index-nav />
    <v-main>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import IndexNav from '~/components/Navs/IndexNav.vue'
export default {
  components: { IndexNav },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Public',
          to: '/public',
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
      this.$auth.loginWith('awsCognito')
    },
    dologout() {
      this.$auth.logout('awsCognito')
    },
  },
}
</script>
