import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "LOGIN",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue")
  },
  {
    path: "/404",
    name: "ERROR",
    component: () =>
      import(/* webpackChunkName: "err" */ "@/views/404/index.vue")
  },
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/main",
    name: "MAIN",
    component: () =>
      import(/* webpackChunkName: "err" */ "@/views/main/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
