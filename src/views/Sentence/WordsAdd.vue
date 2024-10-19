<template>
  <div>
    <el-form
      @submit.native.prevent="saveWord"
      ref="form"
      :model="word"
      label-width="120px"
    >
      <el-form-item label="句子">
        <el-input v-model="word.phrase" placeholder="字数十字以内"></el-input>
      </el-form-item>
      <!-- 上传图片 -->

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" native-type="submit">立即提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章
      word: {},
    };
  },
  methods: {
    // 图片

    // 上传文章
    saveWord() {
      // 发送 POST 请求到后端，保存文章
      this.$http.post("words", this.word).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 跳转到文章索引页面
        this.$router.push("/words/index");
      });
    },
    // 取消上传
    cancel() {
      this.$router.push("/words/index");
    },
  },
};
</script>
