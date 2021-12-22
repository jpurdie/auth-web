<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" lg="5">
        <v-card v-if="error" id="errors-div" class="elevation-12">
          <v-alert show type="error">{{ error }}</v-alert>
        </v-card>
        <div id="firebaseui-auth-container"></div>

        <!-- <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  class="form-control"
                  autocomplete="off"
                />
                <v-text-field
                  v-model="form.password"
                  autocomplete="off"
                  type="password"
                  placeholder="Password"
                  class="form-control"
                />
                <nuxt-link to="/auth/forgotpassword">Forgot password</nuxt-link>
              </v-form>
            </div>
          </v-card-text>
         <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signInUser">Login</v-btn>
          </v-card-actions>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    newPasswordReq: false,
    passwordConfirm1: '',
    passwordConfirm2: '',
    form: {
      email: 'kecivog563@wolfpat.com',
      password: 'Mock123456',
    },
    error: '',
  }),
  mounted() {
    const $vm = this
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')
    // https://github.com/firebase/firebaseui-web/issues/216
    // for below version 7
    // const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.$fireAuth)
    // for version 7 and above
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // this.$fireAuthObj.GoogleAuthProvider.PROVIDER_ID
        this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/dashboard',
      // tosUrl: '/tos',
      // privacyPolicyUrl: '/privacy',
      callbacks: {
        signInSuccessWithAuthResult() {
          $vm.$router.push('/dashboard')
          console.log('signInSuccessWithAuthResult')
        },
        uiShown() {
          console.log('uiShown')
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

<style scoped>
.firebaseui-card-header {
  display: none;
}
.firebaseui-title {
  display: none;
}
.firebaseui-card-header {
  padding-bottom: 16px;
}
.firebaseui-card-header::after {
  content: 'Sign up with email';
  color: rgba(0, 0, 0, 0.87);
  direction: ltr;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin: 0;
  padding: 0;
  padding-bottom: 0px;
  text-align: left;
}
</style>
