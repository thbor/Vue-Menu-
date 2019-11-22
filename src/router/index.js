import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

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
    component: ()=>import("../components/Table.vue")
  },
  {
    path: '/count',
    name: 'Count',
    component: ()=>import("../components/Count.vue")
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=>import("../components/nav/Home.vue")
  },
  {
    path: '/home12',
    name: 'Home12',
    component: ()=>import("../components/nav/Home12.vue")
  },

  {
    path: '/menu2',
    name: 'Menu2',
    component: ()=>import("../components/Menu2.vue")
  },
  {
    path: '/404',
    name: 'Error404',
    component: ()=>import("../components/Error404.vue")
  },
  {
    path: '/echart',
    name: 'Echart',
    component: ()=>import("../components/Echart.vue")
  },
  {
    path: '/form',
    name: 'Form',
    component: ()=>import("../components/Form.vue")
  },
  {
    path: '/cascader',
    name: 'Cascader',
    component: ()=>import("../components/Cascader.vue")
  },
  {
    path: '/echart2',
    name: 'Echart2',
    component: ()=>import("../components/Echart2.vue")
  },
  {
    path: '/tag',
    name: 'Tag',
    component: ()=>import("../components/Tag.vue")
  }
  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
