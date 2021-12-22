<template>
  <v-container>
    <v-row>
      <v-col xs="6"> You are signed in. </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {}
  },
  async mounted() {
    await this.dothis()
    this.$router.push('/dashboard')
  },
  methods: {
    async dothis() {
      // await console.log('Fire', this.$fire)
      //  await this.$auth.fetchUser()
    },
    async fetchMe() {
      // await this.$store.dispatch('user/fetchMe')
    },
  },
}
</script>
