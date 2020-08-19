export default {
  state: {
    modalShow: true,
    settingShow: true,
  },
  mutations: {
    viewModal (state, payload){
      state.modalShow = payload
    },
    settingShow (state, payload){
      state.settingShow = payload
    }
  },
  actions: {
    viewModal ( { commit }, payload) {
      try{
        commit('viewModal', payload);
      } catch (error){
          commit('setError', error.message)
          throw error
      }
    },
    settingShow ( { commit }, payload) {
      try{
        commit('settingShow', payload);
      } catch (error){
          commit('setError', error.message)
          throw error
      }
    },
    start({ commit }){
      commit('start');
    }
  },
  getters: {
    Show(state){
      return state.modalShow
    },
    settingModalShow(state){
      return state.settingShow
    }
  }
}