<template>
  <div></div>
</template>

<script>
import { getPassword, getUser, setToken } from "../utils/auth";
export default {
  name: "Index",
  async created() {
    //从浏览器的缓存中，获取登录名和密码
    let user = getUser();
    let password = getPassword();
    // 如果登录名或者密码，有一个没有值
    if (!user || !password) {
      // 跳转到登录页
      this.$router.push("/login");
    } else {
      let { access } = await this.$http.post("/api/v1/auth/login/", {
        username: user,
        password: password,
      });
      // 判断是否登录成功
      if (access) {
        // 保存token
        setToken(access);
        // 跳转到后台管理页面
        this.$router.push("/dashboard");
      } else {
        // 跳转到登录页
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style scoped></style>
