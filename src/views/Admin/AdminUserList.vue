<template>
  <div>
    <div class="user-actions">
      <!-- 添加用户的入口 -->
      <el-button
        type="primary"
        class="add-user-btn"
        @click="addAdmin"
        icon="el-icon-edit"
      >
        添加管理员</el-button
      >
    </div>
    <!-- 用户表单 -->
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="210"> </el-table-column>
      <el-table-column prop="username" label="管理员"
        ><template slot-scope="scope"
          ><div>{{ scope.row.username }}</div></template
        >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small"
            >更改</el-button
          >
          <el-button @click="remove(scope.row._id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    fetch() {
      this.$http
        .get("admin_users")
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          this.$message.error("获取数据失败");
          console.error(error);
        });
    },
    addAdmin() {
      this.$router.push("/admin_users/add"); // 跳转到添加用户的页面
    },
    edit(id) {
      this.$router.push(`/admin_users/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`admin_users/${id}`).then(() => {
        this.$message({
          message: "文章删除成功",
          type: "success",
        });
        this.fetch(); //删除之后，调用fetch()方法进行再次获取数据，即可实现刷新
      });
    },
  },
  // 获取真正的数据
  created() {
    this.fetch(); //调用fetch()方法进行获取数据
  },
};
</script>

<style>
.user-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-user-btn {
  margin-right: 10px;
}

/* 超出一行范围使用省略号 */
.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 省略号 */
}
</style>
