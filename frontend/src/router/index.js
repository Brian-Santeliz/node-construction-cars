import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/crear',
    name: 'Crear',
    component: () => import('../views/Crear.vue')
  },
  {
    path: '/carroceria',
    name: 'Carroceria',
    component: () => import('../views/Carroceria.vue')
  },
  {
    path: '/transmision',
    name: 'Transmision',
    component: () => import('../views/Transmision.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
