<template>
  <div>
    <!-- table -->
    <el-table border :data="skuList">
      <el-table-column width="90" label="序号" type="index" align="center"> </el-table-column>
      <el-table-column label="名称" prop="skuName"> </el-table-column>
      <el-table-column label="描述" prop="skuDesc"> </el-table-column>
      <el-table-column label="默认图片" align="center">
        <template slot-scope="{ row }">
          <el-image :src="row.skuDefaultImg" fit="fill" :lazy="true"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)" width="80" prop="weight"> </el-table-column>
      <el-table-column label="价格(元)" width="80" prop="price"> </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            @click="downAndUpSku(row.id, '下架')"
            v-if="row.isSale === 1"
            icon="el-icon-sort-up"
            size="mini"
          ></el-button>
          <el-button
            type="info"
            @click="downAndUpSku(row.id, '上架')"
            v-if="row.isSale === 0"
            icon="el-icon-sort-down"
            size="mini"
          ></el-button>
          <el-button type="primary" @click="edit" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="info" @click="skuDetail(row)" icon="el-icon-info" size="mini"></el-button>
          <el-button type="danger" @click="edit" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30]"
      :current-page="page"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <!-- 展示sku详情抽屉 -->
    <el-drawer :visible.sync="drawerVisible" size="50%" :with-header="false" @close="drawerClose">
      <el-row :gutter="20">
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetailInfo.skuName }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDetailInfo.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetailInfo.price }}元</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag type="success" size="normal" v-for="item in skuDetailInfo.skuAttrValueList" :key="item.id">
            {{ item.attrId }} - {{ item.valueId }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click">
            <el-carousel-item v-for="item in skuDetailInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { getSkuListApi, downSkuApi, upSkuApi, getSkuDetailApi } from "@/api/product/sku"
import { Message } from "element-ui"
export default {
  name: "Sku",
  data() {
    return {
      total: 50,
      page: 1,
      limit: 5,
      skuList: [],
      drawerVisible: false,
      skuDetailInfo: {},
    }
  },
  created() {
    this.getSkuList(this.page, this.limit)
  },
  methods: {
    // 获取sku详情
    async skuDetail(row) {
      this.drawerVisible = true
      const res = await getSkuDetailApi(row.id)
      this.skuDetailInfo = res.data
    },
    // 获取sku列表
    async getSkuList(page, limit) {
      try {
        const res = await getSkuListApi(page, limit)
        this.skuList = res.data.records
        this.total = res.data.total
      } catch (error) {}
    },
    // 翻页
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList(page, this.limit)
    },
    // 调整limit
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList(this.page, limit)
    },
    // 编辑
    edit() {
      Message("正在开发中")
    },
    // 上下架
    async downAndUpSku(id, flag) {
      try {
        if (flag === "上架") {
          await upSkuApi(id)
          Message({ type: "success", message: "上架成功" })
        } else {
          await downSkuApi(id)
          Message({ type: "success", message: "下架成功" })
        }
        this.getSkuList(this.page, this.limit)
      } catch (error) {}
    },
    // 关闭drawer清空数据
    drawerClose() {
      this.skuDetailInfo = {}
    },
  },
}
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}

.el-image {
  width: 100px;
  height: 100px;
}

.el-row {
  margin: 20px 10px;
  .el-col-5 {
    text-align: right;
    font-size: 18px;
    font-weight: 600;
  }

  .el-tag {
    margin: 5px 10px;
  }

  .el-col-16 {
    line-height: 30px;
    margin-top: -5px;
  }
}

::v-deep .el-carousel {
  width: 300px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }
}

.el-drawer {
  overflow-y: auto;
}
</style>
