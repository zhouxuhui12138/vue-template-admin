<template>
  <div class="search-charts">
    <div class="header">
      <span style="margin-right: 10px">搜索用户数</span>
      <svg
        t="1654053346953"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2164"
        width="24"
        height="24"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="2165"
          fill="#bfbfbf"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-text">12331</span>
      <div class="up-or-down">
        <span>17.1</span>
        <svg
          t="1654054084278"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3300"
          width="16"
          height="16"
        >
          <path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="3301" fill="#d81e06"></path>
        </svg>
        <!-- <svg
          t="1654054112332"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3531"
          width="16"
          height="16"
        >
          <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="3532" fill="#1afa29"></path>
        </svg> -->
      </div>
    </div>
    <div class="footer">
      <div class="charts" ref="lineEcharts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const lineEcharts = echarts.init(this.$refs.lineEcharts)

    lineEcharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      grid: {
        top: 0,
        left: -8,
        right: 0,
        bottom: 0,
      },
      series: [
        {
          type: "line",
          data: [1, 20, 30, 61, 29, 33, 39, 9, 65],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#fff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "purple", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    })
  },
}
</script>

<style lang="scss" scoped>
::v-deep .header {
  display: flex;
  align-items: center;
}

.main {
  display: flex;
  align-items: center;
  padding: 8px 0;

  .main-text {
    font-size: 24px;
    margin-right: 10px;
    color: #666;
  }

  .up-or-down {
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
    }
  }
}

.charts {
  width: 100%;
  height: 60px;
}
</style>
