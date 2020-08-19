import firebase from "firebase/app";
import User from "./user_help"

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload){
      state.user = payload
    }
  },
  actions: {
    async registerUser ( {commit }, { email,password } ){
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ( {commit }, { email,password } ){
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        console.log(user.user.uid)
      } catch (error) {~
        commit('setError', error.message)
        throw error
      }
    },
    // async editTask ({ commit }, { id, title, description }) {
    //   try {
    //   } catch (error) {
    //     throw error
    //   }
    // },
    loggedUser ({ commit }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state){
      return state.user
    },
    checkUser (state){
      return state.user !== null
    }
  }
}