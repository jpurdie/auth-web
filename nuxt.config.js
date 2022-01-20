/* eslint-disable no-undef */
import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - frontend_app',
    title: 'frontend_app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  dev: 'prod'.includes(process.env.NODE_ENV) || process.env.NODE_ENV === '',
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV || 'prod',
    foo: process.env.FOO || undefined,
    appName: process.env.APP_NAME || 'Vitae',
    baseURL: 'https://' + process.env.BASE_URL,
    apiURL: process.env.API_URL,
  },
  env: {
    COGNITO_USER_POOL: process.env.COGNITO_USER_POOL || '',
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || '',
    COGNITO_REGION: process.env.COGNITO_REGION || '',
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || '',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/axios.js',
    { src: '~/plugins/amplify.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    progress: true,
  },
  firebase: {
    config: {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      // projectId: process.env.FIREBASE_PROJECT_ID,
      // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      // appId: process.env.FIREBASE_APP_ID,
      // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          onIdTokenChangedAction: 'onAuthStateChangedAction',
        },
        ssr: false,
        disableEmulatorWarnings: false,
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#002244',
          secondary: '#8A8D8F',
          accent: '#69BE28',
          error: '#f44336',
          warning: '#ffeb3b',
          info: '#03a9f4',
          success: '#8bc34a',
        },
        light: {
          primary: '#002244',
          secondary: '#8A8D8F',
          accent: '#69BE28',
          error: '#f44336',
          warning: '#ffeb3b',
          info: '#03a9f4',
          success: '#8bc34a',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
  auth: {
    redirect: false,
    strategies: {
      local: false,
      awsCognito: {
        scheme: 'oauth2',
        endpoints: {
          authorization:
            'https://' +
            process.env.COGNITO_USER_POOL +
            '.auth.' +
            process.env.COGNITO_REGION +
            '.amazoncognito.com/login',
          token:
            'https://' +
            process.env.COGNITO_USER_POOL +
            '.auth.' +
            process.env.COGNITO_REGION +
            '.amazoncognito.com/oauth2/token',
          userInfo:
            'https://' +
            process.env.COGNITO_USER_POOL +
            '.auth.' +
            process.env.COGNITO_REGION +
            '.amazoncognito.com/oauth2/userInfo',
          logout:
            'https://' +
            process.env.COGNITO_USER_POOL +
            '.auth.' +
            process.env.COGNITO_REGION +
            '.amazoncognito.com/logout',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 60 * 60,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        redirectUri: 'http://localhost:3000/signed-in/',
        logoutRedirectUri: 'http://localhost:3000/',
        scope: ['email', 'openid', 'profile'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: 'S256',
        responseMode: '',
        acrValues: '',
        clientId: process.env.COGNITO_CLIENT_ID,
      },
      auth0: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://' + process.env.AUTH0_DOMAIN + '/authorize',
          token: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
          userInfo: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
          logout: 'https://' + process.env.AUTH0_DOMAIN + '/logout',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        // user: {
        //   property: "user",
        //   autoFetch: true
        // },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        redirectUri: 'http://' + process.env.BASE_URL + '/signed-in',
        logoutRedirectUri: 'http://' + process.env.BASE_URL + '/signed-in',
        audience: process.env.AUTH0_AUDIENCE,
        clientId: process.env.AUTH0_CLIENT_ID,
        scope: ['openid', 'profile', 'email'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: '',
        // autoLogout: false
      },
    },
  },
}
