<template>
  <v-card class="mx-auto" outlined>
    <v-toolbar dark color="primary">
      <v-toolbar-title>My Information</v-toolbar-title>
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
            name="Name"
            rules="required|max:100"
          >
            <v-text-field
              v-model="user.displayName"
              :counter="100"
              :error-messages="errors"
              label="Name"
              required
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
import { updateProfile } from 'firebase/auth'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'settings',
  data() {
    return {
      disabledSubmit: false,
      alerts: [],
      user: {
        displayName: '',
      },
    }
  },
  mounted() {
    this.fetchme()
  },
  methods: {
    async fetchme() {
      const user = await this.$fire.auth.currentUser
      this.user.displayName = user.displayName
    },
    async resetFormErrors() {
      await this.$refs.observer.reset()
    },
    async onSubmit() {
      const $vm = this
      $vm.alerts = []
      $vm.disabledSubmit = true
      const isValid = await $vm.$refs.observer.validate()

      if (!isValid) {
        $vm.disabledSubmit = false
        return
      }

      try {
        const user = await $vm.$fire.auth.currentUser
        const newProfile = {
          displayName: $vm.user.displayName,
        }

        const resp = await updateProfile(user, newProfile)

        if (resp === undefined) {
          $vm.disabledSubmit = false
          $vm.alerts = [{ msg: 'Success', type: 'success' }]
          $vm.resetFormErrors()
        }
      } catch (error) {
        $vm.disabledSubmit = false
        $vm.alerts = [{ msg: String(error), type: 'error' }]
        console.error(error)
      }
    },
  },
}
</script>
