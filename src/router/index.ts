/** App router — home (single-page sections) + project detail pages. */
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('@/views/ProjectDetailView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to: RouteLocationNormalized, _from, savedPosition) {
    // Back/forward navigation — restore exactly where the user was.
    // Wait for the out-in route transition + layout so the target page has
    // its full height before we restore the scroll offset.
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(savedPosition), 320)
      })
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 70 }
    }
    return { top: 0 }
  },
})

export default router
