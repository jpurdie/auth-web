<template>
  <v-card class="mx-auto" outlined>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Password</v-toolbar-title>
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
      <v-form @keydown.enter="register" @submit.stop.prevent="onSubmit">
        <v-card-text>
          <ValidationProvider
            v-slot="{ errors }"
            name="existing password"
            rules="required"
          >
            <v-text-field
              v-model="currentPassword"
              autocomplete="off"
              :error-messages="errors"
              label="Existing Password"
              required
              type="password"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required|max:40"
          >
            <v-text-field
              v-model="newPassword"
              autocomplete="off"
              :error-messages="errors"
              label="Password"
              required
              type="password"
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="password confirm"
            rules="required|max:40"
          >
            <v-text-field
              v-model="newPasswordConfirm"
              autocomplete="off"
              :error-messages="errors"
              label="New Password Confirm"
              required
              type="password"
            ></v-text-field>
          </ValidationProvider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="disabledSubmit" @click="submit"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { updatePassword, reauthenticateWithCredential } from 'firebase/auth'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'settings',
  data() {
    return {
      alerts: [],
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      messageSuccess: '',
      disabledSubmit: false,
    }
  },
  mounted() {},
  methods: {
    async clear() {
      await this.$refs.observer.reset()
    },
    processAuthError(errorMsg) {
      errorMsg = String(errorMsg)
      if (errorMsg.includes('auth/too-many-requests')) {
        this.alerts = [
          {
            msg: 'Access to this account has been temporarily disabled due to many failed login attempts.',
            type: 'error',
          },
        ]
        return
      }

      if (errorMsg.includes('auth/wrong-password')) {
        this.alerts = [
          {
            msg: 'The password is invalid or the user does not have a password.',
            type: 'error',
          },
        ]
      }
    },
    async submit() {
      const $vm = this
      $vm.alerts = []
      $vm.disabledSubmit = true

      const isValid = await this.$refs.observer.validate()

      if (!isValid) {
        $vm.disabledSubmit = false
        return
      }

      if (this.newPassword !== this.newPasswordConfirm) {
        this.alerts = [{ msg: 'Passwords do not match', type: 'error' }]
        return false
      }

      const user = await this.$fire.auth.currentUser

      const credential = this.$fireModule.auth.EmailAuthProvider.credential(
        this.$store.state.authUser.email,
        this.currentPassword
      )

      let authenticated

      try {
        authenticated = await reauthenticateWithCredential(user, credential)
      } catch (error) {
        $vm.disabledSubmit = false
        this.processAuthError(error)
        return false
      }

      if (authenticated !== undefined) {
        try {
          const updatedPass = await updatePassword(user, this.newPassword)
          console.log('updatedPass', updatedPass)
          if (updatedPass === undefined) {
            this.alerts = [{ msg: 'Password Updated', type: 'success' }]
          }
          $vm.disabledSubmit = false
          this.clear()
          this.currentPassword = ''
          this.newPassword = ''
          this.newPasswordConfirm = ''
        } catch (error) {
          $vm.disabledSubmit = false
          this.processAuthError(error)
        }
      } else {
        $vm.disabledSubmit = false
      }
    },
  },
}
</script>
