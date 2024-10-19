import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home.vue'
import ArticleList from '../views/Article/ArticleList.vue'
import ArticleCreate from '../views/Article/ArticleCreate.vue'
import ArticleEdit from '../views/Article/ArticleEdit.vue'
import LoginPage from '../views/User/Login.vue'
import RegisterPage from '../views/User/Register.vue'
import UserList from '../views/User/UserList.vue'
import UserAdd from '../views/User/UserAdd.vue'
import UserEdit from '../views/User/UserEdit.vue'
import LogAdd from '../views/Diary/LogAdd.vue'
import LogEdit from '../views/Diary/LogEdit.vue'
import LogList from '../views/Diary/LogList.vue'
import ResumeList from '../views/Resume/ResumeList.vue'
import ResumeEdit from '../views/Resume/ResumeEdit.vue'
import ResumeAdd from '../views/Resume/ResumeAdd.vue'
import FriendAdd from '../views/FriendLink/FriendLinkAdd.vue'
import FriendEdit from '../views/FriendLink/FriendLinkEdit.vue'
import FriendList from '../views/FriendLink/FriendLinkList.vue'
import LinkAdd from '../views/ToolLink/LinkAdd.vue'
import LinkEdit from '../views/ToolLink/LinkEdit.vue'
import LinkList from '../views/ToolLink/LinkList.vue'
import WordAdd from '../views/Sentence/WordsAdd.vue'
import WordEdit from '../views/Sentence/WordsEdit.vue'
import WordList from '../views/Sentence/WordsList.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'home',
    component: HomePage
  },
  // 内容管理路由模块
  {
    path: '/articles/create',
    name: 'article-create',
    component: ArticleCreate
  },
  {
    path: '/articles/index',
    name: 'article-index',
    component: ArticleList
  },
  {
    path: '/articles/:id/edit',
    name: 'article-edit',
    component: ArticleEdit
  },

  // 用户管理路由模块
  {
    path: '/users/index',
    name: 'user-index',
    component: UserList
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register-page',
    component: RegisterPage
  },
  {
    path: '/users/add',
    name: 'user-add',
    component: UserAdd
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: UserEdit
  },
  // 归档管理路由模块
  {
    path: '/logs/index',
    name: 'logs-index',
    component: LogList
  },
  {
    path: '/logs/add',
    name: 'logs-add',
    component: LogAdd
  },
  {
    path: '/logs/:id/edit',
    name: 'logs-edit',
    component: LogEdit
  },
  // 简历管理路由模块
  {
    path: '/resumes/index',
    name: 'resume-index',
    component: ResumeList
  },
  {
    path: '/resumes/:id/edit',
    name: 'resume-edit',
    component: ResumeEdit
  },
  {
    path: '/resumes/add',
    name: 'resume-add',
    component: ResumeAdd
  },
  // 友链管理路由模块
  {
    path: '/friends/index',
    name: 'friend-index',
    component: FriendList
  },
  {
    path: '/friends/:id/edit',
    name: 'friend-edit',
    component: FriendEdit
  },
  {
    path: '/friends/add',
    name: 'friend-add',
    component: FriendAdd
  },

  // 学习链接管理路由模块
  {
    path: '/links/index',
    name: 'link-index',
    component: LinkList
  },
  {
    path: '/links/:id/edit',
    name: 'link-edit',
    component: LinkEdit
  },
  {
    path: '/links/add',
    name: 'link-add',
    component: LinkAdd
  },
  // 学习链接管理路由模块
  {
    path: '/words/index',
    name: 'word-index',
    component: WordList
  },
  {
    path: '/words/:id/edit',
    name: 'word-edit',
    component: WordEdit
  },
  {
    path: '/words/add',
    name: 'word-add',
    component: WordAdd
  },
]




const router = new VueRouter({
  routes
})

export default router