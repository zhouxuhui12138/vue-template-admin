<template>
  <div class="attr">
    <el-card style="margin: 20px 0">
      <CategorySelect @category-change="categoryChange" />
    </el-card>

    <el-card>
      <!-- 展示区 -->
      <div v-show="tabIsVisible === true">
        <el-button type="primary" style="margin-bottom: 20px" icon="el-icon-plus" @click="openAttr">添加属性</el-button>

        <el-table :data="attrList" border stripe>
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" align="center" width="200px" prop="attrName"></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag type="success" size="normal" v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="{ row }">
              <el-button type="warning" size="mini" icon="el-icon-edit" round @click="editAttr(row)">修改</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="delectAttrList" round>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加attr的结构 -->
      <div v-show="tabIsVisible === false">
        <el-form label-width="80px" inline :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrInfo.attrName" type="primary" icon="el-icon-plus" @click="addAttr"
          >添加属性值</el-button
        >
        <el-table border style="margin: 20px 0" :data="attrInfo.attrValueList">
          <el-table-column label="序号" type="index" :width="80" align="center"> </el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="'input' + $index"
              >
              </el-input>
              <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ $index }">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAttr($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="submit" :disabled="!attrInfo.attrValueList.length > 0">保存</el-button>
        <el-button @click="tabIsVisible = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect/index.vue"
import { getAttrListApi, updataAndAddAttr } from "@/api/product/attr"
import { Message } from "element-ui"

export default {
  name: "Attr",
  components: { CategorySelect },
  data() {
    return {
      attrList: [],
      tabIsVisible: true,
      category3Id: 0,
      idObj: {},
      // 添加或者修改属性服务器需要的data
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 分类等级
      },
    }
  },
  created() {},
  methods: {
    // 子组件传过来的id
    categoryChange(idObj) {
      this.idObj = idObj
      this.gettAttrList()
    },
    // 获取属性
    async gettAttrList() {
      const { id1, id2, id3 } = this.idObj
      this.category3Id = id3
      const res = await getAttrListApi(id1, id2, id3)
      this.attrList = res.data
    },
    // 打开添加属性值
    openAttr() {
      this.tabIsVisible = false
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    // 添加属性值
    addAttr() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo?.id ?? "",
        valueName: "",
        flag: true,
      })

      this.$nextTick(() => {
        const index = this.attrInfo.attrValueList.length - 1
        this.$refs["input" + index].focus()
      })
    },
    // 修改属性值
    editAttr(row) {
      this.tabIsVisible = false
      // 实现深拷贝
      const obj = JSON.stringify(row)
      let clone = JSON.parse(obj)
      clone.attrValueList.map(item => {
        item.flag = false
      })
      this.attrInfo = clone
    },
    // input失去焦点
    toLook(row) {
      // 不能为空
      if (row.valueName.trim() === "") {
        Message("输入的值不能为空")
        return
      }

      // 不能重复
      const isSome = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isSome) {
        Message("输入的值不能重复")
        return
      }

      row.flag = false
    },
    // 点击div获取焦点
    toEdit(row, index) {
      row.flag = true
      /**
       * 因为点击div的时候 input这个dom刚生成 获取不到ref
       * 所以需要nextTick 等到dom渲染完成后再对input进行操作
       */
      this.$nextTick(() => {
        this.$refs["input" + index]?.focus()
      })
    },
    // 删除属性
    deleteAttr(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.attrInfo.attrValueList.splice(index, 1)
          this.$message({
            type: "success",
            message: "删除成功!",
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    // 提交
    async submit() {
      // 过滤掉不合适的
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName.trim() !== "") {
          delete item.flag
          return true
        }
      })

      try {
        await updataAndAddAttr(this.attrInfo)
        Message({ type: "success", message: "保存成功" })
        this.tabIsVisible = true
        this.gettAttrList()
      } catch (error) {
        Message({ type: "error", message: error.data })
      }
    },
    // 删除属性列表
    delectAttrList() {
      Message("暂未接口")
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 0 10px;
}
</style>
