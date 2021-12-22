export default function ({ $axios, store }) {
  $axios.onRequest(async (config) => {
    try {
      /// Store action to get or retrieve a token if it has expired
      const sess = await store.$fire.auth.currentUser.getIdToken()
      $axios.setToken(sess, 'Bearer')
    } catch (error) {
      console.log('Could not update token:', error)
    }
    return config
  })
}
