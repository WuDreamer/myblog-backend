<template>
  <el-form
    class="login_container"
    @submit.native.prevent="login"
    label-width="70px"
  >
    <h3 class="login_title">用户登录</h3>
    <el-form-item label="用户名">
      <el-input v-model="model.username"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input type="password" v-model="model.password"></el-input>
    </el-form-item>

    <el-form-item class="el_button">
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      // 登陆数据
      model: {},
    };
  },
  methods: {
    async login() {
      try {
        const res = await this.$http.post("login", this.model); // 确保这里的URL与你的后端API匹配
        sessionStorage.token = res.data.token; // 下次打开网站要重新登录
        localStorage.token = res.data.token; // 下次打开网站不需重新登录，即将信息保存
        this.$router.push("/"); // 登录成功后跳转到首页
        this.$message({
          type: "success",
          message: "欢迎管理员",
        });
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // 422 状态码通常用于处理验证错误，例如用户名不存在或密码错误
          if (error.response.data.message === "管理员不存在") {
            this.$message({
              type: "error",
              message: "用户名不存在",
            });
          } else if (error.response.data.message === "密码错误") {
            this.$message({
              type: "error",
              message: "密码错误",
            });
          }
        } else {
          // 其他错误，可能是网络错误或服务器内部错误
          this.$message({
            type: "error",
            message: "登录请求失败，请稍后再试",
          });
        }
      }
    },
  },
};
</script>

<style>
.login_container {
  width: 350px;
  border: 1px solid #eaeaea;
  /* 居中 */
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  /* 让padding在width里面 */
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  color: #505458;
  /* 左右居中 */
  text-align: center;
  margin-bottom: 40px;
}

.el-input {
  width: 198px;
}

.el_button {
  margin-left: 30px;
  margin-top: 10px;
}
</style>
