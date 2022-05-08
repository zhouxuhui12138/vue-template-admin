<template>
  <div>
    <!-- 三级联动下拉菜单 -->
    <el-form :inline="true" :model="selectForm">
      <el-form-item label="一级分类">
        <el-select v-model="selectForm.id1" placeholder="请选择" @change="handleSelect1">
          <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="selectForm.id2" placeholder="请选择" @change="handleSelect2">
          <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="selectForm.id3" placeholder="请选择" @change="handleSelect3">
          <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategoryOneListApi, getCategoryTwoListApi, getCategoryThreeListApi } from "@/api/product/attr"
export default {
  name: "categorySelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      selectForm: {
        id1: '',
        id2: '',
        id3: ''
      }
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    // 获取分类数据
    async getCategoryList() {
      const res = await getCategoryOneListApi()
      this.list1 = res.data
    },
    // category1
    async handleSelect1() {
      this.clear(1)
      const res = await getCategoryTwoListApi(this.selectForm.id1)
      this.list2 = res.data
    },
    // category2
    async handleSelect2() {
      this.clear(2)
      const res = await getCategoryThreeListApi(this.selectForm.id2)
      this.list3 = res.data
    },
    // category3
    async handleSelect3() {
      this.$emit('category-change', this.selectForm)
    },
    // 清除分类数据或者id
    clear(flag) {
      if (flag === 1) {
        this.selectForm.id2 = ''
        this.selectForm.id3 = ''
        this.list2 = []
        this.list3 = []
      } else {
        this.selectForm.id3 = ''
        this.list3 = []
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
