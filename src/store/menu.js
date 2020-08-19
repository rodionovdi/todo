export default {
  state: {
    menuShow: true,
  },
  mutations: {
    viewMenu (state, payload){
      state.menuShow = payload
    }
  },
  actions: {
    viewMenu ( { commit }, payload) {
      try{
        commit('viewMenu', payload);
      } catch (error){
          commit('setError', error.message)
          throw error
      }
    }
  },
  getters: {
    menuShow(state){
      return state.menuShow
    }
  }
}