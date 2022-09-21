import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, { size: "small" });
