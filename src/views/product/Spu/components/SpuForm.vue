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
        <el-input v-model="spu.description" placeholder="SPU描述" type="textarea" rows="4"></el-input>
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
        <el-select v-model="attrIdAndName" :placeholder="`还有${unSelectSaleAttr.length}个未选择`">
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :value="`${item.id},${item.name}`"
            :label="item.name"
          ></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px" @click="addSaleAttr" :disabled="!attrIdAndName"
          >添加销售属性
        </el-button>
      </el-form-item>
      <!-- table -->
      <el-table border :data="spu.spuSaleAttrList">
        <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="属性名" width="100" align="center" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值名称列表">
          <template slot-scope="{ row, $index }">
            <el-tag
              @close="removeTag(row, index)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              :disable-transitions="false"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisable"
              v-model="row.inputValue"
              size="small"
              :ref="`input${$index}`"
              class="input-new-tag"
              @blur="onInputBlur(row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row, $index)"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="{ $index }">
            <el-button type="danger" size="small" @click="removeSaleAttr($index)" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- btn -->
      <el-form-item class="btns">
        <el-button @click="addOrUpdateSpu" type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSpuApi, getSpuImgApi, getBrandApi, getSaleAttrApi, addSpuApi, updateSpuApi } from "@/api/product/spu"
import { Message } from "element-ui"

export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      brandList: [],
      imgList: [],
      saleAttrList: [],
      // 收集未选择属性的id和名字
      attrIdAndName: "",
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
      },
    }
  },
  methods: {
    // 取消
    cancel() {
      Object.assign(this._data, this.$options.data())
      this.$emit("changeScene", { scene: 0, flag: "" })
    },
    // 初始化修改spu数据
    initUpdataSpuData({ id }) {
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
    // 初始化添加spu数据
    initAddSpuData(category3Id) {
      this.spu.category3Id = category3Id
      Promise.all([getBrandApi(), getSaleAttrApi()]).then(res => {
        this.brandList = res[0].data
        this.saleAttrList = res[1].data
      })
    },
    // 删除销售属性
    removeSaleAttr(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    // 删除tag
    removeTag(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    // input失去焦点
    onInputBlur(row) {
      // 不能为空
      if (row.inputValue.trim() === "") {
        Message("不能为空")
        return
      }
      // 不能重复
      const isSome = row.spuSaleAttrValueList.some(item => {
        return item.saleAttrValueName === row.inputValue
      })
      if (isSome) return
      // 条件都成立 保存
      const { baseSaleAttrId, inputValue: saleAttrValueName } = row
      row.spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrValueName })
      row.inputVisable = false
    },
    // 添加销售属性值
    addSaleAttrValue(row, index) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs["input" + index].focus()
        }, 0)
      })
      // 添加响应式数据 分别控制input显示隐藏和收集v-model的数据
      this.$set(row, "inputVisable", true)
      this.$set(row, "inputValue", "")
    },
    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(",")
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 清除
      this.attrIdAndName = ""
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
    // 保存或者修改spu
    async addOrUpdateSpu() {
      // 整理数据
      this.spu.spuImageList = this.imgList.map(item => {
        return {
          imgName: item.name || item.imgName,
          imgUrl: item.response?.data || item.imgUrl,
        }
      })

      try {
        if (this.spu.id) {
          // 修改
          await updateSpuApi(this.spu)
          Message({ type: "success", message: "修改成功" })
          this.$emit("changeScene", { scene: 0, flag: "修改" })
        } else {
          // 添加
          await addSpuApi(this.spu)
          Message({ type: "success", message: "添加成功" })
          this.$emit("changeScene", { scene: 0, flag: "添加" })
        }
      } catch (error) {
        Message({ type: "error", message: error.message })
        this.$emit("changeScene", { scene: 0, flag: "" })
      }

      // 清除数据
      Object.assign(this._data, this.$options.data())
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
