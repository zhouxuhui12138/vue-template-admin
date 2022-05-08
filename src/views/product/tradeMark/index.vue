<template>
  <div>
    <!-- 添加品牌 -->
    <el-button type="primary" icon="el-icon-plus" @click="addBrand">添加</el-button>
    <!-- table -->
    <el-table style="width: 100%; margin-top: 20px" border :data="tardMarkList">
      <el-table-column label="序号" width="80" type="index" align="center" />

      <el-table-column label="品牌名称" width="180" align="center" prop="tmName" />

      <el-table-column label="品牌logo" align="center">
        <template slot-scope="{ row }">
          <el-image :src="row.logoUrl" class="logo">
            <!-- 图片加载出错显示404 -->
            <div slot="error" class="image-slot">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4dBRWRCI-YTNhr9-aHCeWnnM1t8naEaHKPg&usqp=CAU"
                class="logo"
                alt=""
              />
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="warning" size="medium" icon="el-icon-edit" @click="editBrand(row)">修改</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteBrand(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next, jumper, sizes, total"
      :total="total"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      align="center"
      :current-page="page"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <!-- 添加品牌的dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="addAndEditVisable" width="40%" @close="addAndEmitDialogClose">
      <!-- 表单 -->
      <el-form ref="addAndEmitBrandFormRef" :model="addAndEmitBrandForm" label-width="80px" :rules="rules">
        <!-- 名称 -->
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="addAndEmitBrandForm.tmName"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addAndEmitBrandForm.logoUrl" :src="addAndEmitBrandForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 尾部 -->
      <span slot="footer">
        <el-button @click="addAndEditVisable = false">取消</el-button>
        <el-button type="primary" @click.native="addAndEditBrand">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTardMarkListApi, addBrandApi, updateBrandApi, deleteBrandApi } from "@/api/product/tardemark"
import { Message } from "element-ui"

export default {
  name: "TradeMark",
  data() {
    return {
      page: 1, // 第几页
      total: 0, // 总条数
      pageSize: 5, // 一页显示多少
      tardMarkList: [], // 列表数组
      addAndEditVisable: false, // 是否显示添加品牌的dialog
      dialogTitle: "", // title
      // v-model need data
      addAndEmitBrandForm: {
        tmName: "",
        logoUrl: "",
      },
      // id
      brandId: "",
      // rules
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请选择图片", trigger: "blur" }],
      },
    }
  },
  created() {
    const { page, pageSize } = this
    this.getTardMarkList(page, pageSize)
  },
  methods: {
    // 获取列表数据
    async getTardMarkList(page, pageSize) {
      try {
        const { data: res } = await getTardMarkListApi(page, pageSize)
        this.total = res.total
        this.tardMarkList = res.records
      } catch (error) {
        console.log(error)
      }
    },
    // currentPage 改变时会触发
    handleCurrentChange(page) {
      this.page = page
      this.getTardMarkList(page, this.pageSize)
    },
    // pageSize 改变时会触发
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTardMarkList(this.page, pageSize)
    },
    // 添加品牌
    addBrand() {
      this.dialogTitle = "添加品牌"
      this.addAndEditVisable = true
    },
    // 添加或者修改品牌
    addAndEditBrand() {
      // 发送网络请求
      this.$refs.addAndEmitBrandFormRef.validate(async valid => {
        if (!valid) return
        if (this.brandId) {
          // 修改
          try {
            const params = { ...this.addAndEmitBrandForm, id: this.brandId }
            await updateBrandApi(params)
            Message({ type: "success", message: "修改成功" })
            this.getTardMarkList(this.page, this.pageSize)
          } catch (error) {
            console.log(error)
          }
        } else {
          // 添加
          try {
            await addBrandApi(this.addAndEmitBrandForm)
            Message({ type: "success", message: "添加成功" })
          } catch (error) {
            console.log(error)
          }
        }
        this.addAndEditVisable = false
      })
    },
    // 修改品牌
    editBrand(row) {
      this.dialogTitle = "修改品牌"
      this.addAndEditVisable = true
      // 设置信息
      this.addAndEmitBrandForm.tmName = row.tmName
      this.addAndEmitBrandForm.logoUrl = row.logoUrl
      this.brandId = row.id
    },
    // 删除品牌
    async deleteBrand(id) {
      await deleteBrandApi(id)
      Message({ type: "success", message: "删除成功" })
      this.getTardMarkList(this.page, this.pageSize)
    },
    // 添加品牌dialog关闭
    addAndEmitDialogClose() {
      this.addAndEmitBrandForm.tmName = ''
      this.addAndEmitBrandForm.logoUrl = ''
      this.addAndEditVisable = false
      this.brandId = ""
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      this.addAndEmitBrandForm.logoUrl = res.data
    },
    // 上传图片之前回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2

      // 验证格式
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

.logo {
  width: 140px;
  height: 70px;
}
</style>

// el css
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-pagination__sizes {
  margin-left: 10px;
}
.el-pagination__total {
  margin-left: 10px;
}
</style>
