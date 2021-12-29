<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2">
        <NavsSettingsNav />
      </v-col>
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
            <v-toolbar-title>My Information</v-toolbar-title>
          </v-toolbar>
          <ValidationObserver ref="observer">
            <v-form ref="form" class="pa-6" @submit.prevent="onSubmit()">
              <v-card-text>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|max:40"
                >
                  <v-text-field
                    v-model="user.displayName"
                    :counter="40"
                    :error-messages="errors"
                    label="Name"
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Save</v-btn>
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
import { updateProfile } from 'firebase/auth'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'settings',
  data() {
    return {
      alerts: [],
      user: {
        displayName: '',
      },
    }
  },
  mounted() {
    this.alerts = []
    this.fetchme()
  },
  methods: {
    async fetchme() {
      const user = await this.$fire.auth.currentUser
      this.user.displayName = user.displayName
    },
    async clear() {
      await this.$refs.observer.reset()
    },
    async onSubmit() {
      const $vm = this
      this.alerts = []
      const isValid = await $vm.$refs.observer.validate()

      if (!isValid) {
        return
      }
      try {
        const user = await $vm.$fire.auth.currentUser
        const newProfile = {
          displayName: $vm.user.displayName,
        }

        const resp = await updateProfile(user, newProfile)
        console.log('Updated Profile Results', resp)

        if (resp === undefined) {
          $vm.alerts = [{ msg: 'Updated', type: 'success' }]
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
