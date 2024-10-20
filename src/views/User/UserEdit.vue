<template>
  <div>
    <el-form
      @submit.native.prevent="saveUser"
      ref="form"
      :model="user"
      label-width="120px"
    >
      <el-form-item label="昵称">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          v-model="user.introduce"
          placeholder="字数十字以内"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="user.list" placeholder="请选择用户权限">
          <el-option label="管理员" value="manage"></el-option>
          <el-option label="普通用户" value="public"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="`http://localhost:3001/api` + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="user.image" :src="user.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      user: {},
    };
  },
  methods: {
    afterUpload(res) {
      // this.user赋值主体    'image'赋值的属性
      this.$set(this.user, "image", res.url);
    },
    saveUser() {
      // 定义分类映射关系
      const categoryMapping = {
        manage: "管理员",
        public: "普通用户",
      };

      // 将 article.list 替换成对应的中文名称
      const selectedCategory = this.user.list;
      this.user.list = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      this.$http
        .put(`users/${this.$route.params.id}`, this.user)
        .then(() => {
          this.$message({
            message: "用户修改成功",
            type: "success",
          });
          this.$router.push("/users/index");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("修改用户失败");
        });
    },
    fetch() {
      this.$http
        .get(`users/${this.$route.params.id}`)
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("获取用户失败");
        });
    },

    cancel() {
      this.$router.push("/users/index");
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetch();
    } else {
      console.error("未提供用户 ID");
      this.$message.error("未能加载用户");
    }
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
