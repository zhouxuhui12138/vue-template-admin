<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
  mounted() {
    const charts = echarts.init(this.$refs.charts)
    charts.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      title: {
        text: '销售额趋势'
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 110, 120, 130, 170, 300],
          color: 'cadetblue'
        },
      ],
    })
  },
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>
