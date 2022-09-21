<template>
  <div>
    <el-card class="box-card">
      <div slot="header">信息查询</div>
      <div>
        <el-form :inline="true" :model="qryForm">
          <el-form-item>
            <el-input
              v-model="qryForm.name"
              placeholder="输入接种人姓名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="qryForm.card"
              placeholder="输入接种人身份证号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="qryForm.phone"
              placeholder="输入接种人电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="qryForm.address"
              placeholder="输入接种人住址"
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
        <el-button type="primary" @click="addVaccinate()"
          >新增接种记录</el-button
        >
      </div>
      <div>
        <el-table :data="vaccinates" border>
          <el-table-column align="center" type="index"></el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="接种人姓名"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="card"
            label="身份证号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="联系电话"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="联系地址"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="vaccinateTime"
            label="接种时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="vaccinateNo"
            label="接种批次"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="user.username"
            label="记录员"
          ></el-table-column>
          <el-table-column align="center" label="操作处理">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="editVaccinate(scope.row)"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="delVaccinate(scope.row)"
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
            @pagination="getVaccinateList"
          />
        </div>
      </div>
    </el-card>
    <el-dialog
      title="添加接种记录"
      width="800px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="90px"
        :model="vaccinateForm"
        ref="vaccinateForm"
        :rules="rules"
      >
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="接种人姓名">
              <el-input
                v-model="vaccinateForm.name"
                placeholder="请输入接种人姓名…"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input
                v-model="vaccinateForm.card"
                placeholder="请输入身份证号…"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="接种次数">
              <el-select
                style="width: 100%"
                v-model="vaccinateForm.vaccinateNo"
                placeholder="请选择批次"
              >
                <el-option label="一次接种" value="一次接种"></el-option>
                <el-option label="二次接种" value="二次接种"></el-option>
                <el-option label="三次接种" value="三次接种"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接种时间">
              <el-date-picker
                style="width: 100%"
                v-model="vaccinateForm.vaccinateTime"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input
                v-model="vaccinateForm.phone"
                placeholder="请输入联系电话…"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址">
              <el-input
                v-model="vaccinateForm.address"
                placeholder="请输入联系地址…"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddVaccinate()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getVaccinate,
  getVaccinateList,
  addVaccinate,
  deleteVaccinate,
  editVaccinate,
} from "@/api/vaccinate";
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
        card: "",
        phone: "",
        address: "",
      },
      isAdd: true,
      vaccinates: [],
      dialogFormVisible: false,
      total: 0, // 总数
      listQuery: {
        page: 1, // 当前页面
        limit: 10, // 一页展示几条
      },
      vaccinateForm: {
        name: "",
        card: "",
        phone: "",
        address: "",
        vaccinateNo: "",
        vaccinateTime: "",
      },
    };
  },
  mounted() {
    this.getVaccinateList();
  },
  components: {
    pagination,
  },
  methods: {
    async getPageLikeInfo() {
      await getVaccinate({
        name: this.qryForm.name,
        card: this.qryForm.card,
        phone: this.qryForm.phone,
        address: this.qryForm.address,
      }).then((res) => {
        this.vaccinates = res.results;
      });
    },
    async delVaccinate(row) {
      this.$messageBox.confirm({
        message: "你确定要删除该检查记录吗？",
        confirmCallback: async () => {
          // 删除对应的学生信息
          await deleteVaccinate(row.id)
            .then((res) => {
              this.$message.success("删除成功");
              // 获取最新的信息
              this.getVaccinateList();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    editVaccinate(vaccinate) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.vaccinateForm = {
        id: vaccinate.id,
        name: vaccinate.name,
        card: vaccinate.card,
        phone: vaccinate.phone,
        address: vaccinate.address,
        vaccinateNo: vaccinate.vaccinateNo,
        vaccinateTime: vaccinate.vaccinateTime,
      };
    },
    addVaccinate() {
      this.initVaccinateForm();
      this.dialogFormVisible = true;
    },
    initVaccinateForm() {
      this.vaccinateForm = {
        name: "",
        card: "",
        phone: "",
        address: "",
        vaccinateNo: "",
        vaccinateTime: "",
      };
    },
    async getVaccinateList() {
      await getVaccinateList(this.listQuery.page, this.listQuery.limit).then(
        (res) => {
          this.total = res.count;
          this.vaccinates = res.results;
        }
      );
    },
    onSubmitAddVaccinate() {
      this.$refs["vaccinateForm"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 新增检查记录
        if (this.isAdd) {
          await addVaccinate(this.vaccinateForm).then((res) => {
            if (res) {
              this.vaccinates.push(res);
              this.dialogFormVisible = false;
              this.initVaccinateForm();
              this.$message.success("接种记录创建成功");
              this.getVaccinateList();
            }
          });
        } else {
          await editVaccinate(this.vaccinateForm.id, this.vaccinateForm).then(
            async (res) => {
              if (res) {
                getVaccinateList()
                  .then((res) => {
                    this.vaccinates = res.results;
                    this.isAdd = true;
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$message.error("更新接种记录信息失败");
                  });
                this.dialogFormVisible = false;
                this.initVaccinateForm();
                this.$message.success("接种记录信息修改成功！");
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
