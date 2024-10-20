<template>
  <div>
    <el-form
      @submit.native.prevent="saveLink"
      ref="form"
      :model="link"
      label-width="120px"
    >
      <el-form-item label="网站名称">
        <el-input v-model="link.name"></el-input>
      </el-form-item>
      <el-form-item label="网站描述">
        <el-input v-model="link.content"></el-input>
      </el-form-item>
      <el-form-item label="网站地址">
        <el-input v-model="link.site"></el-input>
      </el-form-item>
      <el-form-item label="网站类型">
        <el-select v-model="link.type" placeholder="请选择类型">
          <el-option label="编程工具" value="program"></el-option>
          <el-option label="学习工具" value="learn"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网站状态">
        <el-select v-model="link.state" placeholder="请选择网站状态">
          <el-option label="正常" value="success"></el-option>
          <el-option label="异常" value="error"></el-option>
        </el-select>
      </el-form-item>
      <!-- 上传图标 -->
      <el-form-item label="网站图标">
        <el-upload
          class="avatar-uploader"
          :action="`http://localhost:3001/api` + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="link.ico" :src="link.ico" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      link: {},
    };
  },
  methods: {
    afterUpload(res) {
      // this.link赋值主体    'image'赋值的属性
      this.$set(this.link, "ico", res.url);
    },
    saveLink() {
      // 定义分类映射关系
      const categoryMapping = {
        success: "正常",
        error: "异常",
        learn: "学习工具",
        program: "编程工具",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.link.state;
      this.link.state = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      const selectedType = this.link.type;
      this.link.type = categoryMapping[selectedType] || selectedType; // 进行映射，如果没有匹配则保留原值

      this.$http
        .put(`links/${this.$route.params.id}`, this.link)
        .then(() => {
          this.$message({
            message: "文章修改成功",
            type: "success",
          });
          this.$router.push("/links/index");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("修改文章失败");
        });
    },
    fetch() {
      this.$http
        .get(`links/${this.$route.params.id}`)
        .then((res) => {
          this.link = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("获取文章失败");
        });
    },

    cancel() {
      this.$router.push("/links/index");
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
