<template>
  <div class="modal-mask" :class="{noActive: show}" >
    <section class="modal-view"  v-click-outside="closeModal" id="Modal">
      <i class="fas fa-times close" @click="viewModal"></i>
      <h2>Create Task <i class="far fa-check-circle"></i></h2>
      <p>Press Enter to Submit</p>
      <div class="input_wrapper">
        <label for="folder">Folder</label>
        <select id="folder" v-model="folder">
          <option>Impotance</option>
          <option>Planned</option>
          <option v-for="fold in getFolder" :key="fold.id">{{fold.title}}</option>
        </select>
      </div>
      <div class="input_wrapper">
        <label for="name-task">Name</label>
        <input type="text" id="name-task" placeholder="Task Name" v-model="name">
      </div>
      <button class="btn" @click="newTask();viewModal()">Add</button>
    </section>
  </div>
</template>

<script>
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
  data(){
    return{
      folder: 'Impotance',
      name: '',
      completed: false,
      favorites: false,
    }
  },
  computed:{
    userId () {
      return this.$store.getters.user !== null?  this.$store.getters.user.id : 1
    },
    show () {
      return this.$store.getters.Show
    },
    getFolder () {
      return this.$store.getters.folderShow.filter(folder => folder.user == this.userId)
    }
  },
  methods: {
     closeModal(){
        this.$store.dispatch('viewModal', true)
    },
    viewModal () {
      this.$store.dispatch('viewModal', !(this.show))
    },
    newTask () {
      if (this.name === ''){
        return
      }
      if (this.userId != null) {
        const Task = ({
          folder: this.folder,
          name: this.name,
          completed: this.completed,
          favorites: this.favorites,
          user: this.userId,
        })
        console.log(Task)
        this.$store.dispatch('newTask', Task)
      }
      // reset 
      this.folder = 'Impotance';
      this.name = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-view {
  .close{
    cursor: pointer;
    &:hover{
      color: $gr;
    }
    text-align: right; 
    margin-right: 10px; 
    margin-top: 10px;
  }
  h2,p{
    text-align: center;
    margin-bottom: 0;
  }
  p{
    background-color: rgb(233, 233, 233);
    font-size: 13px;
    padding: 10px;
    margin-bottom: 20px;
  }
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(255, 255, 255);
  width: 100vw;
  @include md{
    width: 35vw;
  }
  @include xl{
    width: 20vw;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  .input_wrapper{
    background-color: rgb(233, 233, 233);
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    select, input{
      width: 60%;
      margin-left: 1rem;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 5px;
      &:hover, &:focus{
        outline: 1px solid #8EBDF9;
        outline-offset: -2px;
      }
    }
  }
}
.noActive{
  display: none;
}
</style>