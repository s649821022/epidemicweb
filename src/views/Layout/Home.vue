<template>
  <el-container>
    <el-aside width="auto">
      <sidebar></sidebar>
    </el-aside>
    <el-container class="r-container">
      <el-header>
        <vHead></vHead>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "./Sidebar";
import vHead from "./Header";
import { getUser } from "../../utils/auth";

export default {
  name: "Home",
  components: {
    Sidebar,
    vHead,
  },
  created() {
    let username = getUser();
    if (!username) {
      return this.$router.push("/login");
    }
    // this.$http.get("/api/v1/auth/userinfo/").then((res) => {
    //   this.setRole(res.level);
    // });
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
}
.el-header {
  padding: 0;
}
.r-container {
  height: 100vh;
}
</style>
