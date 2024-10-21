<template>
  <div>
    <el-form
      @submit.native.prevent="saveAdmin"
      ref="form"
      :model="model"
      label-width="120px"
    >
      <el-form-item label="管理员">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password"></el-input>
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
      model: {},
    };
  },
  methods: {
    saveAdmin() {
      this.$http.post("admin_users", this.model).then(() => {
        this.$message({
          title: "成功",
          message: "用户创建成功",
          type: "success",
        });
        this.$router.push("/admin_users/index");
      });
    },
    // 取消上传
    cancel() {
      this.$router.push("/admin_users/index");
    },
  },
};
</script>

<style></style>
