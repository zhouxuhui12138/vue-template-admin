<template>
  <div class="acl-user">
    <!-- 头部 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchKey" placeholder="用户名"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getUserList(page, pageSize)">查询</el-button>
      <el-button plain @click="clearSearch">清空</el-button>
    </el-form>
    <!-- 添加或删除 -->
    <div class="add-delete">
      <el-button type="primary">添加</el-button>
      <el-button type="danger" plain>批量删除</el-button>
    </div>
    <!-- table -->
    <el-table :data="userList" style="width: 100%" border v-loading="loading">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickName" label="用户昵称"></el-table-column>
      <el-table-column prop="roleName" label="权限列表"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
      <el-table-column prop="gmtModified" label="更新事件"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="info" @click="setRole(row.id)" icon="el-icon-user" size="mini"></el-button>
          <el-button type="primary" @click="editUser(row)" icon="el-icon-edit" size="mini"></el-button>
          <el-popconfirm placement="top" style="margin-left: 10px" title="确定删除吗?" @onConfirm="deleteUser(row.id)">
            <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, sizes, total"
      :total="total"
    >
    </el-pagination>

    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="editUserDialog" width="50%" @close="closeEditUser">
      <el-form :model="editUserForm" label-width="80px" ref="editUserRef" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="editUserForm.nickName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="editUserDialog = false">取消</el-button>
        <el-button type="primary" @click="submitEditUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, updateUser, deleteUser, getUserRoles } from "@/api/acl/user"
import { Message } from "element-ui"

export default {
  data() {
    return {
      userList: [],
      total: 0,
      page: 1,
      pageSize: 5,
      searchKey: "",
      loading: true,
      editUserDialog: false,
      editUserForm: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
        ],
      },
    }
  },
  created() {
    this.getUserList(this.page, this.pageSize)
  },
  methods: {
    // 获取用户数据
    async getUserList(page, pageSize) {
      this.loading = true
      const { data: res } = await getUserList(page, pageSize, { username: this.searchKey })
      this.userList = res.items.filter(item => item.username !== "admin")
      this.total = res.total - 1
      this.loading = false
    },
    // 改变pageSize
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getUserList(this.page, this.pageSize)
    },
    // 改变page
    handleCurrentChange(page) {
      this.page = page
      this.getUserList(this.page, this.pageSize)
    },
    // 取消搜索
    clearSearch() {
      this.searchKey = ""
      this.getUserList(this.page, this.pageSize)
    },
    // 弹出修改用户
    editUser(row) {
      // 深拷贝 阻止浅拷贝引用错误
      const obj = JSON.stringify(row)
      this.editUserForm = JSON.parse(obj)
      this.editUserDialog = true
    },
    // 提交修改用户
    submitEditUser() {
      this.$refs["editUserRef"].validate(async valid => {
        if (!valid) return
        try {
          await updateUser(this.editUserForm)
          this.getUserList(this.page, this.pageSize)
          Message({ type: "success", message: "修改成功" })
        } catch (error) {
          Message({ type: "error", message: error })
        }

        this.editUserDialog = false
      })
    },
    // 关闭修改用户
    closeEditUser() {
      this.editUserForm = {}
    },
    // 删除用户
    async deleteUser(id) {
      try {
        await deleteUser(id)
        this.getUserList(this.page, this.pageSize)
        Message({ type: "success", message: "删除成功" })
      } catch (error) {
        Message({ type: "error", message: error })
      }
    },
    // 展示和修改用户的角色
    async setRole(id) {
      try {
        const res = await getUserRoles(id)
        console.log(res)
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;

  ::v-deep .el-pagination__total {
    float: right;
  }

  ::v-deep .el-pagination__sizes {
    float: right;
  }
}
</style>
