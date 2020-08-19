import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tasks from "../views/Tasks";
import Login from "../components/Auth/Login";
import Registration from "../components/Auth/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/tasks",
    name: "tasks",
    component: Tasks,
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
