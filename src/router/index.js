import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login')},
  {
    path: '/', component: () => import('@/views/layout'), children: [
      { path: '/home', component: () => import('../views/page/home.vue') },
      { path: '/my', component: () => import('../views/page/my.vue')},
      { path: '/qa', component: () => import('../views/page/qa.vue')},
      { path: '/video', component: () => import('../views/page/video.vue')},
    ]
  },
  { path: '/search', component: () => import('../views/search/index.vue') },
  { path: '/article/:articleId', component: () => import('@/views/article'), props: true },
  { path: '/my/index', component: () => import('../views/user/index.vue'), }
]

const router = new VueRouter({
  routes
})

export default router
