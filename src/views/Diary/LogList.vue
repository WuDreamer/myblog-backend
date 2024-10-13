<template>
  <div>
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
/* 超出一行范围使用省略号 */
.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 省略号 */
}
</style>
