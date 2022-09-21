<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>国内疫情</span>
        <div class="date-time">数据更新至{{ latest_time }}</div>
      </div>
      <div class="dashboard-container">
        <el-row :gutter="0">
          <el-col :span="4">
            <div class="fater-statis">
              <div>累计确诊</div>
              <div class="confirmed-number">
                {{ this.epidemic_data.confirmedCount }}
              </div>
              <div class="num">
                较昨日<span
                  v-show="this.epidemic_data.yesterdayConfirmedCountIncr > 0"
                  >+</span
                >
                {{ this.epidemic_data.yesterdayConfirmedCountIncr }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="fater-statis">
              <div>现有确诊</div>
              <div class="current-confirm-number">
                {{ this.epidemic_data.currentConfirmedCount }}
              </div>
              <div class="num">
                较昨日
                <span v-show="this.epidemic_data.currentConfirmedIncr > 0"
                  >+</span
                >
                {{ this.epidemic_data.currentConfirmedIncr }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="fater-statis">
              <div>现有无症状</div>
              <div class="serious-number">
                {{ this.epidemic_data.seriousCount }}
              </div>
              <div class="num">
                较昨日
                <span v-show="this.epidemic_data.seriousIncr > 0">+</span>
                {{ this.epidemic_data.seriousIncr }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="fater-statis">
              <div>累计治愈</div>
              <div class="cured-number">
                {{ this.epidemic_data.curedCount }}
              </div>
              <div class="num">
                较昨日
                <span v-show="this.epidemic_data.curedIncr > 0">+</span>
                {{ this.epidemic_data.curedIncr }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="fater-statis">
              <div>累计死亡</div>
              <div class="dead-number">{{ this.epidemic_data.deadCount }}</div>
              <div class="num">
                较昨日
                <span v-show="this.epidemic_data.deadIncr > 0">+</span>
                {{ this.epidemic_data.deadIncr }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="fater-statis">
              <div>累计境外</div>
              <div class="suspected-number">
                {{ this.epidemic_data.suspectedCount }}
              </div>
              <div class="num">
                较昨日
                <span
                  v-show="this.epidemic_data.yesterdaySuspectedCountIncr > 0"
                  >+</span
                >
                {{ this.epidemic_data.yesterdaySuspectedCountIncr }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <span>国内新闻</span>
      </div>
      <div style="margin-top: 20px">
        <el-timeline>
          <el-timeline-item
            color="#E6A23C"
            v-for="(item, index) in news"
            :key="index"
            :timestamp="item.pubDateStr"
            placement="top"
          >
            <el-card>
              <h4>
                {{ item.title }}
              </h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div style="margin-top: 20px">
        <span>感染人数</span>
      </div>
      <div>
        <div
          ref="chart"
          id="chart"
          style="
            width: 80%;
            height: 400px;
            margin-top: -20px;
            margin-left: -40px;
          "
        ></div>
        <div
          ref="pie_chart"
          id="pie_chart"
          style="
            height: 400px;
            width: 20%;
            float: right;
            margin-top: -390px;
            margin-right: 40px;
          "
        ></div>
      </div>
      <div style="margin-top: 20px">
        <span>高风险地区</span>
        <el-table
          stripe
          border
          :data="high_area_list"
          style="width: 100%; margin-top: 6px"
        >
          <el-table-column label="#" type="index" width="200">
          </el-table-column>
          <el-table-column prop="xArea" label="街道/小区"> </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 20px">
        <span>中风险地区</span>
        <el-table
          stripe
          border
          :data="medium_area_list"
          style="width: 100%; margin-top: 6px"
        >
          <el-table-column label="#" type="index" width="200">
          </el-table-column>
          <el-table-column prop="xArea" label="街道/小区"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getReptile, getArea, getRiskNumber, getNews } from "@/api/reptile";
import { getFormtTime } from "../../utils/filters";
export default {
  name: "index",
  data() {
    return {
      news: [],
      risk_number: {
        date: [],
        confirm: [],
        nowConfirm: [],
        noInfect: [],
      },
      high_area_list: [],
      medium_area_list: [],
      latest_time: "2022年03.23 05:13",
      epidemic_data: {
        currentConfirmedCount: 0,
        confirmedCount: 0,
        suspectedCount: 0,
        curedCount: 0,
        deadCount: 0,
        seriousCount: 0,
        suspectedIncr: 0,
        currentConfirmedIncr: 0,
        confirmedIncr: 0,
        curedIncr: 0,
        deadIncr: 0,
        seriousIncr: 0,
        yesterdayConfirmedCountIncr: 0,
        yesterdaySuspectedCountIncr: 0,
        highDangerCount: 0,
        midDangerCount: 0,
      },
    };
  },
  computed: {
    height() {
      return window.screen.availHeight + "px";
    },
  },
  methods: {
    async getNews() {
      await getNews().then((res) => {
        this.news = res.news;
      });
    },
    async getArea() {
      await getArea().then((res) => {
        this.high_area_list = res.high_area;
        this.medium_area_list = res.medium_area;
        this.epidemic_data.highDangerCount = res.hcount;
        this.epidemic_data.midDangerCount = res.mcount;
      });
    },
    async getReptile() {
      await getReptile().then((res) => {
        this.latest_time = res.modifyTime;
        this.latest_time = getFormtTime(this.latest_time, true);
        this.epidemic_data.currentConfirmedCount = res.currentConfirmedCount;
        this.epidemic_data.confirmedCount = res.confirmedCount;
        this.epidemic_data.suspectedCount = res.suspectedCount;
        this.epidemic_data.curedCount = res.curedCount;
        this.epidemic_data.deadCount = res.deadCount;
        this.epidemic_data.seriousCount = res.seriousCount;
        this.epidemic_data.suspectedIncr = res.suspectedIncr;
        this.epidemic_data.currentConfirmedIncr = res.currentConfirmedIncr;
        this.epidemic_data.confirmedIncr = res.confirmedIncr;
        this.epidemic_data.curedIncr = res.curedIncr;
        this.epidemic_data.deadIncr = res.deadIncr;
        this.epidemic_data.seriousIncr = res.seriousIncr;
        this.epidemic_data.deadIncr = res.deadIncr;
        this.epidemic_data.yesterdayConfirmedCountIncr =
          res.yesterdayConfirmedCountIncr;
        this.epidemic_data.yesterdaySuspectedCountIncr =
          res.yesterdaySuspectedCountIncr;
        this.epidemic_data.highDangerCount = res.highDangerCount;
        this.epidemic_data.midDangerCount = res.midDangerCount;
      });
    },
    async getRiskNumber() {
      await getRiskNumber().then((res) => {
        this.risk_number.date = res.date;
        this.risk_number.confirm = res.confirm;
        this.risk_number.nowConfirm = res.nowConfirm;
        this.risk_number.noInfect = res.noInfect;
      });
      await getArea().then((res) => {
        this.epidemic_data.highDangerCount = res.hcount;
        this.epidemic_data.midDangerCount = res.mcount;
      });
    },
    async drawLines() {
      // 以下全局，我引入echarts属性（若是多个页面需要引入echarts的话，一定要在main.js中引入
      var myChart = this.$echarts.init(this.$refs.chart);
      var pie_chart = this.$echarts.init(this.$refs.pie_chart);
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption({
        tooltip: {
          trigger: "axis", // 坐标轴触发
          axisPointer: { type: "cross" }, // 坐标轴指示器配置项
          show: true,
        },
        legend: {},
        xAxis: {
          type: "category",
          data: this.risk_number.date,
          // 坐标轴刻度相关设置。
          axisTick: {
            alignWithLabel: true, // 保证刻度线和标签对齐
          },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 10000000,
        },
        series: [
          {
            data: this.risk_number.confirm,
            type: "line",
            name: "累计确诊",
            emphasis: {
              label: {
                show: true,
              },
            },
            stack: "x1",
          },
          {
            data: this.risk_number.nowConfirm,
            type: "line",
            name: "当前确诊",
            emphasis: {
              label: {
                show: true,
              },
            },
            stack: "x2",
          },
          {
            data: this.risk_number.noInfect,
            type: "line",
            name: "现有无症状",
            emphasis: {
              label: {
                show: true,
              },
            },
            stack: "x3",
          },
        ],
      });
      pie_chart.setOption({
        legend: {},
        series: [
          {
            type: "pie",
            label: {
              show: true,
              position: "inside",
              formatter: "{c}个{d}%",
              width: 500,
            },
            data: [
              {
                value: this.epidemic_data.highDangerCount,
                name: "高风险",
              },
              {
                value: this.epidemic_data.midDangerCount,
                name: "中风险",
              },
            ],
          },
        ],
      });
    },
    async initPage() {
      await this.getRiskNumber();
      await this.drawLines();
    },
  },
  async created() {
    await this.getNews();
    await this.getReptile();
  },
  async mounted() {
    await this.$nextTick(function () {
      this.getArea();
      this.initPage();
    });
  },
};
</script>

<style scoped lang="scss">
.box-card {
  margin: 10px 0 0 0;
  border: 1px solid #bfcbd9;
  border-radius: 20px;
  span {
    font-weight: 400;
  }
  .date-time {
    margin-top: 8px;
    font-size: 13px;
    position: relative;
    color: #999;
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
      "Microsoft YaHei", Arial, sans-serif;
  }
  .dashboard-container {
    //background-color: rgb(240, 242, 245);
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    .fater-statis {
      position: relative;
      height: 60px;
      background-color: #fff;
      margin-bottom: 15px;
      border-radius: 5px;
      padding: 15px;
      font-size: 15px;
      .current-confirm-number {
        color: #e25d4f;
        font-size: 18px;
      }
      .serious-number {
        color: #e25d4f;
        font-size: 18px;
      }
      .cured-number {
        color: #77b634;
        font-size: 18px;
      }
      .dead-number {
        color: #8d8faa;
        font-size: 18px;
      }
      .confirmed-number {
        color: #b11101;
        font-size: 18px;
      }
      .suspected-number {
        color: #b11101;
        font-size: 18px;
      }
      .num {
        font-size: 10px;
      }
    }
  }
  ::v-deep .table_header_class th {
    color: #212529;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
  .box-card {
    width: 400px;
  }
}
</style>
