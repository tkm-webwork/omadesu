import firebase from '../plugins/firebase'

const db = firebase.firestore()
const cardRef = db.collection('cards')

// state
export const state = () => ({
  cards: []
})

// mutations
export const mutations = {
  addCard(state, cards) {
    state.cards.push(cards)
  },
  clearCard(state) {
    state.cards = []
  },
  updateCardLike(state, payload) {
    state.cards.some(card => {
      if (card.id === payload.card.id) {
        card.like = card.like + 1
        return true
      }
    })
  }
}

// actions
export const actions = {
  fetchCards({
    commit
  }) {
    commit('clearCard')
    return new Promise((resolve, reject) => {
      cardRef.orderBy('created_at', 'desc').get()
        .then(res => {
          res.forEach((doc) => {
            commit('addCard', doc.data())
            resolve(true)
          })
        })
        .catch(error => {
          console.error('An error occurred in fetchCards(): ', error)
          reject(error)
        })
    })
  }
}
