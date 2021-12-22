<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2"> <NavsSettingsNavDrawer /> </v-col>
      <v-col cols="12" md="6">
        <v-card v-if="error" id="errors-div" class="elevation-12">
          <v-alert show type="error">{{ error }}</v-alert>
        </v-card>
        <v-card v-if="messageSuccess" id="errors-div" class="elevation-12">
          <v-alert show type="success">{{ messageSuccess }}</v-alert>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Security</v-toolbar-title>
          </v-toolbar>
          <ValidationObserver ref="obs">
            <v-form @keydown.enter="register" @submit.stop.prevent="onSubmit">
              <v-card-text>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Existing Password"
                  rules="required"
                >
                  <v-text-field
                    v-model="currentPassword"
                    :error-messages="errors"
                    label="Existing Password"
                    required
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="New Password"
                  rules="required|max:40"
                >
                  <v-text-field
                    v-model="newPassword"
                    :error-messages="errors"
                    label="New Password"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="New Password Confirm"
                  rules="required|max:40"
                >
                  <v-text-field
                    v-model="newPasswordConfirm"
                    :error-messages="errors"
                    label="New Password Confirm"
                    required
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'settings',
  middleware: 'authz',

  data() {
    return {
      error: undefined,
      currentPassword: 'Mock123456!',
      newPassword: 'Mock123456?',
      newPasswordConfirm: 'Mock123456?',
      messageSuccess: '',
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      // this.user = await this.$store.dispatch('user/fetchMe')
    },
    async clear() {
      await this.$refs.observer.reset()
    },
    async submit() {
      this.messageSuccess = ''
      this.error = ''

      if (this.newPassword !== this.newPasswordConfirm) {
        this.error = "Passwords don't match."
        return false
      }

      try {
        const resp = await this.$store.dispatch('auth/changePassword', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
        if (resp === 'SUCCESS') {
          this.messageSuccess = 'Updated.'
        } else {
          this.messageSuccess = resp
        }
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>
