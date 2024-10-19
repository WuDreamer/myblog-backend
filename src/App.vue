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
          <el-submenu index="0">
            <template slot="title"
              ><i class="el-icon-tickets"></i>内容管理</template
            >
            <el-menu-item index="/articles/index">文章管理</el-menu-item>
            <!-- <el-menu-item index="/resumes/index">简历内容</el-menu-item> -->
            <el-menu-item index="/resumes/add">编辑简历</el-menu-item>
            <el-menu-item index="/words/index">每日一句</el-menu-item>
          </el-submenu>
          <!-- 网站管理 -->
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-guide"></i>网站管理</template
            >
            <el-menu-item index="/logs/index">日志历程</el-menu-item>
            <el-menu-item index="/friends/index">友情链接</el-menu-item>
            <el-menu-item index="/links/index">学习网站</el-menu-item>
            <el-menu-item index="/friends/add">网站配置</el-menu-item>
          </el-submenu>
          <!-- 系统管理 -->
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-setting"></i>系统管理</template
            >
            <el-menu-item index="/users/index">用户管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 页面头部 -->
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
