<template>
  <div class="echarts" ref="progressEcharts"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
  mounted() {
    const progressEcharts = echarts.init(this.$refs.progressEcharts)

    progressEcharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: "category",
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
          data: [78],
          color: 'cyan',
          showBackground: true,
          barWidth: 15,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right',
            color: 'green'
          }
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
