<template>
  <div>
    <el-form
      @submit.native.prevent="saveWord"
      ref="form"
      :model="word"
      label-width="120px"
    >
      <el-form-item label="每日一句">
        <el-input v-model="word.phrase" placeholder="字数十字以内"></el-input>
      </el-form-item>
      <!-- 上传图片 -->

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" native-type="submit">保存修改</el-button>
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
    saveWord() {
      this.$http.put(`words/${this.$route.params.id}`, this.word).then(() => {
        this.$message({
          message: "句子修改成功",
          type: "success",
        });
        this.$router.push("/words/index");
      });
    },
    fetch() {
      this.$http.get(`words/${this.$route.params.id}`).then((res) => {
        this.word = res.data;
      });
    },

    cancel() {
      this.$router.push("/words/index");
    },
  },
  created() {
    this.fetch();
  },
};
</script>
