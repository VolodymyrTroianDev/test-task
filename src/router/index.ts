import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoginForm from "@/modules/login/LoginForm.vue";
import Main from "@/modules/Main.vue";
import ToDo from "@/modules/todo/ToDo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    components: {
      Header,
      default: Main,
      Footer
    }
  },
  {
    path: "/login",
    name: "login",
    components: {
      Header,
      default: LoginForm,
      Footer
    }
  },
  {
    path: "/to-do",
    name: "ToDo",
    components: {
      Header,
      default: ToDo,
      Footer
    }
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router
