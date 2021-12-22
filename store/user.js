// export const state = () => ({
//   me: {},
//   errors: [],
//   infoMessages: [],
// })

// // export const state = { ...initialState };

// export const actions = {
//   fetchUser({ commit }, sub) {
//     return this.$axios
//       .get('api/v1/users/' + sub)
//       .then(function (response) {
//         if (response !== undefined && response.status === 200) {
//           return response.data.data
//         }
//       })
//       .catch(function (error) {
//         return error.response
//       })
//   },
//   update({ commit }, userData) {
//     return this.$axios
//       .patch('api/v1/users', userData)
//       .then(function (response) {
//         if (response !== undefined && response.status === 200) {
//           return response.data
//         }
//       })
//       .catch(function (error) {
//         return error.response
//       })
//   },
//   updatePassword({ commit }, passwordDetails) {
//     console.log('passwordDetails', passwordDetails)

//     return this.$axios
//       .post('api/v1/users/passwords', passwordDetails)
//       .then(function (response) {
//         if (response !== undefined && response.status === 200) {
//           return response.data
//         }
//       })
//       .catch(function (error) {
//         return error.response
//       })
//   },
//   async register({ commit }, profile) {
//     console.log('profile', profile)
//     commit('clearInfoMessages')
//     try {
//       const resp = await this.$axios.post('api/v1/users', profile)
//       console.log('Create Request Response', resp)

//       switch (resp.status) {
//         case 201:
//           commit('setInfoMessages', {
//             msg: 'An email has been sent to the email address provided. Please follow the instructions.',
//           })
//           return true
//         default:
//           return false
//       }
//     } catch (error) {
//       console.error('Exception Caught', error.response)
//       commit('clearErrors')
//       const errors = error.response.data.errors
//       if (errors != null && errors.length > 0) {
//         commit('setErrors', error.response.data.errors)
//       }
//       return false
//     }
//   },
//   clearErrors({ commit }) {
//     commit('clearErrors')
//   },
// }

// export const mutations = {
//   setMe(store, data) {
//     store.me = data
//   },
//   clearErrors(store) {
//     store.errors = []
//   },
//   clearInfoMessages(store) {
//     store.infoMessages = []
//   },
//   setErrors(store, errors) {
//     store.errors = errors
//   },
//   setInfoMessages(store, message) {
//     store.infoMessages.push(message)
//   },
// }

// export const getters = {
//   getMe(state) {
//     return state.me
//   },
//   getErrors(state) {
//     return state.errors
//   },
//   getInfoMessages(state) {
//     return state.infoMessages
//   },
// }

// export default {
//   // strict: false,
//   namespaced: true,
//   state,
//   actions,
//   mutations,
//   getters,
// }
