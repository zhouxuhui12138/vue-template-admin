<template>
  <el-card class="box-card">
    <!-- 头部区域 -->
    <div slot="header" class="header">
      <!-- tab栏 -->
      <el-tabs class="tabs" v-model="active">
        <el-tab-pane label="访问额" name="0"></el-tab-pane>
        <el-tab-pane label="销售量" name="1"></el-tab-pane>
      </el-tabs>
      <!-- 右侧内容 -->
      <div class="right">
        <span>本日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <!-- 日期选择 -->
        <el-date-picker
          type="daterange"
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
          <bar-charts />
        </el-col>
        <el-col :span="6" class="right">
          <h3>门店销售排名</h3>
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
export default {
  components: { BarCharts },
  data() {
    return {
      active: 0,
    }
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
      width: 200px;
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
      height: 34px;
      line-height: 34px;

      .index {
        display: inline-block;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        background-color: cadetblue;
        color: #fff;
        text-align: center;
        line-height: 25px;
      }

      span {
        margin: 0 10px;
      }
    }
  }
}
</style>
