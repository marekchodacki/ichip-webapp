import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import LocationView from '@/views/LocationView.vue'
import HowToSendDeviceView from '@/views/HowToSendDeviceView.vue'
import ServicePriceList from '@/views/ServicePriceList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/zglos-naprawe',
      name: 'report-repair',
      component: () => import('@/views/ReportRepairView.vue'),
    },
    {
      path: '/o-nas',
      name: 'about-us',
      component: AboutView,
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/jak-dojechac',
      name: 'location',
      component: LocationView
    },
    {
      path: '/jak-przeslac-urzadzenie',
      name: 'how-to-send-device',
      component: HowToSendDeviceView
    },
    
    { path: '/cennik-uslug',
      name: 'service-price-list',
      component: ServicePriceList
    },
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0, behavior: 'smooth' }), 100)
    })
  }
})

export default router
