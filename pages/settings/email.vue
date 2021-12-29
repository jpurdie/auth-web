<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2">
        <NavsSettingsNav />
      </v-col>
      <v-col cols="12" md="6">
        <FormsMyEmail />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="2"> </v-col>
      <v-col cols="12" md="6">
        <v-btn v-if="!emailVerified" @click="sendVerification"
          >Send email verification</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { sendEmailVerification } from 'firebase/auth'

export default {
  components: {},
  layout: 'settings',
  data() {
    return {
      emailVerified: false,
      alerts: [],
    }
  },
  mounted() {
    this.checkVerification()
  },
  methods: {
    async checkVerification() {
      const user = await this.$fire.auth.currentUser
      this.emailVerified = user.emailVerified
    },
    async sendVerification() {
      const user = await this.$fire.auth.currentUser
      try {
        const resp = await sendEmailVerification(user)
        console.log('resp', resp)
      } catch (error) {
        console.error(error)
      }
    },
    async resetFormErrors() {
      await this.$refs.observer.reset()
    },
    async onSubmit() {},
  },
}
</script>
