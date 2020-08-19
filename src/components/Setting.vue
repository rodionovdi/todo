<template>
  <div class="modal-mask" :class="{noActive: show}" >
    <section class="modal-view"  v-click-outside="closeModal" id="Modal">
      <i class="fas fa-times close" @click="viewModal"></i>
      <h2>Setting</h2>
      <div class="input_wrapper">
          <div class="dropdown-content__btn show" @click="showCompleted">Show Completed <i class="fas fa-2x" :class="{'fa-toggle-on': showCompletedModal, 'fa-toggle-off': !showCompletedModal,}"></i></div>
          <div>Language</div>
          <div>Select Theme</div>
      </div>
      <button class="btn" v-if="checkUser" @click="logout">Logout</button>
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
      return this.$store.getters.settingModalShow
    },
    showCompletedModal(){
      return this.$store.getters.showCompleted
    },
    checkUser () {
      return this.$store.getters.checkUser
    },
  },
  methods: {
    closeModal(){
      this.$store.dispatch('settingShow', true)
    },
    viewModal () {
      this.$store.dispatch('settingShow', !(this.show))
    },
    showCompleted () {
      let showCompletedModal = !this.showCompletedModal
      this.$store.dispatch('showCompleted', showCompletedModal)
    },
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
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
    display: flex;
    flex-direction: column;
    background-color: rgb(233, 233, 233);
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    div{
      margin-top: 1rem;
      &:first-child{
         margin-top: 0rem;
      }
    }
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
.dropdown-content__btn{
  cursor: pointer;
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
.btn{
  background-color: $soft;
  border: none;
  border-radius: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
}
</style>