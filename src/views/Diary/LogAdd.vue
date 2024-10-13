<template>
  <div>
    <el-form
      @submit.native.prevent="saveLog"
      ref="form"
      :model="log"
      label-width="120px"
    >
      <el-form-item label="日志主题">
        <el-input v-model="log.title"></el-input>
      </el-form-item>
      <el-form-item label="日志分类">
        <el-select v-model="log.list" placeholder="请选择日志类型">
          <el-option label="前端" value="front"></el-option>
          <el-option label="后端" value="backend"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日志内容">
        <el-input
          v-model="log.description"
          placeholder="字数十字以内"
        ></el-input>
      </el-form-item>
      <!-- 上传图片 -->

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" native-type="submit">立即提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章
      log: {
        title: "",
        description: "",
        list: "",
      },
    };
  },
  methods: {
    // 图片

    // 上传文章
    saveLog() {
      // 定义分类映射关系
      const categoryMapping = {
        front: "前端",
        backend: "后端",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.log.list;
      this.log.list = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存文章
      this.$http.post("logs", this.log).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 跳转到文章索引页面
        this.$router.push("/logs/index");
      });
    },
  },
};
</script>
