<template>
  <div>
    <div class="friend-actions">
      <!-- 添加友链的入口 -->
      <el-button
        type="primary"
        class="add-friend-btn"
        @click="addFriend"
        icon="el-icon-edit"
      >
        添加友链</el-button
      >

      <!-- 搜索友链 -->
      <div class="search-section">
        <el-input
          class="search-input"
          placeholder="搜索友链"
          v-model="searchQuery"
          @keyup.enter="searchFriends"
        >
          <template slot="append">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchFriends"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
    </div>
    <!-- 友链表单部分 -->
    <el-table :data="friends">
      <el-table-column prop="site_ico" label="网站图标" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.site_ico }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="site_name" label="网站名称" width="150">
        <template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.site_name }}
          </div>
        </template></el-table-column
      >
      <el-table-column prop="site_content" label="网站描述" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.site_content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="site_address" label="网站地址" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.site_address }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="site_state" label="网站状态" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.site_state }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small"
            >编辑</el-button
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
      friends: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("friends").then((res) => {
        this.friends = res.data;
      });
    },
    addFriend() {
      this.$router.push("/friends/add"); // 跳转到添加友链的页面
    },
    searchFriends() {
      // 搜索逻辑已经在 computed 属性中处理
    },
    edit(id) {
      this.$router.push(`/friends/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`friends/${id}`).then(() => {
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
/* 超出一行范围使用省略号 */
.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 省略号 */
}
</style>
<style>
.friend-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-friend-btn {
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
