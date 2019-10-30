import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Menu from '../components/Menu.vue'
import Table from '../components/Table.vue'
import Count from '../components/Count.vue'
import Home from '../components/nav/Home.vue'
import Home12 from '../components/nav/Home12.vue'
Vue.use(VueRouter)

const routes = [
  
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
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
