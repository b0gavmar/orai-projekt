import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Időpontok',
      component: HomeView,
    },
    {
      path: '/idopontfoglalas/:idopont',
      name: 'idopont foglalas',
      component: () => import('../views/IdopontFoglalasView.vue'),
    },
  ],
})

export default router
