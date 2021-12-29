<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2"> <NavsSettingsNav /> </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" outlined>
          <v-toolbar dark color="primary">
            <v-toolbar-title>User Info</v-toolbar-title>
          </v-toolbar>
          <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  layout: 'settings',
  data() {
    return {
      user: {},
    }
  },
  created() {},
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      const user = await this.$fire.auth.currentUser
      this.user = user
    },
  },
}
</script>
