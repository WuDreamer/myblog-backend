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
      user: {
        image: "",
        nickname: "",
        email: "",
        list: "",
        introduce: "",
      },
    };
  },
  methods: {
    saveUser() {
      const categoryMapping = {
        manage: "管理员",
        public: "普通用户",
      };

      const selectedCategory = this.user.list;
      this.user.list = categoryMapping[selectedCategory] || selectedCategory;

      this.$http.post("users", this.user).then(() => {
        this.$message({
          title: "成功",
          message: "用户创建成功",
          type: "success",
        });
        this.$router.push("/users/index");
      });
    },
  },
};
</script>
