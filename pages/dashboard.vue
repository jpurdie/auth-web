<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="mx-auto" outlined>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Dashboard</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-btn @click="pingAuth">Auth Ping</v-btn><br />
            <v-btn @click="nonAuthPing">Non Auth Ping</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      error: {
        code: '',
        descr: '',
      },
    }
  },
  created() {},
  async mounted() {},
  methods: {
    pingAuth() {
      this.$axios.get('api/v1/private')
    },
    nonAuthPing() {
      this.$axios.get('api/v1/public')
    },
  },
}
</script>
