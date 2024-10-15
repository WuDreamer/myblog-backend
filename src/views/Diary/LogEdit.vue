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
      log: {
        title: "",
        description: "",
        list: "",
      },
    };
  },
  methods: {
    saveLog() {
      // 定义分类映射关系
      const categoryMapping = {
        front: "前端",
        backend: "后端",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.log.list;
      this.log.list = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      this.$http
        .put(`logs/${this.$route.params.id}`, this.log)
        .then(() => {
          this.$message({
            message: "文章修改成功",
            type: "success",
          });
          this.$router.push("/logs/index");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("修改文章失败");
        });
    },
    fetch() {
      this.$http
        .get(`logs/${this.$route.params.id}`)
        .then((res) => {
          this.log = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("获取文章失败");
        });
    },

    cancel() {
      this.$router.push("/logs/index");
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
