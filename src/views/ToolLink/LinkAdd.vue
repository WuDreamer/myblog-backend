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
    // 图片url赋值为
    afterUpload(res) {
      // this.link 赋值主体  'image'赋值的属性
      this.$set(this.link, "ico", res.url);
    },
    // 上传文章
    saveLink() {
      // 定义分类映射关系
      const categoryMapping = {
        success: "正常",
        error: "异常",
        learn: "学习工具",
        program: "编程工具",
      };

      // 将 link.list 替换成对应的中文名称
      const selectedCategory = this.link.state;
      this.link.state = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      const selectedType = this.link.type;
      this.link.type = categoryMapping[selectedType] || selectedType; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存网站
      this.$http.post("links", this.link).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 跳转到网站详情页面
        this.$router.push("/links/index");
      });
    },
    // 取消上传
    cancel() {
      this.$router.push("/links/index");
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 100px; /* 确保有足够的高度 */
  width: 100px; /* 确保有足够的宽度 */
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;

  color: #8c939d;
}

.avatar {
  width: 100px;

  height: 100px;

  display: block;
}
</style>
