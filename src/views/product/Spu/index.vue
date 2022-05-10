<template>
  <div class="spu">
    <el-card style="margin: 20px 0">
      <CategorySelect @category-change="categoryChange" />
    </el-card>

    <el-card>
      <!-- 展示区 -->
      <div v-show="scene === 0">
        <el-button type="primary" style="margin-bottom: 20px" icon="el-icon-plus">添加SPU</el-button>

        <!-- table -->
        <el-table :data="spuList" border stripe>
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="spu名称" align="center" width="160" prop="spuName"></el-table-column>
          <el-table-column label="spu概述" prop="description"> </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="{}">
              <el-button type="success" title="添加" size="mini" icon="el-icon-plus"></el-button>
              <el-button type="warning" title="编辑" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="info" title="信息" size="mini" icon="el-icon-info"></el-button>
              <el-button type="danger" title="删除" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next, sizes, total"
          :total="total"
          :page-size="limit"
          :page-sizes="[5, 10, 20, 30]"
          align="center"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>

      <!-- add or edit spu -->
      <SpuForm v-show="scene === 1" />

      <!-- add sku -->
      <SkuForm v-show="scene === 2" />
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect/index.vue"
import { getSpuListApi } from "@/api/product/spu"
import SkuForm from "./components/SkuForm.vue"
import SpuForm from "./components/SpuForm.vue"

export default {
  name: "Spu",
  components: { CategorySelect, SkuForm, SpuForm },
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      spuList: [],
      category3Id: 0,
      scene: 0,
    }
  },
  created() {},
  methods: {
    // 子组件传过来的id
    categoryChange({ id3 }) {
      this.category3Id = id3
      this.gettAttrList()
    },
    // 获取属性
    async gettAttrList() {
      const res = await getSpuListApi(this.page, this.limit, this.category3Id)
      this.spuList = res.data.records
      this.total = res.data.total
    },
    // 翻页
    handleCurrentChange(page) {
      this.page = page
      this.gettAttrList()
    },
    // 修改limit
    handleSizeChange(limit) {
      this.limit = limit
      this.gettAttrList()
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 0 10px;
}

.el-pagination {
  margin-top: 20px;
}
</style>
