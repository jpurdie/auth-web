export default function ({ store, redirect }) {
  if (store.state.authUser === null || store.state.authUser === '') {
    return redirect('/')
  }
}
