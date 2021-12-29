<template>
  <v-card class="mx-auto" outlined>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Email</v-toolbar-title>
    </v-toolbar>
    <v-alert
      v-for="alert in alerts"
      :key="alert.text"
      class="mx-4 mt-4 mb-0"
      show
      :type="alert.type"
      >{{ alert.msg }}</v-alert
    >
    <ValidationObserver ref="observer">
      <v-form ref="form" class="pa-6" @submit.prevent="onSubmit()">
        <v-card-text>
          <ValidationProvider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="user.email"
              :counter="100"
              :error-messages="errors"
              label="Email"
              autocomplete="off"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="email" rules="required">
            <v-text-field
              v-model="user.password"
              :error-messages="errors"
              label="Enter password to change email"
              required
              autocomplete="off"
              type="password"
            ></v-text-field>
          </ValidationProvider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="disabledSubmit" type="submit"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { updateEmail, reauthenticateWithCredential } from 'firebase/auth'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      disabledSubmit: false,
      alerts: [],
      user: {
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    this.fetchme()
  },
  methods: {
    async fetchme() {
      const user = await this.$fire.auth.currentUser
      this.user.email = user.email
    },
    async resetFormErrors() {
      await this.$refs.observer.reset()
    },
    processAuthError(errorMsg) {
      errorMsg = String(errorMsg)
      if (errorMsg.includes('auth/wrong-password')) {
        this.alerts = [
          {
            msg: 'The password is invalid or the user does not have a password.',
            type: 'error',
          },
        ]
      }
    },
    async onSubmit() {
      const $vm = this
      this.alerts = []
      $vm.disabledSubmit = true
      const isValid = await $vm.$refs.observer.validate()
      if (!isValid) {
        $vm.disabledSubmit = false
        return
      }
      const user = await this.$fire.auth.currentUser

      const credential = this.$fireModule.auth.EmailAuthProvider.credential(
        this.$store.state.authUser.email,
        this.user.password
      )

      let authenticated

      try {
        authenticated = await reauthenticateWithCredential(user, credential)
      } catch (error) {
        $vm.disabledSubmit = false
        console.error(error)
        this.processAuthError(error)
        return false
      }

      if (authenticated !== undefined) {
        try {
          const resp = await updateEmail(user, this.user.email)
          if (resp === undefined) {
            $vm.alerts = [{ msg: 'Updated', type: 'success' }]
            $vm.resetFormErrors()
            $vm.disabledSubmit = false
          }
        } catch (error) {
          $vm.disabledSubmit = false
          $vm.alerts = [{ msg: String(error), type: 'error' }]
          console.error(error)
        }
      }
    },
  },
}
</script>
