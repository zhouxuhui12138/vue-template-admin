<template>
  <div class="spu-form">
    <el-form label-width="80px">
      <!-- name -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称"></el-input>
      </el-form-item>
      <!-- brand -->
      <el-form-item label="品牌">
        <el-select v-model="text" placeholder="请选择品牌">
          <el-option value="value"></el-option>
        </el-select>
      </el-form-item>
      <!-- description -->
      <el-form-item label="SPU描述">
        <el-input placeholder="SPU名称" type="textarea" rows="4"></el-input>
      </el-form-item>
      <!-- image -->
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- sale props -->
      <el-form-item label="销售属性">
        <el-select v-model="text" placeholder="还有3未选择">
          <el-option value="value"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px">添加销售属性</el-button>
      </el-form-item>
      <!-- table -->
      <el-table border>
        <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="属性名"></el-table-column>
        <el-table-column label="属性值名称列表"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- btn -->
      <el-form-item class="btns" label-width="0">
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSpuApi, getSpuImgApi, getBrandApi, getSaleAttrApi } from "@/api/product/spu"

export default {
  name: "SpuForm",
  data() {
    return {
      text: "",
      dialogImageUrl: "",
      dialogVisible: false,
      spuInfo: {},
      brandList: [],
      imgList: [],
      saleAttrList: [],
    }
  },
  methods: {
    // 初始化请求数据
    initData({ id }) {
      Promise.all([getSpuApi(id), getBrandApi(), getSpuImgApi(id), getSaleAttrApi()]).then(res => {
        this.spuInfo = res[0].data
        this.brandList = res[1].data
        this.imgList = res[2].data
        this.saleAttrList = res[3].data
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.btns {
  margin-top: 20px;
}
</style>
