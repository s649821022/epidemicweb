<template>
  <div class="login-container">
    <div class="login">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="90px"
        class="login-Form"
      >
        <span class="title">
          <h3>疫情管理平台</h3>
        </span>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-unlock"
            type="password"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.checkPassword">记住密码</el-checkbox>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        checkPassword: false,
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 16, message: "长度在1-16个字符之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16个字符之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: "/dashboard" });
              this.$message.success("登录成功");
            })
            .catch(() => {
              this.$message.error("账号或密码错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #2d3a4b;
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .login-Form {
    width: 400px;
    height: 350px;
    border-radius: 6px;
    background-color: #fff;
    .title {
      display: inline-block;
      width: 100%;
      margin: 20px auto 30px auto;
      text-align: center;
      color: #696565;
    }
    .el-form-item {
      margin-left: -70px;
      .el-input {
        width: 95%;
      }
    }
    .el-button {
      width: 90%;
      margin-top: 25px;
      margin-left: 22px;
    }
    .el-checkbox {
      margin-left: 20px;
      display: inline-block;
      line-height: 19px;
    }
  }
}
</style>
