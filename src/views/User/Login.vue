<template>
  <el-form
    class="login_container"
    :model="login"
    status-icon
    :rules="rules"
    ref="login"
    label-width="70px"
  >
    <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
    <h3 class="login_title">用户登录</h3>
    <!-- prop对应rules里的键 -->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="login.username" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="login.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="margin-left: 30px; margin-top: 10px"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      // 登陆数据
      login: {
        username: "",
        password: "",
      },
      // 校验规则
      rules: {
        username: [
          { required: "true", message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: "true", message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
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
</style>
