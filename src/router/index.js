import { createRouter, createWebHistory } from 'vue-router'
import VehicleList from '@/components/VehicleList.vue'
import RouteHistory from '@/components/RouteHistory.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView },
  { path: '/vehicles', component: VehicleList },
  { path: '/vehicle/:id/history', component: RouteHistory }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
