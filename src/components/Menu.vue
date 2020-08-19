<template>
  <section class="left-wrapper" :class="{noActive: !menuShow}">
    <nav id="nav">
      <i class="fas fa-bars btn-menu" @click="viewMenu"></i>
      <i class="fas fa-plus-circle fa-3x fa-pull-center i-center btn-add__folder" id="show-modal" @click.stop="showModalAddFolder"></i>
      <Folder title="Impotance" post="/Tasks"></Folder>
      <Folder title="Planned" post="/Tasks"></Folder>
      <!-- <hr class="lineNav" /> -->
      <Folder v-for="fold in getFolder" :key="fold.id" :title="`${fold.title}`" :id="`${fold.id}`"  post="/Tasks"></Folder>
    </nav>
    <div class="btn-nav" @click.stop="settingShow"><i class="fas fa-cog i-set"></i>Setting</div>
  </section>
</template>

<script>
import Folder from "./Folder.vue";
export default {
  data(){
    return{
    }
  },
  components: {
    Folder
  },
  computed:{
     userId () {
      return this.$store.getters.user !== null?  this.$store.getters.user.id : 1
    },
    getFolder () {
       return this.userId != 1? this.$store.getters.folderShow.filter(folder => folder.user == this.userId) : false
    },
    menuShow () {
      return this.$store.getters.menuShow
    },
    Show() {
      return this.$store.getters.settingModalShow;
    },
  },
  methods: {
    viewMenu () {
      this.$store.dispatch('viewMenu', !(this.menuShow))
    },
    showModalAddFolder () {
      this.$emit('showModalAddFolder', true)
    },
    viewFolder(event) {
      this.$store.dispatch('viewFolder', event.title)
    },
    settingShow() {
      this.$store.dispatch("settingShow", !this.Show);
    },
  }
}
</script>

<style lang="scss" scoped>
.left-wrapper {
  .btn-menu {
    position: absolute;
    cursor: pointer;
    top: 20px;
    left: 15px
  }
  .btn-add__folder{
    cursor: pointer;
    &:hover {
      color: $dark;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $primary;
  width: 250px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: $gr-main;
  box-shadow: -5px 0px 14px 2px rgba(0, 0, 0, 0.75);
  #nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 600px;
  }
  .active {
    background-color: rgba(43, 43, 43, 0.137);
  }
  .i-center {
    color: $text;
    text-align: center;
    margin: 2rem 0;
  }
  .lineNav {
    border: 1px solid rgba(80, 80, 80, 0.281);
    width: 80%;
  }
  .btn-nav {
    display: flex;
    background: transparent;
    border: none;
    color: $text;
    margin-bottom: 1rem;
    cursor: pointer;
    margin-left: 1rem;
  }
}
.noActive{
  display: none;
}
.i-set{
  margin-right: .2rem;
}
</style>