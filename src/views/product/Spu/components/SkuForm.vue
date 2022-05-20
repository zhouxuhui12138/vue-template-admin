<template>
  <div>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="SPU名称"> {{ spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" v-model="skuInfo.skuDesc" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfo" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :value="`${attr.id},${attrValue.id}`"
                :label="attrValue.valueName"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px">
          <el-form-item :label="sale.saleAttrName" v-for="sale in saleAttr" :key="sale.id">
            <el-select placeholder="请选择" v-model="sale.saleIdAndValueId">
              <el-option
                v-for="saleValue in sale.spuSaleAttrValueList"
                :key="saleValue.id"
                :value="`${sale.id},${saleValue.id}`"
                :label="saleValue.saleAttrName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="imgList" @selection-change="handleSelectionChange"
          >>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="{ row }">
              <el-image :src="row.imgUrl" :lazy="true"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button type="primary" @click="setDefault(row)" v-if="row.isDefalut === 0">设为默认</el-button>
              <el-button size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getImageListApi, getAttrInfoApi, getSaleAttrApi, addSkuApi } from "@/api/product/sku"
import { Message } from "element-ui"
export default {
  data() {
    return {
      imgList: [],
      attrInfo: [],
      saleAttr: [],
      selectImgList: [],
      spuName: "",
      // 需要发送给服务器的数据
      skuInfo: {
        // 父组件传过来的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 双向绑定
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 需要自己收集的数据
        skuDefaultImg: "",
        skuImageList: [],
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
      },
    }
  },
  methods: {
    // 获取数据
    initData(ids) {
      const { id1, id2, id3, id: skuId, tmId, spuName } = ids
      this.spuName = spuName
      this.skuInfo.category3Id = id3
      this.skuInfo.spuId = skuId
      this.skuInfo.tmId = tmId

      Promise.all([getImageListApi(skuId), getAttrInfoApi(id1, id2, id3), getSaleAttrApi(skuId)])
        .then(res => {
          let imgList = res[0].data
          imgList.forEach(item => {
            item.isDefalut = 0
          })
          this.imgList = imgList
          // 数据太多不好展示
          this.attrInfo = res[1].data.splice(0, 2)
          this.saleAttr = res[2].data.splice(0, 1)
        })
        .catch(err => {
          Message({ type: "error", message: err.message })
        })
    },
    // 取消
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" })
    },
    // 选中图片的回调
    handleSelectionChange(imgList) {
      this.selectImgList = imgList
    },
    // 排他
    setDefault(row) {
      this.imgList.forEach(item => {
        item.isDefalut = 0
      })
      this.$set(row, "isDefalut", 1)
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 保存
    async submit() {
      // 整理数据
      this.attrInfo.forEach(item => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(",")
          this.skuInfo.skuAttrValueList.push({ attrId, valueId })
        }
      })
      this.saleAttr.forEach(item => {
        if (item.saleIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleIdAndValueId.split(",")
          this.skuInfo.skuSaleAttrValueList.push({ saleAttrId, saleAttrValueId })
        }
      })
      this.skuInfo.skuImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        }
      })

      const res = await addSkuApi(this.skuInfo)
      if (res?.code === 200) {
        Message({ type: "success", message: "成功" })
        this.$emit("changeScene", { scene: 0, flag: "" })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-image {
  width: 100px;
  height: 100px;
}
</style>
