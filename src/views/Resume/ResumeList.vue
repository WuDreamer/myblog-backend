<template>
  <div>
    <el-table :data="resumes">
      <el-table-column prop="title" label="背景信息" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="body" label="专业技能" width="200">
        <template slot-scope="scope">
          <div
            style="width: 150px"
            v-html="truncateHtml(scope.row.body, 10)"
          ></div> </template
      ></el-table-column>
      <el-table-column prop="list" label="项目经历"> </el-table-column>
      <el-table-column prop="image" label="个人陈述"> </el-table-column>
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
      resumes: [], // 注意这里是使用字典[]，使用{}不行
    };
  },
  methods: {
    // 截断 HTML 内容的方法
    truncateHtml(str, length) {
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = str;
      let truncatedText = tempDiv.textContent || tempDiv.innerText;
      if (truncatedText.length > length) {
        truncatedText = truncatedText.substring(0, length) + "...";
        // 重新将截断后的文本设置为 div 的内容
        tempDiv.innerHTML = truncatedText;
        // 返回截断后的 HTML
        return tempDiv.innerHTML;
      } else {
        return str;
      }
    },
    fetch() {
      this.$http.get("resumes").then((res) => {
        this.resumes = res.data;
      });
    },
    read() {},
    edit(id) {
      this.$router.push(`/resumes/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`resumes/${id}`).then(() => {
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
