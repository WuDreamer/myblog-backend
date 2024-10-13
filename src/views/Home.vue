<template>
  <div id="app" class="app-container">
    <el-container>
      <el-main class="app-main">
        <el-row :gutter="20">
          <el-col :span="18">
            <!-- 轮播图 -->
            <el-carousel interval="4000" arrow="always" height="300px">
              <el-carousel-item v-for="item in carouselItems" :key="item">
                <div
                  class="carousel-item"
                  :style="{
                    background: `url('${item}') no-repeat center center / cover`,
                  }"
                ></div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="6">
            <!-- 网站介绍 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>网站介绍</span>
              </div>
              <div>
                <p>博客系统是一个基于Vue.js和Element UI构建的后台管理系统。</p>
                <p>提供文章管理、用户管理和数据统计等功能。</p>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="stats-row">
          <el-row :gutter="20" class="creator-info">
            <el-col :span="24">
              <!-- 网站创造者介绍 -->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>网站创造者</span>
                </div>
                <div class="creator-content">
                  <div class="avatar">
                    <img src="@/assets/pic4.jpg" alt="Creator" />
                  </div>
                  <div class="details">
                    <h3>张三</h3>
                    <p>前端开发者，热爱编程和设计。</p>
                    <p>联系方式: zhangsan@example.com</p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-col :span="8" v-for="data in stats" :key="data.title">
            <!-- 数据展示 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <i :class="icons[data.title]"></i>
                <span>{{ data.title }}</span>
              </div>
              <div style="text-align: center">
                <h2>{{ data.count }}</h2>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      carouselItems: [
        require("@/assets/pic2.jpg"),
        require("@/assets/pic3.jpg"),
        require("@/assets/pic4.jpg"),
      ],
      icons: {
        文章数量: "el-icon-document",
        用户数量: "el-icon-user",
        访问量: "el-icon-view",
      },
      articleCount: 120,
      userCount: 85,
      visitCount: 3400,
      stats: [
        { title: "文章数量", count: 120 },
        { title: "用户数量", count: 85 },
        { title: "访问量", count: 3400 },
      ],
    };
  },
};
</script>

<style>
html body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
.app-container {
  background-color: #f5f5f5;
}
.app-header {
  background-color: #3498db; /* Blue */
  color: #56ebc4;
  line-height: 60px;
  padding: 0 20px;
}
.user-info {
  text-align: right;
}
.carousel-item {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-title {
  color: rgb(109, 243, 209);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
}
.box-card {
  margin-bottom: 20px;
  background: #75f7e5;
}
.stats-row {
  margin-top: 20px;
}
.creator-info {
  margin-top: 20px;
}
.creator-content {
  display: flex;
  align-items: center;
}
.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}
.details h3 {
  margin: 0;
  padding: 0;
  font-size: 1.2em;
}
.details p {
  margin: 5px 0;
}
</style>
