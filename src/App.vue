<template>
  <div id="app">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['0', '1', '2', '3']">
          <!-- 首页 -->
          <el-menu-item index="/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 内容管理 -->
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-tickets"></i>内容管理</template
            >
            <el-menu-item index="/articles/index">文章列表</el-menu-item>
            <el-menu-item index="/articles/create">发布文章</el-menu-item>
          </el-submenu>
          <!-- 用户管理 -->
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-user"></i>用户管理</template
            >
            <el-menu-item index="/users/index">用户列表</el-menu-item>
            <el-menu-item index="/users/add">新增用户</el-menu-item>
          </el-submenu>
          <!-- 用户管理 -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-set-up"></i>日志管理</template
            >
            <el-menu-item index="/logs/index">日志列表</el-menu-item>
            <el-menu-item index="/logs/add">新增日志</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span v-for="user in users" :key="user._id">{{ user.nickname }}</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-left: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <!-- 显示路由页面 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return { users: [] };
  },
  created() {
    this.$http.get("users").then((res) => {
      this.users = res.data;
    });
  },
};
</script>

<style>
html body {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
