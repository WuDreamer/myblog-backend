<template>
  <div>
    <el-form
      @submit.native.prevent="saveFriend"
      ref="form"
      :model="friend"
      label-width="120px"
    >
      <el-form-item label="网站名称">
        <el-input v-model="friend.site_name"></el-input>
      </el-form-item>
      <el-form-item label="网站描述">
        <el-input v-model="friend.site_content"></el-input>
      </el-form-item>
      <el-form-item label="网站地址">
        <el-input v-model="friend.site_address"></el-input>
      </el-form-item>
      <el-form-item label="网站状态">
        <el-select v-model="friend.site_state" placeholder="请选择网站状态">
          <el-option label="正常" value="success"></el-option>
          <el-option label="异常" value="error"></el-option>
        </el-select>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="网站图标">
        <el-upload
          class="avatar-uploader"
          :action="`http://localhost:3001/api` + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="friend.site_ico" :src="friend.site_ico" class="avatar" />
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
      friend: {},
    };
  },
  methods: {
    // 图片url赋值给friend的site_ico
    afterUpload(res) {
      // this.user赋值主体    'image'赋值的属性
      this.$set(this.friend, "site_ico", res.url);
    },
    // 上传文章
    saveFriend() {
      // 定义分类映射关系
      const categoryMapping = {
        success: "正常",
        error: "异常",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.friend.site_state;
      this.friend.site_state =
        categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存文章
      this.$http.post("friends", this.friend).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 跳转到文章索引页面
        this.$router.push("/friends/index");
      });
    },
    // 取消上传
    cancel() {
      this.$router.push("/logs/index");
    },
  },
};
</script>

、
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
