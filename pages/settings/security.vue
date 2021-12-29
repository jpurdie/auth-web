<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2"> <NavsSettingsNav /> </v-col>
      <v-col cols="12" md="6">
        <v-card v-if="alerts" id="messages-div" class="elevation-12">
          <v-alert
            v-for="alert in alerts"
            :key="alert.text"
            show
            :type="alert.type"
            >{{ alert.msg }}</v-alert
          >
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Security</v-toolbar-title>
          </v-toolbar>
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
                <v-btn color="primary" @click="submit">Save</v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      this.alerts = []
      const isValid = await this.$refs.observer.validate()

      if (!isValid) {
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
          this.clear()
          this.currentPassword = ''
          this.newPassword = ''
          this.newPasswordConfirm = ''
        } catch (error) {
          this.processAuthError(error)
        }
      }
    },
  },
}
</script>
