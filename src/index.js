import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/inicio'
  },

    {
      path: '/inicio',
      name: 'Inicio',
      component: () => import('./views/Inicio.vue') // ✅ ruta y nombre corregido


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
  },
  {
    path: '/retro',
    name: 'CruzarRetro',
    component: () => import('./views/CruzarRetro.vue') // 👈 Nueva ruta
  },
  {
    path: '/ghost',
    name: 'GhostNGoblins',
    component: () => import('./views/GhostNGoblins.vue') // 👈 Nueva ruta
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue')
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
