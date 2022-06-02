<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
  props: {
    title: {
      type: String,
      default: '销售额'
    }
  },
  data() {
    return {
      charts: null
    }
  },
  mounted() {
    this.charts = echarts.init(this.$refs.charts)
    this.charts.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      title: {
        text: this.title + '趋势'
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
  watch: {
    title() {
      this.charts.setOption({
        title: {
          text: this.title + '趋势'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>
