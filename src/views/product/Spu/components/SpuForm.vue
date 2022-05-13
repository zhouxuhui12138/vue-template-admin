<template>
  <div class="spu-form">
    <el-form label-width="80px" :model="spu">
      <!-- name -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- brand -->
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="item in brandList" :key="item.id" :value="item.id" :label="item.tmName"></el-option>
        </el-select>
      </el-form-item>
      <!-- description -->
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" placeholder="SPU名称" type="textarea" rows="4"></el-input>
      </el-form-item>
      <!-- image -->
      <el-form-item label="SPU图片">
        <el-upload
          :file-list="imgList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- sale props -->
      <el-form-item label="销售属性">
        <el-select v-model="spu.attrId" :placeholder="`还有${unSelectSaleAttr.length}个未选择`">
          <el-option v-for="item in unSelectSaleAttr" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px" :disabled="!spu.attrId">添加销售属性</el-button>
      </el-form-item>
      <!-- table -->
      <el-table border :data="spu.spuSaleAttrList">
        <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="属性名" width="100" align="center" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值名称列表">
          <template slot-scope="{ row }">
            <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.id" closable :disable-transitions="false">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input v-if="undefined" size="small" class="input-new-tag"> </el-input>
            <el-button v-else class="button-new-tag" size="small">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
        </el-table-column>
      </el-table>
      <!-- btn -->
      <el-form-item class="btns">
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
      dialogImageUrl: "",
      dialogVisible: false,
      brandList: [],
      imgList: [],
      saleAttrList: [],
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        // 品牌的id
        tmId: "",
        //收集SPU图片的信息
        spuImageList: [],
        //平台属性与属性值收集
        spuSaleAttrList: [],
        // 收集未选择属性的id
        attrId: "",
      },
    }
  },
  methods: {
    // 初始化请求数据
    initData({ id }) {
      Promise.all([getSpuApi(id), getBrandApi(), getSpuImgApi(id), getSaleAttrApi()]).then(res => {
        // 修改服务器传过来的数据
        const newImgList = res[2].data.map(item => {
          // file-list 要有name、url属性
          return {
            name: item.imgName,
            url: item.imgUrl,
            ...item,
          }
        })

        this.spu = res[0].data
        this.brandList = res[1].data
        this.imgList = newImgList
        this.saleAttrList = res[3].data
      })
    },
    // 图片删除
    handleRemove(file, fileList) {
      // 收集数据
      this.imgList = fileList
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片保存成功
    handleSuccess(res, file, fileList) {
      // 保存数据
      this.imgList = fileList
    },
  },
  computed: {
    // 计算还有几个销售属性未选择
    unSelectSaleAttr() {
      return this.saleAttrList.filter(item1 => {
        return this.spu.spuSaleAttrList.every(item2 => {
          return item1.name !== item2.saleAttrName
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.btns {
  margin-top: 20px;
}
</style>

// el-css
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
