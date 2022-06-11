<template>
  <el-row :gutter="30" style="margin-top: 20px">
    <el-col :span="12">
      <search />
    </el-col>
    <el-col :span="12">
      <category />
    </el-col>
  </el-row>
</template>

<script>
import Category from './Category.vue'
import Search from './Search.vue'
export default {
  components: { Search, Category },

}
</script>

<style>

</style>