import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  getPassword,
  setPassword,
  removePassword,
  getSuperUser,
  setSuperUser,
  removeSuperUser
} from "@/utils/auth";
import { login, logout } from "@/api/user";
export default {
  namespaced: true, // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state: {
    token: getToken(),
    user: getUser(),
    password: getPassword(),
    superUser: getSuperUser(),
  },
  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
    password: (state) => state.password,
    superUser: (state) => state.superUser,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_PASSWORD: (state, password) => {
      state.password = password;
    },
    SET_SUPERUSER: (state, superUser) => {
      state.superUser = superUser;
    },
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      const { username, password, checkPassword } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            commit("SET_TOKEN", response.access);
            setToken(response.access);
            commit("SET_USER", response.user);
            setUser(response.user);
            commit("SET_SUPERUSER", response.is_superuser);
            setSuperUser(response.is_superuser);
            if (checkPassword) {
              setPassword(password);
              commit("SET_PASSWORD", password);
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 用户退出登录
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            // 如果存储的变量很多，可以使用clear方法全部删除
            // localStorage.clear();
            // sessionStorage.clear();
            commit("SET_TOKEN", "");
            commit("SET_USER", "");
            commit("SET_PASSWORD", "");
            commit("SET_SUPERUSER", "");
            removeToken();
            removeUser();
            removePassword();
            removeSuperUser();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 删除token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_USER", "");
        commit("SET_PASSWORD", "");
        commit("SET_SUPERUSER", "");
        removeToken();
        removeUser();
        removePassword();
        removeSuperUser();
        this.$router.push({ path: "/login" });
        resolve();
      });
    },
  },
};
