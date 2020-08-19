<template>
  <div id="app">
    <ModalAddFolder v-if="showModalAddFolder" @close="addFolder"></ModalAddFolder>
    <i
      class="fas fa-bars btn-menu"
      :class="{ noActive: menuShow }"
      @click="viewMenu"
    ></i>
    <Menu @showModalAddFolder='onShowModalAddFolder'></Menu>
    <section class="main-wrapper">
      <div class="header">
        <div class="sort" @click="sortTasks"><i class="fas" :class="{'fa-angle-up': !sortTasksValue, 'fa-angle-down': sortTasksValue}"></i></div>
        <div class="folderTitle"  @click.stop="dropdown = false"><div class="folderTitle" v-if="!editFolder">{{currentFolderShow.title}}</div>
        <input v-model="titleFolder" :placeholder="`${currentFolderShow.title}`" v-if="editFolder" @keyup.enter="changeFolder"><i class="fas fa-caret-down"></i>
          <div class="triangle"  :class="{'dropdown-show':dropdown}"></div>
          <div class="dropdown-content" v-click-outside="dropdownFalse" :class="{'dropdown-show':dropdown}">
            <div class="dropdown-content__btn show" @click="showCompleted">Show Completed <i class="fas fa-2x" :class="{'fa-toggle-on': showCompletedValue, 'fa-toggle-off': !showCompletedValue,}"></i></div>
            <hr class="lineNav" />
            <div class="dropdown-content__btn rename" @click.stop="editFolder = !editFolder">Rename</div>
            <hr class="lineNav" />
            <div class="dropdown-content__btn delete" @click.stop="dropdownFalse(),removeFolder()">Delete</div>
          </div>
        </div>
        <div class="addTask" @click.stop="viewModal">
          <i class="fas fa-plus"></i>
        </div>
      </div>
      <Modal v-if="!show"></Modal>
      <Setting v-if="!settingShow"></Setting>
      <div class="mainTask"></div>
      <router-view />
    </section>
  </div>
</template>

<script>
import Modal from "./components/Modal";
import Setting from "./components/Setting";
import Menu from "./components/Menu";
import ModalAddFolder from "./components/ModalAddFolder";

export default {
  directives:{
    'click-outside': {
      bind: function(el, binding, vnode) {  
          el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his childrens
            if (!(el == event.target || el.contains(event.target))) {
              // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function(el) {  
          document.body.removeEventListener('click', el.clickOutsideEvent)
        }
    }
  },
  data() {
    return {
      width: 0,
      showModalAddFolder: false,
      dropdown: true,
      sortTasksValue: false,
      showCompletedValue: true,
      editFolder: false,
      titleFolder: ''
    }
  },
  components: {
    Modal,
    Menu,
    ModalAddFolder,
    Setting
  },
  computed: {
    userId() {
      return this.$store.getters.user !== null
        ? this.$store.getters.user.id
        : 1;
    },
    checkUser () {
      return this.$store.getters.checkUser
    },
    show() {
      return this.$store.getters.Show;
    },
    menuShow() {
      return this.$store.getters.menuShow;
    },
    currentFolderShow() {
      return this.$store.getters.currentFolderShow
    },
    settingShow() {
      return this.$store.getters.settingModalShow;
    }
  },
  methods: {
    sortTasks () {
      this.sortTasksValue = !this.sortTasksValue
      this.$store.dispatch('sortTasks', this.sortTasksValue)
    },
    showCompleted () {
      this.showCompletedValue = !this.showCompletedValue
      this.$store.dispatch('showCompleted',  this.showCompletedValue)
    },
    dropdownFalse() {
      this.dropdown = true
    },
    onShowModalAddFolder (data) {
      this.showModalAddFolder = data
    },
    updateWidth() {
      this.width = window.innerWidth;
      if (this.width < 768) {
        this.$store.dispatch("viewMenu", false);
      }
      else {
        this.$store.dispatch("viewMenu", true);
      }
    },
    viewModal() {
      this.$store.dispatch("viewModal", !this.show);
    },
    viewMenu() {
      this.$store.dispatch("viewMenu", !this.menuShow);
    },
    addFolder() {
      this.showModalAddFolder = false;
    },
    removeFolder () {
      this.dropdown = true
      let folder = this.currentFolderShow.title
      let user = this.userId
      let id = this.currentFolderShow.id
      //удаление папки
      this.$store.dispatch('removeFolderTask', {folder,user})
      this.$store.dispatch("removeFolder", id)
      this.$store.dispatch('getNameFolder', {id,title: 'Impotance'} )
    },
    changeFolder () {
      this.editFolder = !this.editFolder
      let id = this.currentFolderShow.id
      let title = this.titleFolder
      this.$store.dispatch("changeFolder", {id,title} )
      this.dropdownFalse()
      this.$store.dispatch('getNameFolder', {id,title: 'Impotance'} )
    },
  },
  created() {
    this.width = window.innerWidth;
    window.addEventListener('resize', this.updateWidth);
    if (this.width < 768) {
        this.$store.dispatch("viewMenu", false);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: row;
}
.btn {
  border: none;
  &:hover {
    cursor: pointer;
    outline: 2px solid $gr;
    outline-offset: -3px;
  }
}
.btn-menu {
  margin-top: 20px;
  margin-left: 10px;
  padding: 0;
  height: 1rem;
  width: 1rem;
}
.fas {
  width: 1rem;
  padding-right: 5px;
  padding-left: 5px;
}
.main-wrapper {
  min-width: 250px;
  display: flex;
  width: 93vw;
  flex-direction: column;
  align-items: center;
  .addTask,
  .folderTitle,
  .sort {
    cursor: pointer;
    font-size: 1rem;
    &:hover {
      color: $gr;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    width: 60vw;
    padding-top: 20px;
  }
}
.folderTitle{
  position: relative;
  display: inline-block;
  .dropdown-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    border-radius: 5px;
    padding: 10px 20px 10px 15px;
    background-color: #ffffff;
    min-width: 180px;
    box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.75);
    margin-top: 10px;
    left: -65px;
    z-index: 2;
    }
  .dropdown-show{
    display: none;
  }
}
.noActive {
  display: none;
}
.triangle {   
  width: 0;
  height: 0;
  position: absolute;
  z-index: 3;
  left: 30px;
  border-bottom: 10px solid #ffffff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
   text-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.75);
}
.lineNav {
  border: 1px solid rgba(80, 80, 80, 0.281);
  width: 100%;
}
.dropdown-content__btn{
  cursor: pointer;
  font-size: 0.8rem;
}
.show{
  display: flex;
  justify-content: space-between;
  color: #636363;
  align-items: center;
}
.delete{
  color: $danger;
}
.rename{
  color: $success;
}
.fa-toggle-on{
  color: $success;
}
input{
  width: auto;
}
.folderTitle{
  display: inline-block;
}
.errorInput{
  .error
    {
      display: block;
    }
}
</style>
