<template>
  <div>
    <el-card class="box-card">
      <div slot="header">信息查询</div>
      <div>
        <el-form :inline="true" :model="qryForm">
          <el-form-item>
            <el-input
              v-model="qryForm.name"
              placeholder="输入登记人姓名"
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
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <el-button type="primary" @click="addAbnormal()"
          >新增异常记录</el-button
        >
      </div>
      <div>
        <el-table :data="abnormals" border>
          <el-table-column align="center" type="index"></el-table-column>
          <el-table-column align="center" label="登记时间">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="user.username"
            label="记录员"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="detail"
            label="详情描述"
          ></el-table-column>
          <el-table-column align="center" label="操作处理">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="editAbnormal(scope.row)"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="delAbnormal(scope.row)"
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
            @pagination="getAbnormalList"
          />
        </div>
      </div>
    </el-card>
    <el-dialog
      title="添加异常记录"
      width="800px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="90px"
        :model="abnormalForm"
        ref="abnormalForm"
        :rules="rules"
      >
        <el-form-item label="详情描述">
          <el-input
            type="textarea"
            v-model="abnormalForm.detail"
            :rows="6"
            placeholder="请输入详情描述…"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddabnormal()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAbnormal,
  getAbnormalList,
  addAbnormal,
  deleteAbnormal,
  editAbnormal,
} from "@/api/abnormal";
import pagination from "@/components/Pagination/index";
export default {
  name: "index",
  data() {
    var validateLocation = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入地址"));
      } else {
        callback();
      }
    };
    var validateDetail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入详情"));
      } else {
        callback();
      }
    };
    var validateResult = (rule, value, callback) => {
      if (value !== "正常" || value !== "异常") {
        callback(new Error("请选择结果"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        location: [
          { validator: validateLocation, trigger: "blur", required: true },
        ],
        detail: [
          { validator: validateDetail, trigger: "blur", required: true },
        ],
        result: [
          { validator: validateResult, trigger: "blur", required: true },
        ],
      },
      qryForm: {
        name: "",
      },
      isAdd: true,
      abnormals: [],
      dialogFormVisible: false,
      total: 0, // 总数
      listQuery: {
        page: 1, // 当前页面
        limit: 10, // 一页展示几条
      },
      abnormalForm: {
        detail: "",
      },
    };
  },
  mounted() {
    this.getAbnormalList();
  },
  components: {
    pagination,
  },
  methods: {
    async getPageLikeInfo() {
      getAbnormal({ user: this.qryForm.name }).then((res) => {
        this.abnormals = res.results;
      });
    },
    async delAbnormal(row) {
      this.$messageBox.confirm({
        message: "你确定要删除该检查记录吗？",
        confirmCallback: async () => {
          // 删除对应的学生信息
          await deleteAbnormal(row.id)
            .then((res) => {
              this.$message.success("删除成功");
              // 获取最新的信息
              this.getAbnormalList();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    editAbnormal(abnormal) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.abnormalForm = {
        id: abnormal.id,
        detail: abnormal.detail,
      };
    },
    addAbnormal() {
      this.initAbnormalForm();
      this.dialogFormVisible = true;
    },
    initAbnormalForm() {
      this.abnormalForm = {
        detail: "",
      };
    },
    async getAbnormalList() {
      await getAbnormalList(this.listQuery.page, this.listQuery.limit).then(
        (res) => {
          this.total = res.count;
          this.abnormals = res.results;
        }
      );
    },
    onSubmitAddabnormal() {
      this.$refs["abnormalForm"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 新增检查记录
        if (this.isAdd) {
          await addAbnormal(this.abnormalForm).then((res) => {
            if (res) {
              this.abnormals.push(res);
              this.dialogFormVisible = false;
              this.initAbnormalForm();
              this.$message.success("异常记录创建成功");
              this.getAbnormalList();
            }
          });
        } else {
          await editAbnormal(this.abnormalForm.id, this.abnormalForm).then(
            async (res) => {
              if (res) {
                getAbnormalList()
                  .then((res) => {
                    this.abnormals = res.results;
                    this.isAdd = true;
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$message.error("更新异常记录信息失败");
                  });
                this.dialogFormVisible = false;
                this.initAbnormalForm();
                this.$message.success("异常记录信息修改成功！");
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px 0 0 0;
  border: 1px solid #bfcbd9;
  border-radius: 20px;
}
</style>
