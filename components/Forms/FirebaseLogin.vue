<template>
  <div>
    <v-card v-if="error" id="errors-div" class="elevation-12">
      <v-alert show type="error">{{ error }}</v-alert>
    </v-card>
    <h1>Login</h1>

    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    error: '',
  }),
  mounted() {
    const $vm = this
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        {
          provider: this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account',
          },
        },
      ],
      signInSuccessUrl: '/dashboard',
      callbacks: {
        signInSuccessWithAuthResult() {
          $vm.$router.push('/dashboard')
        },
        uiShown() {
          console.log('uiShown')
        },
        uiChanged(from, toPageId) {
          if (from === 'signIn' && toPageId === 'passwordSignUp') {
            $vm.$router.push('/register')
            return false
          }
        },
      },
    }
    ui.start('#firebaseui-auth-container', config)
  },
  methods: {
    async signInUser() {
      try {
        const user = await this.$fire.auth.signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        )
        console.log('Login user', user)
        if (user !== null) {
          this.$router.push('/signed-in')
        }
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style>
.firebaseui-card-header {
  display: none !important;
}
.firebaseui-card-content {
  padding: 24px 24px !important;
}
</style>
