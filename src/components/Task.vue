<template>
  <div class="main"  >
    <button
      class="task"
      v-for="task in tasksShow"
      :title="`${task.name}`"
      :key="task.id"
      :class="{ completed: task.completed }"
      @keyup.46="deleteTask(task.id)"
      :id="`${tasksShow.indexOf(task)}`"
      
    >
      <div class="text ">
        <div>
          <i
            :class="{
              'fa-check-circle': task.completed,
              fas: task.completed,
              far: !task.completed,
              'fa-circle': !task.completed
            }"
             @click.stop="complTask(task.id, task.completed)"
          ></i>
          <input type="text" :value="`${task.name}`" :id="`${task.id}`" @keyup.enter="changeTask(task.id)">
          <div :class="{ completed: task.completed }" class="task-name"  @click.stop="complTask(task.id, task.completed)">{{ task.name }}</div>
        </div>
      </div>
      <div class="right-wrapper">
        <div class="star" @click.stop="favorTask(task.id, task.favorites)">
          <i :class="{ 
            favorites: task.favorites,
            fas: task.favorites,
            far: !task.favorites 
            }" 
            class="fa-star" >
          </i>
        </div>
        <div class="contex-menu__wrapper" >
          <i class="fas fa-ellipsis-v contex-menu" @click.stop="contex"></i>
          <ContexMenu ref="menu" :id="`${task.id}`" @editChange="onEditChange">
          </ContexMenu> 
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import ContexMenu from './ContexMenu'
export default {
  props: ["title", "post"],
  components: {
    ContexMenu
  },
  data() {
    return {
      value: "sad",
      favorites: false,
      completed: "",
      taskId: null,
      contexMenu: false,
      edit: false,
      name: ''
    };
  },
  computed: {
    userId() {
      return this.$store.getters.user !== null
        ? this.$store.getters.user.id
        : 1;
    },
    sortShow() {
      return this.$store.getters.sortShow;
    },
    showCompleted() {
      return this.$store.getters.showCompleted;
    },
    tasksShow() {
      const currentFolder = this.currentFolderShow;
      //не сортировать показывать выполненые
      if (this.sortShow && !this.showCompleted) {
        let arr = this.$store.getters.tasksShow.filter(function(el) {
          return el.folder === currentFolder;
        });
        return arr
          .sort(function(a, b) {
            return b.favorites - a.favorites;
          })
          .filter(el => el.completed == false)
          .filter(el => el.user == this.userId);
      }
      if (!this.sortShow && !this.showCompleted) {
        let arr = this.$store.getters.tasksShow.filter(function(el) {
          return el.folder === currentFolder;
        });
        return arr
          .sort(function(a, b) {
            return a.favorites - b.favorites;
          })
          .filter(el => el.completed == false)
          .filter(el => el.user == this.userId);
      }
      if (this.sortShow) {
        let arr = this.$store.getters.tasksShow.filter(function(el) {
          return el.folder === currentFolder;
        });
        return arr
          .sort(function(a, b) {
            return b.completed - a.completed;
          })
          .filter(el => el.user == this.userId);
      } else {
        let arr = this.$store.getters.tasksShow.filter(function(el) {
          return el.folder === currentFolder;
        });
        return arr
          .sort(function(a, b) {
            return a.completed - b.completed;
          })
          .filter(el => el.user == this.userId);
      }
    },
    currentFolderShow() {
      return this.$store.getters.currentFolderShow.title;
    }
  },
  methods: {
    changeTask (id) {
      if (this.edit){
        let val = document.getElementById(this.edit).value
        this.$store.dispatch("changeTask", {id: id,name: val} )
        document.getElementById(this.edit).classList.remove('show-edit')
        document.getElementById(this.edit).nextElementSibling.style.visibility ='visible'
      }
    },
    onEditChange (event) {
      this.edit = event;
      document.getElementById(event).classList.add('show-edit')
      document.getElementById(event).nextElementSibling.style.visibility ='hidden'
    },
    contex (event) {
      this.$refs.menu[event.path[3].id].open()
    },
    deleteTask (id) {
      this.$store.dispatch("removeTask", id);
    },
    complTask (id, completed) {
      completed = !completed;
      this.taskId = id;
      this.completed = completed;
      this.$store.dispatch("complTask", {
        id: this.taskId,
        completed: this.completed
      });
    },
    favorTask (id, favorites) {
      favorites = !favorites;
      this.taskId = id;
      this.favorites = favorites;
      this.$store.dispatch("favorTask", {
        id: this.taskId,
        favorites: this.favorites
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.task {
  color: #000;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 60vw;
  background-color: rgb(209, 209, 209);
  border: none;
  border-bottom: 1px solid #bbbaba;
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:only-child {
    border-radius: 5px 5px 5px 5px;
  }
  &:hover {
    background: $gr-main;
    .contex-menu{
      display: flex;
    }
  }
}
.completed {
  text-decoration: line-through;
  color: #636363;
}
.fa-check-circle {
  color: $success;
}
.favorites {
  color: #f2bd61;
  -webkit-text-stroke: 1px #000000;
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.contex-menu {
  display: none;
  margin-left: .5rem;
}
.right-wrapper{
  display: flex;
  justify-content: space-between;
}
.star{
  cursor: pointer;
  width: 1rem;
}
.contex-menu__wrapper{
  width: 1rem;
  position: relative;
}
.far,
.fas {
  margin-right: 1rem;
  cursor: pointer;
}
input{
  position: absolute;
  top: -9999px;
  left: -9999px;
  visibility: hidden;
  padding: 0;
    font-size: 1rem;
}
.task-name{
  display: inline-block;
}
.show-edit{
  position: relative;
  top: 0;
  left: 0;
  visibility: visible;
}
</style>
