import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/inicio' // redirige a la página de inicio
  },
  {
    path: '/inicio',
    name: 'InicioMenu',
    component: () => import('./components/InicioMenu.vue')
  },
  {
    path: '/cruzar-rio',
    name: 'CruzarRio',
    component: () => import('./components/CruzarRio.vue')
  },
  {
    path: '/cubo3d',
    name: 'Cubo3D',
    component: () => import('./components/Cubo3D.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
