import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import STRvcr from '@/views/STRvcr.vue'
import AnnotSV from '@/views/AnnotSV.vue'
import Battenberg from '@/views/Battenberg.vue'
import ADOST from '@/views/ADOST.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/annotsv',
      name: 'annotsv',
      component: AnnotSV,
    },
    {
      path: '/strcvr',
      name: 'strcvr',
      component: STRvcr,
    },
    {
      path: '/battenberg',
      name: 'battenberg',
      component: Battenberg,
    },
    {
      path: '/test',
      name: 'sdas',
      component: ADOST,
    }
  ],
})

export default router
