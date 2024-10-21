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

      <!-- 提交按钮 -->
      <el-form-item style="padding-top: 100px">
        <el-button type="primary" native-type="submit">立即提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  data() {
    return {
      // 文章
      article: {},
    };
  },
  methods: {
    // 富文本编辑
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    // 上传文章
    saveArticle() {
      // 定义分类映射关系
      const categoryMapping = {
        record: "随笔",
        learn: "学习",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.article.list;
      this.article.list = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存文章
      this.$http.post("articles", this.article).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 跳转到文章索引页面
        this.$router.push("/articles/index");
      });
    },
    // 取消上传
    cancel() {
      this.$router.push("/articles/index");
    },

    // 失去焦点事件
    onEditorBlur() {},
    // 获得焦点事件
    onEditorFocus() {},
    // 准备编辑器
    onEditorReady() {},
    // 内容改变事件
    onEditorChange() {},
  },
  watch: {
    // 监听文本变化内容
    content() {
      console.log(this.content);
    },
  },
};
</script>
