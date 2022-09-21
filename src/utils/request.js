import axios from "axios";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import qs from "qs";
import router from "@/router";

class Http {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 10000,
    });
    // 请求之前的拦截器，用来设置jwt token
    this.service.interceptors.request.use(
      (config) => {
        NProgress.start();
        if (store.state.user.token) {
          config.headers["Authorization"] = "jwt " + getToken();
        }
        return config;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      }
    );

    // 响应之后的拦截器
    this.service.interceptors.response.use(
      (response) => {
        const res = response.data;
        NProgress.done();
        return res;
      },
      (error) => {
        NProgress.done();
        try {
          if (error.response.status === 403) {
            Message.error({
              message: error.response.data.message,
              duration: 5000,
            });
            router.push({ path: "/login" });
          }

          if (error.response.status === 500) {
            Message.error({
              message: "服务器内部异常, 请检查",
              duration: 5000,
            });
          }
        } catch (e) {
          Message.error({
            message: "服务器连接超时，请重试",
            duration: 5 * 1000,
          });
        }
        return Promise.reject(error);
      }
    );
  }

  // get请求方式
  get(url, params) {
    return this.service({
      method: "get",
      url,
      params,
      timeout: 5000,
    });
  }

  // 提交post请求，发送的数据为查询字符串，key=val&key=val
  post_urlencoded(url, data) {
    return this.service({
      method: "post",
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
  }

  // 提交post请求，查询字符串，对象中嵌套数组的格式
  post_obj_array(url, data) {
    return this.service({
      method: "post",
      url,
      data: qs.stringify(data, { allowDots: true }),
      timeout: 5000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
  }

  /*
   * 提交post请求，发送的数据为查询字符串，当参数为数组的时候适用该方法
   * {ids:[1,2]}
   * ids=1&ids=2
   */
  post_array(url, data) {
    return this.service({
      method: "post",
      url,
      data: qs.stringify(data, { arrayFormat: "repeat" }),
      timeout: 5000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
  }

  // 提交post请求，发送的数据为json字符串
  post(url, data) {
    return this.service({
      method: "post",
      url,
      data,
      timeout: 5000,
    });
  }

  // 提交patch请求
  patch(url, data) {
    return this.service({
      method: "patch",
      url,
      data,
      timeout: 5000,
    });
  }

  // 提交delete请求
  delete(url, data) {
    return this.service({
      method: "delete",
      url,
      data,
      timeout: 5000,
    });
  }
}

export default new Http();
