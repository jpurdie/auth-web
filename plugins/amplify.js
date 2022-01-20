import Vue from 'vue'
import '@aws-amplify/ui-components'
import Amplify, { Auth } from 'aws-amplify'
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader'

Amplify.configure({
  Auth: {
    region: process.env.COGNITO_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      scope: ['email', 'openid'],
      redirectSignIn: `https://${process.env.BASE_URL}/`,
      redirectSignOut: `https://${process.env.BASE_URL}/`,
      responseType: 'code',
    },
  },
  API: {
    endpoints: [
      {
        name: 'UserAPI',
        endpoint: `https://${process.env.API_URL}`,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          }
        },
      },
    ],
  },
})

applyPolyfills().then(() => {
  defineCustomElements(window)
})

Vue.config.ignoredElements = [/amplify-\w*/]

Vue.prototype.$Amplify = Amplify
