<template>
  <div>
    <div class="user-actions">
      <!-- 添加用户的入口 -->
      <el-button
        type="primary"
        class="add-user-btn"
        @click="addUser"
        icon="el-icon-edit"
      >
        添加用户</el-button
      >

      <!-- 搜索用户 -->
      <div class="search-section">
        <el-input
          class="search-input"
          placeholder="搜索用户"
          v-model="searchQuery"
          @keyup.enter="searchUsers"
        >
          <template slot="append">
            <el-button type="primary" icon="el-icon-search" @click="searchUsers"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
    </div>
    <!-- 用户表单 -->
    <el-table :data="users">
      <!-- <el-table-column prop="image" label="头像" width="140"> </el-table-column> -->
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="introduce" label="简介" width="220">
      </el-table-column>
      <el-table-column prop="list" label="权限等级"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
      <el-table-column prop="time" label="创建时间" width="220">
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
      users: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("users").then((res) => {
        this.users = res.data;
      });
    },
    addUser() {
      this.$router.push("/users/add"); // 跳转到添加用户的页面
    },
    searchUsers() {
      // 搜索逻辑已经在 computed 属性中处理
    },
    edit(id) {
      this.$router.push(`/users/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`users/${id}`).then(() => {
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

.search-section {
  display: flex;
  align-items: center;
  justify-content: center; /* 修改为居中对齐 */
  flex-grow: 1;
  max-width: 300px; /* 控制搜索框的最大宽度 */
  margin-left: 20px;
}

.search-input {
  flex-grow: 1;
  max-width: 100%; /* 确保输入框不会超过其容器的宽度 */
}
</style>
