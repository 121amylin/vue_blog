import Vue from 'vue'
import VueRouter from 'vue-router'
import articlelist from '../components/articlelist.vue'
import add from '../components/add.vue'
import show from '../components/show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'articlelist',
    component: articlelist
  },
  {
    path: '/add',
    name: 'add',
    component: add
  },
  {
    path: '/articlelist/show/:id',
    name: 'show',
    component: show
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
