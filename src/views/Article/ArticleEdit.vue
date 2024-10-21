<template>
  <div>
    <el-form
      @submit.native.prevent="saveArticle"
      ref="form"
      :model="article"
      label-width="120px"
    >
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="article.list" placeholder="请选择文章类型">
          <el-option label="随笔" value="record"></el-option>
          <el-option label="学习" value="learn"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容">
        <!-- 富文本 -->
        <vue-editor
          v-model="article.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">修改成功</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      article: {},
    };
  },
  methods: {
    // 富文本编辑
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    saveArticle() {
      // 定义分类映射关系
      const categoryMapping = {
        record: "随笔",
        learn: "学习",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.article.list;
      this.article.list = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      this.$http
        .put(`articles/${this.$route.params.id}`, this.article)
        .then(() => {
          this.$message({
            message: "文章修改成功",
            type: "success",
          });
          this.$router.push("/articles/index");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("修改文章失败");
        });
    },
    fetch() {
      this.$http
        .get(`articles/${this.$route.params.id}`)
        .then((res) => {
          this.article = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("获取文章失败");
        });
    },

    cancel() {
      this.$router.push("/articles/index");
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetch();
    } else {
      console.error("未提供文章 ID");
      this.$message.error("未能加载文章");
    }
  },
};
</script>

<style>
/* 富文本编辑器样式 */
.ql-toolbar.ql-snow {
  border: 1px solid #ccc;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.ql-container.ql-snow {
  border: 1px solid #ccc;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
