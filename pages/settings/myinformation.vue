<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2"> <NavsSettingsNavDrawer /> </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" outlined>
          <v-toolbar dark color="primary">
            <v-toolbar-title>My Information</v-toolbar-title>
          </v-toolbar>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <v-form ref="form" class="pa-6">
              <v-card-text>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="First name"
                  rules="required|max:40"
                >
                  <v-text-field
                    :counter="40"
                    :error-messages="errors"
                    label="First name"
                    required
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Last name"
                  rules="required|max:40"
                >
                  <v-text-field
                    :counter="40"
                    :error-messages="errors"
                    label="Last name"
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleSubmit(submit)"
                  >Save</v-btn
                >
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
      user: {
        givenName: '',
        familyName: '',
      },
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      this.user = await this.$store.dispatch(
        'user/fetchUser',
        this.$auth.user.attributes.sub
      )
    },
    async clear() {
      await this.$refs.observer.reset()
    },
    async submit(e) {
      const isValid = await this.$refs.observer.validate()
      console.log('this.user', this.user)

      if (!isValid) {
        return false
      }
      await this.$store.dispatch('user/update', this.user)
    },
  },
}
</script>
