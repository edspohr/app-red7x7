import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import { useMainStore } from '@/stores/mainStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'auth', component: AuthView },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: (to, from, next) => {
        const store = useMainStore()
        if (store.currentUser && store.currentUser.id !== 'admin') {
          next()
        } else {
          next({ name: 'auth' })
        }
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      // 1. Añade este guardián para el admin
      beforeEnter: (to, from, next) => {
        const store = useMainStore()
        if (store.currentUser && store.currentUser.id === 'admin') {
          next() // Es el admin, permite el acceso
        } else {
          next({ name: 'auth' }) // No es el admin, redirige al login
        }
      },
    },
  ],
})

export default router
