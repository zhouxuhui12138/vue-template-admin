<template>
  <div class="acl-user">
    <!-- 头部 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchKey" placeholder="用户名"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button plain>清空</el-button>
    </el-form>
    <!-- 添加或删除 -->
    <div class="add-delete">
      <el-button type="primary">添加</el-button>
      <el-button type="danger" plain>批量删除</el-button>
    </div>
    <!-- table -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickName" label="用户昵称"></el-table-column>
      <el-table-column prop="roleName" label="权限列表"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
      <el-table-column prop="gmtModified" label="更新事件"></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="info" icon="el-icon-user" size="mini"></el-button>
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
  </div>
</template>

<script>
import { getInfo, getUserList } from "@/api/acl/user"

export default {
  data() {
    return {
      userList: [],
      total: 0,
      page: 1,
      pageSize: 5,
      searchKey: ''
    }
  },
  created() {
    this.getUserList(this.page, this.pageSize)
  },
  methods: {
    async getUserList(page, pageSize) {
      const { data: res } = await getUserList(page, pageSize, { username: this.searchKey })
      this.userList = res.items
      this.total = res.total
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getUserList(this.page, this.pageSize)
    },
    handleCurrentChange(page) {
      this.page = page
      this.getUserList(this.page, this.pageSize)
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
