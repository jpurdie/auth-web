<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2"> <NavsSettingsNavDrawer /> </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" outlined>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Token Info</v-toolbar-title>
          </v-toolbar>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Property</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{{ email }}</td>
                </tr>
                <tr>
                  <td>Phone number</td>
                  <td>{{ phoneNumber }}</td>
                </tr>
                <tr>
                  <td>UserId/sub</td>
                  <td>{{ userId }}</td>
                </tr>
                <tr>
                  <td>User name</td>
                  <td>{{ username }}</td>
                </tr>
                <tr>
                  <td>Access Token</td>
                  <td>{{ accessToken }}</td>
                </tr>
                <tr>
                  <td>Refresh Token</td>
                  <td>{{ refreshToken }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  layout: 'settings',
  middleware: 'authz',
  data() {
    return {
      error: {
        code: '',
        descr: '',
      },
      email: null,
      phoneNumber: null,
      userId: null,
      username: null,
      accessToken: null,
      refreshToken: null,
    }
  },

  created() {
    this.email = this.$auth.user.email
    this.phoneNumber = this.$auth.user.phone_number
    this.userId = this.$auth.user.sub
    this.username = this.$auth.user.username
    this.accessToken = this.$auth.strategy.token.get()
    this.refreshToken = this.$auth.strategy.refreshToken.get()
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      this.user = await this.$store.dispatch('user/fetchMe')
    },
    async clear() {
      await this.$refs.observer.reset()
    },
    async submit(e) {
      const isValid = await this.$refs.observer.validate()
      console.log('this.user', this.user)

      if (!isValid) {
        return false
      }
      await this.$store.dispatch('user/update', this.user)
    },
  },
}
</script>
