<template>
  <div>
    <el-menu
      :default-active="this.$router.currentRoute.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :background-color="themeColor"
      text-color="#BFCBD9"
      active-text-color="#20a0ff"
      router
    >
      <logo :collapse="isCollapse" />
      <el-menu-item index="/dashboard">
        <svg-icon icon-class="index" />
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="user" v-if="this.role === true">
        <svg-icon icon-class="user" />
        <span slot="title">系统用户</span>
      </el-menu-item>
      <el-menu-item index="notice" v-if="this.role === true">
        <svg-icon icon-class="notice" />
        <span slot="title">通知信息</span>
      </el-menu-item>
      <el-menu-item index="inspection">
        <svg-icon icon-class="inspection" />
        <span slot="title">检查记录</span>
      </el-menu-item>
      <el-menu-item index="abnormal">
        <svg-icon icon-class="abnormal" />
        <span slot="title">异常记录</span>
      </el-menu-item>
      <el-menu-item index="vaccinate">
        <svg-icon icon-class="vaccinate" />
        <span slot="title">接种记录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Logo from "./Logo";
import { getInfo } from "../../api/user";

export default {
  name: "Sidebar",
  data() {
    return {
      themeColor: "#304156",
      role: "",
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  components: {
    Logo,
  },
  async beforeCreate() {
    await getInfo().then((res) => {
      this.role = res.is_superuser;
    });
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  .title {
    color: #ffffff;
    font-size: 14px;
    border: 1px solid #ffffff;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, Arial, sans-serif;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
