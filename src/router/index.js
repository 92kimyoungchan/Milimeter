import Vue from "vue";
import VueRouter from "vue-router";
import Error from "../views/util/Error.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("../views/MainPage.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/Sample",
    component: () => import("@/views/sample/Function.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/about",
    component: () => import("@/views/about/AboutMilimeter.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/join1",
    component: () => import("@/views/join/Join01.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/join2",
    component: () => import("@/views/join/Join02.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/Test",
    component: () => import("@/views/sample/TestPage.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/Test2",
    component: () => import("@/views/sample/TestPage2.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/Test3",
    component: () => import("@/views/sample/TestPage3.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/Test4",
    component: () => import("@/views/sample/TestPage4.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "/error",
    component: Error,
    meta: { unauthorized: true }
  },
  {
    path: "/connection",
    component: () => import("@/views/sample/Connection.vue"),
    meta: { unauthorized: true }
  },
  {
    path: "*",
    redirect: "/error",
    meta: { unauthorized: true }
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active"
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.unauthorized)) {
    console.log("권한 필요없는 경로", to.path);
    sessionStorage.setItem("pathToLoadUnAuth", to.path);
    sessionStorage.setItem("pathFromLoadUnAuth", from.path);
    console.log("권한 필요없는 경로", to.path);
    return next();
  } else {
    console.log("권한 필요한 경로", to.path);
    sessionStorage.setItem("pathToLoadAuth", to.path);
    sessionStorage.setItem("pathFromLoadAuth", from.path);
    console.log("권한 필요한 경로", to.path);
    return next("/login");
  }
});
export default router;
