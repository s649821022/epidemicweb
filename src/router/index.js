import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    meta: { title: "疫情管理系统" },
    component: () => import("@/views/Index.vue"),
  },
  // 后台管理布局页
  {
    path: "/dashboard",
    component: () => import("@/views/Layout/Home"),
    children: [
      {
        path: "",
        meta: { title: "首页详情" },
        name: "Dashboard",
        component: () => import("@/views/Dashboard"),
      },
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/User"),
        meta: { title: "系统用户" },
      },
      {
        path: "/notice",
        name: "Notice",
        component: () => import("@/views/Notice"),
        meta: { title: "通知信息" },
      },
      {
        path: "/inspection",
        name: "Inspection",
        component: () => import("@/views/Inspection"),
        meta: { title: "检查记录" },
      },
      {
        path: "/abnormal",
        name: "Abnormal",
        component: () => import("@/views/Abnormal"),
        meta: { title: "异常记录" },
      },
      {
        path: "/vaccinate",
        name: "Vaccinate",
        component: () => import("@/views/Vaccinate"),
        meta: { title: "接种记录" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录页面" },
    component: () => import("@/views/Login"),
  },
  {
    path: "*",
    component: () => import("@/views/Error404"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
