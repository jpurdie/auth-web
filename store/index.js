const getDefaultState = () => {
  return {
    authEmail: '',
    authUser: null,
    token: null,
  }
}

const state = getDefaultState()

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        commit('SET_TOKEN', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
  },
  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      throw new 'Vuex Store example not working - this.$fire.auth cannot be accessed.'()
    }
    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    console.log('Auth User 0')
    state.token = token
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
    } else {
      console.log('Auth User 1', authUser)
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
  },
  SET_AUTH_USER: (state, { authUser }) => {
    console.log('Auth User 2', authUser)

    state.authUser = {
      displayName: authUser.displayName,
      uid: authUser.uid,
      email: authUser.email,
    }
  },
}

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.uid !== null
    } catch {
      return false
    }
  },
  getInitials(state) {
    if (state.authUser !== null && state.authUser.displayName !== null) {
      return state.authUser.displayName
        .match(/(^\S\S?|\b\S)?/g)
        .join('')
        .match(/(^\S|\S$)?/g)
        .join('')
        .toUpperCase()
    }
  },
  getAuthEmail(state) {
    return state.authEmail
  },
  async getToken(state) {
    try {
      const idToken = await state.token
      return idToken
    } catch {
      return null
    }
  },
}

export default {
  // strict: false,
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
