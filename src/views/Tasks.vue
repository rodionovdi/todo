<template>
  <div class="main">
    <div class="task"><Task></Task></div>
  </div>
</template>

<script>
import Task from "../components/Task.vue";
export default {
  components: {
    Task,
  }
};
</script>

<style lang="scss">
.task:first-child{
  margin-top: 0.5rem;
  @include md{
    margin-top: 5rem;
  }
}
</style>
