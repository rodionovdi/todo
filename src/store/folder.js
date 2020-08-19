import firebase from "firebase/app";
import Folder from "./folder_help"

export default {
  state: {
    id: 1,
    currentFolder: ['id','Impotance'],
    folder: []
  },
  mutations: {
    newFolder(state, payload){
      state.folder.push(payload)
    },
    getNameFolder(state, payload){
      state.currentFolder = payload
    },
    loadFolder (state, payload) {
      state.folder = payload
    },
    removeFolder ( state, id){
      const index = state.folder.findIndex(n => n.id === id);
      state.folder.splice(index, 1)
    },
    changeFolder (state, { id, title }) {
      const folder = state.folder.find(t => {
        return t.id === id
      })
      folder.title = title
    }
  },
  actions: {
    async loadFolder ( { commit } ) {
      const folder = await firebase.database().ref('folders').once('value')
      const folders = folder.val()
      const foldersArray = []
      Object.keys(folders).forEach(key => {
        const f = folders[key]
        foldersArray.push(
          new Folder(
            f.title,
            f.post,
            f.task,
            f.user,
            key
          )
        )
      })
      commit('loadFolder', foldersArray)
    },
    async newFolder ( { commit }, payload) {
      try{
        const newFolder = new Folder(
          payload.title,
          payload.post = null,
          payload.task = null,
          payload.user,
        )
        const folder = await firebase.database().ref('folders').push(newFolder)
        commit('newFolder', {...newFolder, id: folder.key})
        console.log(folder.key)
      } catch (error){
        commit('setError', error.message)
        throw error
      }
    },
    getNameFolder ({ commit }, payload) {
      commit('getNameFolder', payload)
    },
    async removeFolder ( { commit }, id){
      try {
        await firebase.database().ref('folders').child(id).remove()    
        commit('removeFolder', id)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async changeFolder( { commit }, {id, title}){
      try {
        // done logic
        console.log(id,title)
        await firebase.database().ref('folders').child(id).update({
          title
        })
        commit('changeFolder', { id, title })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
  },
  getters: {
    folderShow (state) {
      return state.folder
    },
    currentFolderShow (state) {
      return state.currentFolder
    },
  }
}