import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

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
      meta: { requiresAuth: true },
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

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const requiresAuth: boolean = to.matched.some(url => url.meta.requiresAuth)
  const authStore = useAuthStore()

  if(requiresAuth) {
    // Check if user is authenticated
    try {
      await authStore.authenticateUser()
      return next()
    } catch (error) {
      console.log(error)
      return next({ name: 'login' })
    }
  }
  
  // Route does not requires authentication
  next()

})

export default router
