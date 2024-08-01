import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'properties',
          name: 'admin-properties',
          component: () => import('@/views/admin/AdminView.vue')
        },
        {
          path: 'new',
          name: 'new-properties',
          component: () => import('@/views/admin/NewPropertyView.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit-properties',
          component: () => import('@/views/admin/EditPropertyView.vue')
        },
      ]
    }
  ]
})

export default router
