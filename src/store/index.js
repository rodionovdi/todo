import Vue from "vue";
import Vuex from "vuex";
import Tasks from "./tasks"
import Modal from "./modal"
import Menu from "./menu"
import Folder from "./folder"
import User from "./user"
import Common from "./common"


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Tasks,
    Modal,
    Menu,
    Folder,
    User,
    Common
  }
});
