<template>
  <div class="echarts" ref="lineEcharts"></div>
</template>

<script>
import * as echarts from "echarts"

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
        left: 0,
        right: 0,
        bottom: 0,
      },
      series: [
        {
          type: "line",
          data: [20, 30, 61, 29, 33, 39, 9, 65],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: 'skyblue'
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
                  color: "skyblue", // 100% 处的颜色
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
.echarts {
  width: 100%;
  height: 100%;
}
</style>
