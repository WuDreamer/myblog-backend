<template>
  <div>
    <div class="friend-actions">
      <!-- 添加网站的入口 -->
      <el-button
        type="primary"
        class="add-link-btn"
        @click="addLink"
        icon="el-icon-edit"
      >
        添加网站</el-button
      >

      <!-- 搜索网站 -->
      <div class="search-section">
        <el-input
          class="search-input"
          placeholder="搜索网站"
          v-model="searchQuery"
          @keyup.enter="searchLinks"
        >
          <template slot="append">
            <el-button type="primary" icon="el-icon-search" @click="searchLinks"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
    </div>
    <!-- 友链表单部分 -->
    <el-table :data="links">
      <el-table-column prop="ico" label="网站图标" width="140">
        <template slot-scope="scope">
          <img class="image" :src="scope.row.ico" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="网站名称" width="150">
        <template slot-scope="scope">
          <div class="ellipsis" style="width: 50px">
            {{ scope.row.name }}
          </div>
        </template></el-table-column
      >
      <el-table-column prop="content" label="网站描述" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 100px">
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="site" label="网站地址" width="140"
        ><template slot-scope="scope">
          <div style="width: 100px">
            {{ scope.row.site }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="140"
        ><template slot-scope="scope">
          <div>
            {{ scope.row.type }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="140"
        ><template slot-scope="scope">
          <div style="width: 50px">
            {{ scope.row.state }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="time" label="时间" width="140"
        ><template slot-scope="scope">
          <div class="ellipsis" style="width: 150px">
            {{ scope.row.time }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row._id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("links").then((res) => {
        this.links = res.data;
      });
    },
    addLink() {
      this.$router.push("/links/add"); // 跳转到添加友链的页面
    },
    searchLinks() {
      // 搜索逻辑已经在 computed 属性中处理
    },
    edit(id) {
      this.$router.push(`/links/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`links/${id}`).then(() => {
        this.$message({
          message: "文章删除成功",
          type: "success",
        });
        this.fetch(); //删除之后，调用fetch()方法进行再次获取数据，即可实现刷新
      });
    },
  },
  // 获取真正的数据
  created() {
    this.fetch(); //调用fetch()方法进行获取数据
  },
};
</script>

<style>
.image {
  border-radius: 50%; /* 使头像变为圆形 */
  width: 3rem; /* 设置头像的宽度 */
  height: 3rem; /* 设置头像的高度 */
  object-fit: cover; /* 确保图片内容适应头像框 */
}

.friend-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-friend-btn {
  margin-right: 10px;
}

.search-section {
  display: flex;
  align-items: center;
  justify-content: center; /* 修改为居中对齐 */
  flex-grow: 1;
  max-width: 300px; /* 控制搜索框的最大宽度 */
  margin-left: 20px;
}

.search-input {
  flex-grow: 1;
  max-width: 100%; /* 确保输入框不会超过其容器的宽度 */
}

/* 超出一行范围使用省略号 */
.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 省略号 */
}
</style>
