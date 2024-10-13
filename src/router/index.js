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
]

const router = new VueRouter({
  routes
})

export default router