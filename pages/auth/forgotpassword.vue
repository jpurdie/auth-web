<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" lg="5">
        <v-card v-if="error" id="errors-div" class="elevation-12">
          <v-alert show type="error">{{ error }}</v-alert>
        </v-card>
        <v-card v-if="successMessage" id="errors-div" class="elevation-12">
          <v-alert show type="success">{{ successMessage }}</v-alert>
        </v-card>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Reset Password</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div>
              <v-form v-if="!$auth.isAuthenticated">
                <v-text-field
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  class="form-control"
                />
              </v-form>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="sendRequest"
              >Request Password Reset</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: 'cesexex504@suggerin.com',
    },
    error: '',
    successMessage: '',
  }),
  methods: {
    async sendRequest() {
      try {
        const resp = await this.$store.dispatch(
          'auth/changePassword',
          this.form.email
        )
        if (resp) {
          this.successMessage = 'Sent.'
          this.form.email = ''
        }
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>
