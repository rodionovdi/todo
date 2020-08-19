<template >
  <div class="context-menu" :class="{active: val}" v-click-outside="close">
    <div class="context-menu__items">
      <div class="context-menu__item" @click.stop="editTask">Edit</div>
      <div class="context-menu__item"  @click="removeTask">Remove</div>
    </div>
    
  </div>
</template>

<script>

export default {
  props: ['id'],
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
      val: false,
    };
  },
  computed: { 
  },
  methods: {
    open(){
      this.val = !this.val
    },
    close(){
      this.val = false
    },
    removeTask(){
      this.$store.dispatch('removeTask',this.id)
      this.close()
    },
    editTask() {
      this.$emit('editChange',this.id)
      this.close()
    }
}
}
</script>

<style lang="scss" scoped>

.context-menu {
  display: none;
  position: absolute;
  top: -20px;
  left: 2rem;
  z-index: 10;
  margin: 0px auto;
  color: #fff;
  background-color: rgb(97, 97, 97);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.context-menu__item{
  cursor: pointer;
  padding: 5px 10px;
  &:hover{
    background-color: rgb(136, 136, 136);
  }
}
.active{
  display: flex;
}
</style>