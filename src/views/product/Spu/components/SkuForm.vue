<template>
  <div>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="SPU名称"> 海绵宝宝 </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" v-model="a">
              <el-option value="123"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px">
          <el-form-item label="颜色">
            <el-select placeholder="请选择" v-model="a">
              <el-option value="123"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="图片"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getImageListApi, getAttrInfoApi, getSaleAttrApi } from "@/api/product/sku"
import { Message } from 'element-ui'
export default {
  data() {
    return {
      a: "",
      imgList: [],
      attrInfo: [],
      saleAttr: []
    }
  },
  methods: {
    // 获取数据
    initData(ids) {
      const { id1, id2, id3, id: skuId } = ids
      Promise.all([getImageListApi(skuId), getAttrInfoApi(id1, id2, id3), getSaleAttrApi(skuId)])
        .then(res => {
          this.imgList = res[0].data
          this.attrInfo = res[1].data
          this.saleAttr = res[2].data
        })
        .catch(err => {
          Message({ type: 'error', message: err.message })
        })
    },
  },
}
</script>

<style></style>
