<template>
  <div>
    <div>
      <div v-if="authState !== 'signedin'">You are signed out.</div>
      <amplify-authenticator>
        <div v-if="authState === 'signedin' && user">
          <div>Hello, {{ user.username }}</div>
        </div>
        <amplify-sign-out></amplify-sign-out>
      </amplify-authenticator>
    </div>
  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'AuthStateApp',
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
        { type: 'username' },
        { type: 'password' },
        { type: 'email' },
      ],
    }
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState
      this.user = authData
    })
  },
  beforeDestroy() {
    this.unsubscribeAuth()
  },
}
</script>
