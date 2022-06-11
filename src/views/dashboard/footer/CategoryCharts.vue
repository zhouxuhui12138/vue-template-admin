<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    const myCharts = echarts.init(this.$refs.charts)

    myCharts.setOption({
      title: {
        text: 'Search Engine',
        subtext: '1048',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    })
  
    myCharts.on('mouseover', (params) => {
      const { name, value } = params.data

      myCharts.setOption({
        title: {
          text: name,
          subtext: value + ''
        }
      })
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
