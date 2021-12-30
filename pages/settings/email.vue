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
        <v-alert
          v-for="alert in alerts"
          :key="alert.text"
          show
          :type="alert.type"
          >{{ alert.msg }}</v-alert
        >
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
      const $vm = this
      $vm.alerts = []
      const user = await this.$fire.auth.currentUser
      try {
        await sendEmailVerification(user)
        $vm.alerts = [{ msg: 'Please check your email.', type: 'success' }]
      } catch (error) {
        $vm.processVerifcationError(error)
        console.error(error)
      }
    },
    processVerifcationError(errorMsg) {
      errorMsg = String(errorMsg)
      if (errorMsg.includes('auth/too-many-requests')) {
        this.alerts = [
          {
            msg: 'Too many requests. Try again later.',
            type: 'error',
          },
        ]
      }
    },
    async resetFormErrors() {
      await this.$refs.observer.reset()
    },
    async onSubmit() {},
  },
}
</script>
