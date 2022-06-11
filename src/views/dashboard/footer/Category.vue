<template>
  <el-card>
    <div slot="header">
      <div class="header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="charts">
      <category-charts />
    </div>
  </el-card>
</template>

<script>
import CategoryCharts from './CategoryCharts.vue'
export default {
  components: { CategoryCharts },
  data() {
    return {
      radio: '全部渠道'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
