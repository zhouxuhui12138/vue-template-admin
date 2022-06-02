<template>
  <el-card class="box-card">
    <!-- 头部区域 -->
    <div slot="header" class="header">
      <!-- tab栏 -->
      <el-tabs class="tabs" v-model="active">
        <el-tab-pane label="销售额" name="0"></el-tab-pane>
        <el-tab-pane label="访问量" name="1"></el-tab-pane>
      </el-tabs>
      <!-- 右侧内容 -->
      <div class="right">
        <span @click="setDate(1)">本日</span>
        <span @click="setDate(2)">本周</span>
        <span @click="setDate(3)">本月</span>
        <span @click="setDate(4)">本年</span>
        <!-- 日期选择 -->
        <el-date-picker
          type="daterange"
          v-model="date"
          value-format="yyyy-MM-dd"
          class="date"
          size="mini"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="18">
          <!-- 左侧图表 -->
          <bar-charts :title="title" />
        </el-col>
        <el-col :span="6" class="right">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="index">1</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
            <li>
              <span class="index">2</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
            <li>
              <span class="index">3</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
            <li>
              <span class="index">4</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
            <li>
              <span class="index">5</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
            <li>
              <span class="index">6</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
            <li>
              <span class="index">7</span>
              <span>肯德基</span>
              <span>123, 313</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import BarCharts from "./barCharts.vue"
import dayjs from "dayjs"

export default {
  components: { BarCharts },
  data() {
    return {
      active: "0",
      date: [],
    }
  },
  computed: {
    title() {
      return this.active === "0" ? "销售额" : "访问量"
    },
  },
  methods: {
    setDate(flag) {
      if (flag === 1) {
        const day = dayjs().format("YYYY-MM-DD")
        return (this.date = [day, day])
      }

      if (flag === 2) {
        const start = dayjs().day(1).format("YYYY-MM-DD")
        const end = dayjs().day(7).format("YYYY-MM-DD")
        return (this.date = [start, end])
      }

      if (flag === 3) {
        const start = dayjs().startOf("month").format("YYYY-MM-DD")
        const end = dayjs().endOf("month").format("YYYY-MM-DD")
        return (this.date = [start, end])
      }

      if (flag === 4) {
        const start = dayjs().startOf("year").format("YYYY-MM-DD")
        const end = dayjs().endOf("year").format("YYYY-MM-DD")
        return (this.date = [start, end])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__header {
  border-bottom: none;
  padding: 20px 20px 0 20px;
}

.el-card {
  margin-top: 15px;
}

.header {
  display: flex;
  justify-content: space-between;
  position: relative;

  .tabs {
    width: 100%;
  }

  .right {
    position: absolute;
    right: 0;

    span {
      margin: 0 15px;
    }

    .date {
      width: 260px;
      margin: 0 20px;
    }
  }
}

.right {
  ul {
    width: 100%;
    height: 300px;
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      height: 40px;

      .index {
        display: inline-block;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        background-color: cadetblue;
        color: #fff;
        text-align: center;
        line-height: 22px;
      }

      span {
        margin: 0 10px;
      }
    }
  }
}
</style>
