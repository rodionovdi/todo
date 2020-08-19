<template>
  <transition name="modal" >
    <div class="modal-mask" >
      <div class="modal-wrapper" >
        <div class="modal-container" v-click-outside.stop="newFolder">
          <div class="modal-header">
            <slot name="header">
              Add Folder
            </slot>
          </div>
          <div class="modal-body">
            <div class="input_wrapper">
              <label for="name-task">Name</label>
              <input type="text" id="name-task" v-model="folderTitle" placeholder="Folder Name">
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="newFolder">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
  data() {
    return {
      folderTitle: '',
    };
  },
  computed: {
    userId () {
      return this.$store.getters.user.id
    }
  },
  methods: {
    newFolder() {
      if (this.folderTitle === '') {
        this.$emit('close')
        return
      }
      if (this.userId != null) {
        const folder = ({
          title: this.folderTitle,
          post: null,
          task: null,
          user: this.userId
        })
        this.$store.dispatch("newFolder", folder);
        this.$store.dispatch('loadFolder')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  display: flex;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  text-align: left;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  
}

.input_wrapper{
  background-color: rgb(233, 233, 233);
  padding: 10px;
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
</style>