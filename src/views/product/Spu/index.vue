<template>
  <div class="spu">
    <el-card style="margin: 20px 0">
      <CategorySelect @category-change="categoryChange" :isDisable="scene === 0 ? false : true" />
    </el-card>

    <el-card>
      <!-- 展示区 -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          :disabled="!category3Id"
          @click="addSpu"
          style="margin-bottom: 20px"
          icon="el-icon-plus"
          >添加SPU</el-button
        >

        <!-- table -->
        <el-table :data="spuList" border stripe>
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="spu名称" align="center" width="160" prop="spuName"></el-table-column>
          <el-table-column label="spu概述" prop="description"> </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="{ row }">
              <el-button @click="addSku(row)" type="success" title="添加" size="mini" icon="el-icon-plus"></el-button>
              <el-button type="warning" @click="editSpu(row)" title="编辑" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="info" @click="lookSku(row)" title="信息" size="mini" icon="el-icon-info"></el-button>
              <el-button
                type="danger"
                @click="deleteSpu(row)"
                title="删除"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next, sizes, total"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[5, 10, 20]"
          align="center"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>

      <!-- 查看sku的dialog -->
      <el-dialog :title="`${skuTitle}的sku列表`" :visible.sync="skuVisable" width="60%" @close="dialogClose">
        <el-table :data="skuList" v-loading="loading">
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column label="默认图片">
            <template slot-scope="{ row }">
              <el-image :src="row.skuDefaultImg" :lazy="true"></el-image>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <!-- add or edit spu -->
      <SpuForm @changeScene="changeScene" ref="spuFormRef" v-show="scene === 1" />

      <!-- add sku -->
      <SkuForm v-show="scene === 2" ref="skuFormRef" @changeScene="changeScene" />
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect/index.vue"
import { getSpuListApi, deleteSpuApi } from "@/api/product/spu"
import { getSkuApi } from "@/api/product/sku"
import SkuForm from "./components/SkuForm.vue"
import SpuForm from "./components/SpuForm.vue"
import { Message } from "element-ui"

export default {
  name: "Spu",
  components: { CategorySelect, SkuForm, SpuForm },
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      spuList: [],
      category3Id: "",
      scene: 0,
      ids: {},
      loading: true,
      skuVisable: false,
      skuList: [],
      skuTitle: "",
    }
  },
  created() {},
  methods: {
    // 添加sku
    addSku(row) {
      this.scene = 2
      this.$refs.skuFormRef.initData({ ...row, ...this.ids })
    },
    // 查看sku
    async lookSku(row) {
      this.skuVisable = true
      this.skuTitle = row.spuName
      const res = await getSkuApi(row.id)
      this.skuList = res.data
      this.loading = false
    },
    // 关闭dialog
    dialogClose() {
      // 清除数据和重新设置loading
      this.loading = true
      this.skuList = []
      this.skuVisable = false
    },
    // 删除spu
    async deleteSpu({ id }) {
      try {
        await deleteSpuApi(id)
        Message({ type: "success", message: "删除成功" })
        if (this.spuList.length >= 1) {
          this.page = this.page - 1
          this.gettAttrList()
        } else {
          this.gettAttrList()
        }
      } catch (error) {}
    },
    // spuForm自定义事件
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag === "修改") {
        this.gettAttrList()
      } else if (flag === "添加") {
        this.page = 1
        this.gettAttrList()
      }
    },
    // 添加spu
    addSpu() {
      this.$refs.spuFormRef.initAddSpuData(this.category3Id)
      this.scene = 1
    },
    // 修改spu
    editSpu(row) {
      this.$refs.spuFormRef?.initUpdataSpuData(row)
      this.scene = 1
    },
    // 子组件传过来的id
    categoryChange(ids) {
      this.category3Id = ids.id3
      this.ids = ids
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
