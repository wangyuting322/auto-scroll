import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ContentAutoScrollTest from '../views/ContentAutoScrollTest.vue'
import ContentAutoScrollTest2 from '../views/ContentAutoScrollTest2.vue'
import ContentAutoScrollTest3 from '../views/ContentAutoScrollTest3.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contentAutoScrollTest',
    name: 'ContentAutoScrollTest',
    component: ContentAutoScrollTest
  },
  {
    path: '/contentAutoScrollTest2',
    name: 'ContentAutoScrollTest2',
    component: ContentAutoScrollTest2
  },
  {
    path: '/ContentAutoScrollTest3',
    name: 'ContentAutoScrollTest3',
    component: ContentAutoScrollTest3
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
