<template>
  <div>
    <div class="log-actions">
      <!-- 添加日志的入口 -->
      <el-button
        type="primary"
        class="add-log-btn"
        @click="addLog"
        icon="el-icon-edit"
      >
        添加日志</el-button
      >

      <!-- 搜索日志 -->
      <div class="search-section">
        <el-input
          class="search-input"
          placeholder="搜索日志"
          v-model="searchQuery"
          @keyup.enter="searchLogs"
        >
          <template slot="append">
            <el-button type="primary" icon="el-icon-search" @click="searchLogs"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
    </div>
    <!-- 日志表格部分 -->
    <el-table :data="logs">
      <el-table-column prop="title" label="日志主题" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="日志内容" width="150">
        <template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.description }}
          </div>
        </template></el-table-column
      >
      <el-table-column prop="list" label="分类"> </el-table-column>
      <el-table-column prop="time" label="时间" width="220"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="read(scope.row._id)" type="text" size="small"
            >查看</el-button
          >
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
      logs: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("logs").then((res) => {
        this.logs = res.data;
      });
    },
    addLog() {
      this.$router.push("/logs/add"); // 跳转到添加日志的页面
    },
    searchLogs() {
      // 搜索逻辑已经在 computed 属性中处理
    },
    read() {},
    edit(id) {
      this.$router.push(`/logs/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`logs/${id}`).then(() => {
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
.log-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-log-btn {
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

/* 超出一行范围使用省略号 */
.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 省略号 */
}
</style>
