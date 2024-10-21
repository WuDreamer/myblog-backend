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
      this.$http
        .put(`admin_users/${this.$route.params.id}`, this.model)
        .then(() => {
          this.$message({
            message: "用户修改成功",
            type: "success",
          });
          this.$router.push("/admin_users/index");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("修改用户失败");
        });
    },
    fetch() {
      this.$http
        .get(`admin_users/${this.$route.params.id}`)
        .then((res) => {
          this.model = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("获取用户失败");
        });
    },

    cancel() {
      this.$router.push("/admin_users/index");
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

<style></style>
