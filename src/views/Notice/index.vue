<template>
  <div>
    <el-card class="box-card">
      <div slot="header">信息查询</div>
      <div>
        <el-form :inline="true" :model="qryForm">
          <el-form-item>
            <el-input
              v-model="qryForm.title"
              placeholder="输入通知标题"
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
        <el-button type="primary" @click="addNotice()">新增通知</el-button>
      </div>
      <div>
        <el-table :data="notices" border>
          <el-table-column align="center" type="index"></el-table-column>
          <el-table-column align="center" label="通知时间">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="title"
            label="通知标题"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="detail"
            label="通知详情"
          ></el-table-column>
          <el-table-column align="center" label="操作处理">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="editNotice(scope.row)"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="delNotice(scope.row)"
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
            @pagination="getNoticeList"
          />
        </div>
      </div>
    </el-card>
    <el-dialog
      title="添加通知记录"
      width="600px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="90px"
        :model="noticeForm"
        ref="noticeForm"
        :rules="rules"
      >
        <el-form-item label="通知标题">
          <el-input
            v-model="noticeForm.title"
            placeholder="请输入通知标题"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="通知详情">
          <el-input
            type="textarea"
            v-model="noticeForm.detail"
            :rows="6"
            placeholder="请输入通知详情"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddNotice()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getNotice,
  getNoticeList,
  addNotice,
  deleteNotice,
  editNotice,
} from "@/api/notice";
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
        title: "",
      },
      isAdd: true,
      notices: [],
      dialogFormVisible: false,
      total: 0, // 总数
      listQuery: {
        page: 1, // 当前页面
        limit: 10, // 一页展示几条
      },
      noticeForm: {
        detail: "",
        title: "",
      },
    };
  },
  mounted() {
    this.getNoticeList();
  },
  components: {
    pagination,
  },
  methods: {
    async getPageLikeInfo() {
      await getNotice({ title: this.qryForm.title }).then((res) => {
        this.notices = res.results;
      });
    },
    async delNotice(row) {
      this.$messageBox.confirm({
        message: "你确定要删除该通知记录吗？",
        confirmCallback: async () => {
          // 删除对应的学生信息
          await deleteNotice(row.id)
            .then((res) => {
              this.$message.success("删除成功");
              // 获取最新的信息
              this.getNoticeList();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    editNotice(notice) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.noticeForm = {
        id: notice.id,
        detail: notice.detail,
        title: notice.title,
      };
    },
    addNotice() {
      this.initNoticeForm();
      this.dialogFormVisible = true;
    },
    initNoticeForm() {
      this.noticeForm = {
        detail: "",
        title: "",
      };
    },
    async getNoticeList() {
      await getNoticeList(this.listQuery.page, this.listQuery.limit).then(
        (res) => {
          this.total = res.count;
          this.notices = res.results;
        }
      );
    },
    onSubmitAddNotice() {
      this.$refs["noticeForm"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 新增检查记录
        if (this.isAdd) {
          await addNotice(this.noticeForm).then((res) => {
            if (res) {
              this.notices.push(res);
              this.dialogFormVisible = false;
              this.initNoticeForm();
              this.$message.success("通知记录创建成功");
              this.getNoticeList();
            }
          });
        } else {
          await editNotice(this.noticeForm.id, this.noticeForm).then(
            async (res) => {
              if (res) {
                getNoticeList()
                  .then((res) => {
                    this.notices = res.results;
                    this.isAdd = true;
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$message.error("更新通知记录信息失败");
                  });
                this.dialogFormVisible = false;
                this.initNoticeForm();
                this.$message.success("通知记录信息修改成功！");
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
