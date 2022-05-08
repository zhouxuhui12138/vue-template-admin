<template>
  <div class="spu">
    <el-card style="margin: 20px 0">
      <CategorySelect @category-change="categoryChange" />
    </el-card>

    <el-card>
      <!-- 展示区 -->
      <div v-show="tabIsVisible === true">
        <el-button
          type="primary"
          style="margin-bottom: 20px"
          icon="el-icon-plus"
          :disabled="!attrList.length > 0"
          @click="openAttr"
          >添加属性</el-button
        >

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
              <el-button type="danger" size="mini" icon="el-icon-delete" round>删除</el-button>
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
            <template slot-scope="{ row }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if="row.flag"
                @blur="look(row)"
                @keyup.native.enter="look(row)"
              ></el-input>
              <div @click="row.flag = true" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{}">
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="tabIsVisible = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect/index.vue"
import { getAttrListApi } from "@/api/product/attr"

export default {
  name: "Attr",
  components: { CategorySelect },
  data() {
    return {
      attrList: [],
      tabIsVisible: true,
      category3Id: 0,
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
    async categoryChange(idObj) {
      const { id1, id2, id3 } = idObj
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
    },
    // 修改属性值
    editAttr(row) {
      this.tabIsVisible = false
      // 实现深拷贝
      const obj = JSON.stringify(row)
      const clone = JSON.parse(obj)
      this.attrInfo = clone
    },
    // 切换input为span
    look(row) {
      row.flag = false
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 0 10px;
}
</style>
