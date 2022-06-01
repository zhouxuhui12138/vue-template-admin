<template>
  <div class="echarts" ref="barEcharts"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
  mounted() {
    const barEcharts = echarts.init(this.$refs.barEcharts)

    barEcharts.setOption({
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
          type: "bar",
          data: [20, 30, 61, 29, 33, 39, 9, 65, 4, 7, 31, 33, 53],
          color: 'pink'
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
