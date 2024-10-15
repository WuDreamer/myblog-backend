import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home.vue'
import ArticleList from '../views/Article/ArticleList.vue'
import ArticleCreate from '../views/Article/ArticleCreate.vue'
import ArticleEdit from '../views/Article/ArticleEdit.vue'
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

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: '/index'
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
]

const router = new VueRouter({
  routes
})

export default router