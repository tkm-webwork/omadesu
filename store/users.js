import firebase from '../plugins/firebase'

// state
export const state = () => ({
  user: {
    uid: null,
    name: null
  }
})

// mutations
export const mutations = {
  setUser(state, user) {
    state.user.uid = user.uid
    state.user.name = user.displayName
  }
}

// actions
export const actions = {
  login({
    commit
  }) {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
        .then(result => {
          commit('setUser', result.user)
          resolve(true)
        })
        .catch(error => {
          console.error('An error occurred in login(): ', error)
          reject(error)
        })
    })
  }
}
