import { createRouter, createWebHistory } from 'vue-router'
import ScaRiance from '@/views/ScaRiance.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ScaRiance,
    },
  ],
})

export default router
