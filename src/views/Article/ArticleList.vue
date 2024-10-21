<template>
  <div>
    <div class="article-actions">
      <!-- 添加文章的入口 -->
      <el-button
        type="primary"
        class="add-article-btn"
        @click="addArticle"
        icon="el-icon-edit"
      >
        添加文章</el-button
      >

      <!-- 搜索文章 -->
      <div class="search-section">
        <el-input
          class="search-input"
          placeholder="搜索文章"
          v-model="searchQuery"
          @keyup.enter="searchArticles"
        >
          <template slot="append">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchArticles"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
    </div>
    <!-- 文章列表 -->
    <el-table :data="articles">
      <el-table-column prop="title" label="文章标题" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column class="ellipsis" prop="body" label="内容" width="200">
        <template slot-scope="scope">
          <div
            style="width: 150px"
            v-html="truncateHtml(scope.row.body, 10)"
          ></div> </template
      ></el-table-column>
      <el-table-column prop="list" label="分类"> </el-table-column>
      <el-table-column prop="image" label="图片"> </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
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
      articles: [],
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
      this.$http.get("articles").then((res) => {
        this.articles = res.data;
      });
    },
    addArticle() {
      this.$router.push("/articles/create"); // 跳转到添加文章的页面
    },
    searchArticles() {
      // 搜索逻辑已经在 computed 属性中处理
    },
    read() {},
    edit(id) {
      this.$router.push(`/articles/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`articles/${id}`).then(() => {
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
.article-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-article-btn {
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
