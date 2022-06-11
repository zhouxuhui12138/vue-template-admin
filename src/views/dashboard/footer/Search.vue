<template>
  <el-card>
    <div slot="header">
      <div class="header">
        <span>线上热门搜索</span>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link"> <i class="el-icon-more"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-row :gutter="20">
        <el-col :span="12"><search-charts /></el-col>
        <el-col :span="12"><search-charts /></el-col>
      </el-row>
      <el-table border :data="data" style="width: 100%">
        <el-table-column type="index" label="排名" width="90"></el-table-column>
        <el-table-column label="搜索关键字" width="230"></el-table-column>
        <el-table-column label="用户数" sortable> </el-table-column>
        <el-table-column label="周涨幅" sortable> </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </el-card>
</template>

<script>
import SearchCharts from "./SearchCharts.vue"
export default {
  components: { SearchCharts },
  data() {
    return {
      data: [{}]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.el-pagination {
  text-align: right;
  margin-top: 20px;
}

.el-table {
  margin-top: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
