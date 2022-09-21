<template>
  <div>
    <el-card class="box-card">
      <div slot="header">信息查询</div>
      <div>
        <el-form :inline="true" :model="qryForm">
          <el-form-item>
            <el-select v-model="qryForm.result" placeholder="请选择检查结果">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="qryForm.location"
              placeholder="输入检查地点"
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
        <el-button type="primary" @click="addInspection()"
          >新增检查记录</el-button
        >
      </div>
      <div>
        <el-table :data="inspections" border>
          <el-table-column align="center" type="index"></el-table-column>
          <el-table-column align="center" label="检查时间">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="location"
            label="检查地点"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="user.username"
            label="记录员"
          ></el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="detail"
            label="检查详情"
          >
          </el-table-column>
          <el-table-column align="center" label="检查结果">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result === '正常'">正常</el-tag>
              <el-tag type="danger" v-if="scope.row.result === '异常'"
                >异常</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作处理">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="editInspection(scope.row)"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="delInspection(scope.row)"
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
            @pagination="getInspectionList"
          />
        </div>
      </div>
    </el-card>
    <el-dialog
      title="添加检查记录"
      width="600px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="90px"
        :model="inspectionForm"
        ref="inspectionForm"
        :rules="rules"
      >
        <el-form-item label="检查结果">
          <el-radio-group v-model="inspectionForm.result">
            <el-radio label="正常" value="正常"></el-radio>
            <el-radio label="异常" value="异常"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检查地点">
          <el-input
            v-model="inspectionForm.location"
            placeholder="请输入检查地点…"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="检查详情">
          <el-input
            type="textarea"
            v-model="inspectionForm.detail"
            :rows="6"
            placeholder="请输入检查详情…"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddInspection()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getInspection,
  getInspectionList,
  addInspection,
  deleteInspection,
  editInspection,
} from "@/api/inspection";
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
        result: "",
        location: "",
      },
      isAdd: true,
      inspections: [],
      dialogFormVisible: false,
      total: 0, // 总数
      listQuery: {
        page: 1, // 当前页面
        limit: 10, // 一页展示几条
      },
      inspectionForm: {
        result: "",
        location: "",
        detail: "",
      },
    };
  },
  mounted() {
    this.getInspectionList();
  },
  components: {
    pagination,
  },
  methods: {
    async getPageLikeInfo() {
      await getInspection({
        result: this.qryForm.result,
        location: this.qryForm.location,
      }).then((res) => {
        this.inspections = res.results;
      });
    },
    async delInspection(row) {
      this.$messageBox.confirm({
        message: "你确定要删除该检查记录吗？",
        confirmCallback: async () => {
          // 删除对应的学生信息
          await deleteInspection(row.id)
            .then((res) => {
              this.$message.success("删除成功");
              // 获取最新的信息
              this.getInspectionList();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    editInspection(inspection) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.inspectionForm = {
        detail: inspection.detail,
        result: inspection.result,
        location: inspection.location,
        id: inspection.id,
      };
    },
    addInspection() {
      this.initInspectionForm();
      this.dialogFormVisible = true;
    },
    initInspectionForm() {
      this.inspectionForm = {
        location: "",
        result: "",
        detail: "",
      };
    },
    async getInspectionList() {
      await getInspectionList(this.listQuery.page, this.listQuery.limit).then(
        (res) => {
          this.total = res.count;
          this.inspections = res.results;
        }
      );
    },
    onSubmitAddInspection() {
      this.$refs["inspectionForm"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 新增检查记录
        if (this.isAdd) {
          await addInspection(this.inspectionForm).then((res) => {
            if (res) {
              this.inspections.push(res);
              this.dialogFormVisible = false;
              this.initInspectionForm();
              this.$message.success("检查记录创建成功");
              this.getInspectionList();
            }
          });
        } else {
          await editInspection(
            this.inspectionForm.id,
            this.inspectionForm
          ).then(async (res) => {
            if (res) {
              getInspectionList()
                .then((res) => {
                  this.inspections = res.results;
                  this.isAdd = true;
                })
                .catch((err) => {
                  console.log(err);
                  this.$message.error("更新检查记录信息失败");
                });
              this.dialogFormVisible = false;
              this.initInspectionForm();
              this.$message.success("检查记录信息修改成功！");
            }
          });
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
