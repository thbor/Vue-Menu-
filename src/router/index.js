import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Menu2 from '../components/Menu2.vue'
import Table from '../components/Table.vue'
import Count from '../components/Count.vue'
import Home from '../components/nav/Home.vue'
import Home12 from '../components/nav/Home12.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/count',
    name: 'Count',
    component: Count
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/home12',
    name: 'Home12',
    component: Home12
  },

  {
    path: '/menu2',
    name: 'Menu2',
    component: Menu2
  },
  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
