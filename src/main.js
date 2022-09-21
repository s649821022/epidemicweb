import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "@/utils/request";
import message from "@/utils/message";
import messageBox from "@/utils/messageBox";
import * as filters from "@/utils/filters"; // 全局过滤
import "./plugin";
import "./icons";
Vue.config.productionTip = false;

Vue.prototype.$message = message;
Vue.prototype.$messageBox = messageBox;
Vue.prototype.$http = http;

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.setLocalValue = function (name, value) {
  if (window.localStorage) {
    localStorage.setItem(name, value);
  } else {
    alert("This browser does NOT support localStorage");
  }
};

Vue.prototype.getLocalValue = function (name) {
  const value = localStorage.getItem(name);
  if (value) {
    return value;
  } else {
    return "";
  }
};

new Vue({
  router,
  store,
  // created() {
  //   this.$store.commit("user/SET_SUPERUSER", this.getLocalValue("superUser"));
  // },
  render: (h) => h(App),
}).$mount("#app");
