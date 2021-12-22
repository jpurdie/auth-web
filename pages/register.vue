<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" lg="5">
        <!-- <v-card v-if="alertMessages" id="alert-div" class="elevation-12">
          <v-alert
            v-for="(item, index) in alertMessages"
            :key="index"
            show
            :type="item.type"
            >{{ item.msg }}</v-alert
          >
        </v-card> -->
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <ValidationObserver ref="obs">
              <v-form @keydown.enter="register" @submit.stop.prevent="onSubmit">
                <ValidationProvider
                  mode="lazy"
                  name="organization name"
                  rules="required|min:4|max:250"
                >
                  <v-text-field
                    v-model="organizationName"
                    slot-scope="{ errors }"
                    :error-messages="errors"
                    autocomplete="off"
                    label="Organization Name"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  mode="lazy"
                  name="first name"
                  rules="required|min:2|max:100"
                >
                  <v-text-field
                    v-model="givenName"
                    slot-scope="{ errors }"
                    :error-messages="errors"
                    autocomplete="off"
                    label="First Name"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  mode="lazy"
                  name="last name"
                  rules="required|min:2|max:80"
                >
                  <v-text-field
                    v-model="familyName"
                    slot-scope="{ errors }"
                    :error-messages="errors"
                    autocomplete="off"
                    label="Last Name"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  mode="lazy"
                  name="email"
                  rules="required|email|max:80"
                >
                  <v-text-field
                    v-model="email"
                    slot-scope="{ errors }"
                    :error-messages="errors"
                    label="Email"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  mode="lazy"
                  name="password"
                  rules="required|xpassword"
                >
                  <v-text-field
                    v-model="passwordFirst"
                    slot-scope="{ errors }"
                    :error-messages="errors"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="value ? 'password' : 'text'"
                    label="Password"
                    autocomplete="off"
                    required
                    hint="8 to 64 characters with at least one capital letter, one lowercase letter, and one number."
                    @click:append="() => (value = !value)"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  mode="lazy"
                  name="password confirm"
                  rules="required"
                >
                  <v-text-field
                    v-model="passwordConfirm"
                    slot-scope="{ errors }"
                    :error-messages="errors"
                    :type="value ? 'password' : 'text'"
                    label="Password Confirm"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-form>
            </ValidationObserver>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" @click="nonAuthPing">Ping</v-btn>

            <v-btn :disabled="disableRgstrBtn" color="primary" @click="register"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      organizationName: undefined,
      email: undefined,
      passwordFirst: undefined,
      passwordConfirm: undefined,
      givenName: undefined,
      familyName: undefined,
      disableRgstrBtn: false,
      valid: true,
      value: true,
      user: undefined,
      authState: undefined,
    }
  },
  computed: mapGetters({}),
  created() {},
  beforeDestroy() {
    return onAuthUIStateChange
  },
  methods: {
    nonAuthPing() {
      this.$axios.get('/api/v1/public')
    },
    redirectSuccess() {
      this.$router.push({
        path: '/login',
      })
    },
    async register() {
      const $vm = this
      try {
        const user = await this.$fire.auth.createUserWithEmailAndPassword(
          $vm.email,
          $vm.passwordFirst
        )

        console.log('User Created', user)
      } catch (e) {
        console.error(e)
      }

      // const $vm = this
      // $vm.disableRgstrBtn = true

      // const isValid = await $vm.$refs.obs.validate()
      // if (!isValid) {
      //   $vm.disableRgstrBtn = false
      //   return
      // }

      // const profile = {
      //   familyName: $vm.familyName,
      //   givenName: $vm.givenName,
      //   organizationName: $vm.organizationName,
      //   email: $vm.email,
      //   password: $vm.passwordFirst,
      //   passwordConfirm: $vm.passwordConfirm,
      // }

      // await $vm.$store.dispatch('auth/signUpAmplify', profile)

      // if ($vm.alertMessages) {
      //   this.$nextTick(() => {
      //     const el = document.getElementById('alert-div')
      //     if (el) {
      //       el.scrollIntoView({
      //         behavior: 'smooth',
      //         block: 'end',
      //         inline: 'nearest',
      //       })
      //     }
      //   })
      // }
      // $vm.disableRgstrBtn = false

      // if ($vm.userErrors !== undefined && $vm.userErrors.length === 0) {
      //   $vm.redirectSuccess()
      // }
    },
  },
}
</script>
