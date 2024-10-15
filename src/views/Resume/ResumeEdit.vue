<template>
  <div>
    <el-form
      @submit.native.prevent="saveResume"
      label-width="80px"
      ref="form"
      :model="resume"
    >
      <el-collapse style="margin-bottom: 20px">
        <!-- 背景信息 -->
        <el-collapse-item title="背景信息">
          <el-form ref="resumeForm" :model="resume" label-width="120px">
            <el-row>
              <!-- 左边的表单项 -->
              <el-col :span="10">
                <el-form-item label="名字">
                  <el-input
                    v-model="resume.name"
                    placeholder="请输入名字"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input
                    v-model="resume.contact"
                    placeholder="请输入联系方式"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input
                    v-model="resume.email"
                    placeholder="请输入电子邮箱"
                  ></el-input>
                </el-form-item>
                <el-form-item label="GitHub">
                  <el-input
                    v-model="resume.github"
                    placeholder="请输入GitHub账号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 右边的表单项 -->
              <el-col :span="10">
                <el-form-item label="学校名称">
                  <el-input
                    v-model="resume.school"
                    placeholder="请输入学校名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="所学专业">
                  <el-input
                    v-model="resume.major"
                    placeholder="请输入所学专业"
                  ></el-input>
                </el-form-item>
                <el-form-item label="入学年份">
                  <el-input
                    v-model="resume.entryYear"
                    placeholder="请输入入学年份"
                  ></el-input>
                </el-form-item>
                <el-form-item label="毕业年份">
                  <el-input
                    v-model="resume.graduationYear"
                    placeholder="请输入毕业年份"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <!-- 专业技能 -->
        <el-collapse-item title="专业技能">
          <el-form ref="resumeForm" :model="resume" label-width="120px">
            <el-row>
              <!-- 左边的表单项 -->
              <el-col :span="10">
                <el-form-item label="获奖证书">
                  <el-input
                    type="textarea"
                    v-model="resume.certificates"
                    placeholder="请输入证书名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 右边的表单项 -->
              <el-col :span="10">
                <el-form-item label="编程技术">
                  <el-input
                    type="textarea"
                    v-model="resume.skills"
                    placeholder="请输入编程技术"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <!-- 项目经历 -->
        <el-collapse-item title="项目经历">
          <el-form ref="resumeForm" :model="resume" label-width="120px">
            <el-row>
              <!-- 左边的表单项 -->
              <el-col :span="10">
                <el-form-item label="项目名称">
                  <el-input
                    v-model="resume.project_name"
                    placeholder="请输入项目名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="项目地址">
                  <el-input
                    v-model="resume.project_site"
                    placeholder="请输入项目网站"
                  ></el-input>
                </el-form-item>
                <el-form-item label="工作岗位">
                  <el-input
                    v-model="resume.project_job"
                    placeholder="请输入负责的岗位"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 右边的表单项 -->
              <el-col :span="10">
                <el-form-item label="启止时间">
                  <el-date-picker
                    v-model="resume.project_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="该技术栈">
                  <el-input
                    v-model="resume.project_skills"
                    placeholder="请输入技术栈"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="项目描述">
              <el-input
                type="textarea"
                v-model="resume.project_content"
                placeholder="请输入描述内容"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <!-- 工作经验 -->
        <el-collapse-item title="工作经验">
          <el-form ref="resumeForm" :model="resume" label-width="120px">
            <el-row>
              <!-- 左边的表单项 -->
              <el-col :span="10">
                <el-form-item label="公司名称">
                  <el-input
                    v-model="resume.firm_name"
                    placeholder="请输入公司名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="公司地址">
                  <el-input
                    v-model="resume.firm_address"
                    placeholder="请输入公司地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 右边的表单项 -->
              <el-col :span="10">
                <el-form-item label="启止时间">
                  <el-date-picker
                    v-model="resume.firm_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="工作职位">
                  <el-input
                    v-model="resume.firm_job"
                    placeholder="请输入职位"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="工作描述">
              <el-input
                type="textarea"
                v-model="resume.firm_content"
                placeholder="请输入描述内容"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <!-- 个人陈述 -->
        <el-collapse-item title="个人陈述">
          <el-form ref="resumeForm" :model="resume" label-width="120px">
            <el-form-item label="陈述内容">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                v-model="resume.statement"
                placeholder="请输入陈述内容"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" native-type="submit">保存修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 通过后端api获取简历内容
      resume: {},
      // 调用日期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    saveResume() {
      this.$http
        .put(`resumes/${this.$route.params.id}`, this.resume)
        .then(() => {
          this.$message({
            message: "文章修改成功",
            type: "success",
          });
          this.$router.push("/resumes/index");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("修改文章失败");
        });
    },
    fetch() {
      this.$http
        .get(`resumes/${this.$route.params.id}`)
        .then((res) => {
          this.resume = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("获取文章失败");
        });
    },

    cancel() {
      this.$router.push("/resumes/index");
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetch();
    } else {
      console.error("未提供文章 ID");
      this.$message.error("未能加载文章");
    }
  },
};
</script>
