<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="height: 45px">
        <el-button type="primary" @click="addUser()">添加用户</el-button>
        <div class="search-input">
          <el-form :inline="true" :model="qryForm">
            <el-form-item>
              <el-input
                v-model="qryForm.name"
                placeholder="输入用户名"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="getPageLikeInfo()"
              ></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <el-table :data="users" highlight-current-row border>
          <el-table-column align="center" type="index"></el-table-column>
          <el-table-column
            align="center"
            prop="username"
            label="用户名"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="email"
            label="邮箱"
          ></el-table-column>
          <el-table-column align="center" label="最后登录时间">
            <template slot-scope="scope">
              <span>{{ scope.row.last_login | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_superuser === false">普通用户</el-tag>
              <el-tag v-if="scope.row.is_superuser === true" type="success"
                >管理员</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作处理">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="editUser(scope.row)"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="delUser(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getUserList"
          />
        </div>
      </div>
    </el-card>
    <el-dialog title="用户" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        :model="form"
        ref="form"
        label-width="70px"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" v-if="this.isAdd === true">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="this.isAdd === true">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="this.isAdd === true">
          <el-input v-model="form.re_password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  addUser,
  editUser,
  deleteUser,
  getUser,
} from "@/api/user";
import pagination from "@/components/Pagination/index";
export default {
  name: "index",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateRePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入重复密码"));
      } else {
        callback();
      }
    };
    return {
      qryForm: {
        name: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur", required: true }],
        username: [
          { validator: validateUsername, trigger: "blur", required: true },
        ],
        password: [
          { validator: validatePassword, trigger: "blur", required: true },
        ],
        re_password: [
          { validator: validateRePassword, trigger: "blur", required: true },
        ],
      },
      form: {
        email: "",
        username: "",
        password: "",
        re_password: "",
      },
      dialogFormVisible: false,
      isAdd: true,
      users: [],
      total: 0, // 总数
      listQuery: {
        page: 1, // 当前页面
        limit: 10, // 一页展示几条
      },
    };
  },
  components: {
    pagination,
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async getPageLikeInfo() {
      getUser({ username: this.qryForm.name }).then((res) => {
        this.users = res.results;
      });
    },
    async delUser(row) {
      this.$messageBox.confirm({
        message: "你确定要删除该用户吗？",
        confirmCallback: async () => {
          // 删除对应的学生信息
          await deleteUser(row.id)
            .then((res) => {
              this.$message.success("删除成功");
              // 获取最新的信息
              this.getUserList();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    // 初始化用户
    initUserForm() {
      this.form = {
        email: "",
        username: "",
        password: "",
        re_password: "",
      };
    },
    addUser() {
      this.initUserForm();
      this.dialogFormVisible = true;
    },
    editUser(user) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.form = {
        email: user.email,
        username: user.username,
        password: user.password,
        re_password: user.re_password,
        id: user.id,
      };
    },
    async getUserList() {
      await getUserList(this.listQuery.page, this.listQuery.limit).then(
        (res) => {
          this.total = res.count;
          this.users = res.results;
        }
      );
    },

    onSubmitAddUser() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 新增用户
        if (this.isAdd) {
          await addUser(this.form).then((res) => {
            if (res) {
              this.users.push(res);
              this.dialogFormVisible = false;
              this.initUserForm();
              this.$message.success("用户创建成功");
            }
          });
        } else {
          await editUser(this.form.id, this.form).then(async (res) => {
            if (res) {
              getUserList()
                .then((res) => {
                  this.users = res.results;
                  this.isAdd = true;
                })
                .catch((err) => {
                  console.log(err);
                  this.$message.error("更新用户信息失败");
                });
              this.dialogFormVisible = false;
              this.initUserForm();
              this.$message.success("用户信息修改成功！");
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  width: 240px;
  margin: -10px 0 0 1270px;
}
</style>
