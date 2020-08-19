import firebase from "firebase/app";
import Task from "./task_help"

export default {
  state: {
    showCompletedValue: true,
    sort: false,
    tasks: [{folder: "Planned", name: "ok", completed: false, favorites: false, user: null},{folder: "Impotance", name: "doit", completed: false, favorites: false, user: null},{folder: "Planned", name: "2e", completed: true, favorites: true, user: null}]
  },
  mutations: {
    sortTasks ( state, payload) {
      state.sort = payload
    },
    showCompleted( state, payload) {
      state.showCompletedValue = payload
    },
    newTask (state, payload) {
      state.tasks.push(payload)
    },
    deleteTask (state, payload) {
      const index = state.tasks.findIndex(n => n.name === payload);
      console.log(index)
      state.tasks.splice(index, 1)
    },
    removeTask (state, id){
      const index = state.tasks.findIndex(n => n.id === id);
      state.tasks.splice(index, 1)
    },
    loadTask (state, payload) {
      state.tasks = payload
    },
    complTask (state, { id, completed }) {
      const task = state.tasks.find(t => {
        return t.id === id
      })
      task.completed = completed
    },
    favorTask (state, { id, favorites }) {
      const task = state.tasks.find(t => {
        return t.id === id
      })
      task.favorites = favorites
    },
    changeTask (state, { id, name }) {
      const task = state.tasks.find(t => {
        return t.id === id
      })
      task.name = name
    },
  },
  actions: {
    sortTasks ( { commit }, payload) {
      commit('sortTasks', payload)
    },
    showCompleted ( { commit }, payload) {
      commit('showCompleted', payload)
    },
    async loadTask ( { commit } ) {
      const task = await firebase.database().ref('tasks').once('value')
      const tasks = task.val()
      const tasksArray = []
      Object.keys(tasks).forEach(key => {
        const f = tasks[key] 
        tasksArray.push(
          new Task(
            f.folder,
            f.name,
            f.completed,
            f.favorites,
            f.user,
            key
          )
        )
      })
      commit('loadTask', tasksArray)
    },
    async newTask ( { commit }, payload) {
      try{
        const newTask = new Task(
          payload.folder,
          payload.name,
          payload.completed,
          payload.favorites,
          payload.user,
        )
        const task = await firebase.database().ref('tasks').push(newTask)
        commit('newTask', {...newTask, id: task.key})
      } catch (error){
          commit('setError', error.message)
          throw error
      }
    },
    async complTask ( { commit }, {id, completed}){
      try {
        // done logic
        await firebase.database().ref('tasks').child(id).update({
          completed
        })
        commit('complTask', { id, completed })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async removeTask ( { commit }, id){
      try {
        await firebase.database().ref('tasks').child(id).remove()
        commit('removeTask', id)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async removeFolderTask ( { commit }, {folder, user}){
      try {
        // let q = firebase.database().ref('tasks').child('user').equalTo(user).remove()
        await firebase.database().ref('tasks').orderByChild('user').equalTo(user).once('value',
          function(snapshot) {
            // iterate through each match
            snapshot.forEach(function(childSnapshot) {
                // childData will be the actual contents of the child
                var childData = childSnapshot.val()
                if (childData.folder == folder) {
                  childSnapshot.ref.remove()
                  commit('removeTask', childSnapshot.ref.key)
                }
            })
          }
        )
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async favorTask ( { commit }, {id, favorites}){
      try {
        // done logic
        await firebase.database().ref('tasks').child(id).update({
          favorites
        })
        commit('favorTask', { id, favorites })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async changeTask ( { commit }, {id, name}){
      try {
        // done logic
        console.log(id,name)
        await firebase.database().ref('tasks').child(id).update({
          name
        })
        commit('changeTask', { id, name })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    deleteTask( { commit }, payload) {
      commit('deleteTask', payload)
    }
  },
  getters: {
    tasksShow (state) {
      return state.tasks
    },
    sortShow (state){
      return state.sort
    },
    showCompleted (state){
      return state.showCompletedValue
    }
  }
}