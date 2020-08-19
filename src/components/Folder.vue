<template>
  <div class="main">
    <router-link :to="`${post}`" class="linkMenu">
        <div class="folder" :id="`${id}`" :title="`${title}`" @click="getNameFolder"><i class="fas fa-calendar-alt"></i> {{ title }} </div>{{tasksShow}}
      </router-link>
  </div>
</template>

<script>
  export default {
    props: ['title', 'post','id'],
    data(){
      return {
        value: 'sad',
      }
    },
    computed: {
      userId () {
        return this.$store.getters.user !== null?  this.$store.getters.user.id : 1
      },
      tasksShow () {
        return this.$store.getters.tasksShow.filter(el => el.user == this.userId).filter(task => task.folder == this.title).length
      }
    },
    methods: {
      getNameFolder(event) {
        let title = event.target.title
        let id = event.target.id
        this.$store.dispatch('getNameFolder', {id,title} )
      }
    }
  }
</script>

<style lang="scss" scoped>
.linkMenu {
  display: flex;
  justify-content: space-between;
  width: 180px;
  padding: 10px;
  border-radius: 5px;
  color: $text;
  text-decoration: none;
  &:last-child {
    margin-bottom: 0;
  }
}
.folder{
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
}
</style>
