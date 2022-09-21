<template>
  <div class="nav" :style="{ backgroundColor: themeColor }">
    <div class="icon" @click="changeIsCollapse">
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
    <!-- 全屏显示 -->
    <div class="btn-fullscreen" @click="handleFullScreen">
      <el-tooltip
        effect="dark"
        :content="fullscreen ? `取消全屏` : `全屏`"
        placement="bottom"
      >
        <i class="el-icon-rank" />
      </el-tooltip>
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :background-color="themeColor"
      text-color="#BFCBD9"
      active-text-color="#20a0ff"
      router
    >
      <el-submenu index="1" style="padding-right: -100px">
        <template slot="title"
          ><i class="el-icon-user-solid"></i>{{ user }}</template
        >
        <el-menu-item @click="changePassword">修改密码</el-menu-item>
        <el-menu-item @click="logout">退出系统</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dialog
      title="修改密码"
      width="600px"
      :append-to-body="true"
      :visible.sync="showUpdPwdFlag"
    >
      <el-form label-width="80px" ref="userPwd" :model="userPwd">
        <el-form-item label="原始密码" prop="oldPwd">
          <el-input
            type="password"
            v-model="userPwd.current_password"
            placeholder="请输入原始密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="newPwd">
          <el-input
            type="password"
            v-model="userPwd.new_password"
            placeholder="请输入修改密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePwd">
          <el-input
            type="password"
            v-model="userPwd.re_new_password"
            placeholder="请再次确认密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdPwdFlag = false">取 消</el-button>
        <el-button type="primary" @click="updPwd('userPwd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入vuex的映射函数
import { mapState } from "vuex";
import { change_password } from "../../api/user";

export default {
  name: "vHead",
  data() {
    var checkOldPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("修改密码必须输入"));
      }
      callback();
    };
    var checkNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("修改密码必须输入"));
      }
      callback();
    };
    var checkRePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码必须输入"));
      }
      if (value !== this.userPwd.newPwd) {
        callback(new Error("两次输入密码不一致"));
      }
      callback();
    };
    return {
      themeColor: "#304156",
      showUpdPwdFlag: false,
      fullscreen: false,
      userPwd: {
        current_password: "",
        new_password: "",
        re_new_password: "",
      },
      userPwdFormRules: {
        oldPwd: [
          {
            validator: checkOldPwd,
            trigger: "blur",
          },
        ],
        newPwd: [
          {
            validator: checkNewPwd,
            trigger: "blur",
          },
        ],
        rePwd: [
          {
            validator: checkRePwd,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 全屏事件
    handleFullScreen() {
      const element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    initUserPwd() {
      this.userPwd = {
        oldPwd: "",
        newPwd: "",
        rePwd: "",
      };
    },
    updPwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          change_password(this.userPwd).then((res) => {
            this.$message.success("修改密码成功");
            this.showUpdPwdFlag = false;
            this.initUserPwd();
            this.$store.dispatch("user/logout");
            this.$router.push("/login");
          });
        } else {
          return false;
        }
      });
    },
    changeIsCollapse() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
    mine() {
      console.log("222");
    },
    changePassword() {
      this.initUserPwd();
      this.showUpdPwdFlag = true;
    },
  },
  computed: {
    ...mapState("theme", ["theme"]),
    ...mapState("user", ["user"]),
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  //background-color: #101f30;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    padding-left: 5px;
    i {
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .btn-fullscreen {
    color: white;
    transform: rotate(45deg);
    margin-right: -1200px;
    font-size: 24px;
  }
  .el-menu-demo {
    min-width: 65px;
  }
}
</style>
