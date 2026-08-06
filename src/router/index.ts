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
    {
      path: '/analysis',
      name: 'analysis',
      component: () => import('@/views/AnalysisView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to: RouteLocationNormalized, _from, savedPosition) {
    // Back/forward navigation — restore exactly where the user was.
    // The out-in route transition takes ~300ms to leave before the target
    // page even mounts; wait past that (plus mount/layout) or the browser
    // clamps the restored scroll to whatever (shorter) height existed when
    // the timer fired, and never re-applies it once the page grows.
    // `behavior: 'auto'` does NOT override CSS — per spec it defers to
    // `scroll-behavior`, so the global `html { scroll-behavior: smooth }` would
    // still animate this into a slow scroll instead of an instant snap-back.
    // Neutralize it via inline style (higher specificity) for this one jump.
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const root = document.documentElement
          const prevBehavior = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'
          window.scrollTo(savedPosition.left ?? 0, savedPosition.top ?? 0)
          root.style.scrollBehavior = prevBehavior
          resolve(false)
        }, 500)
      })
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 70 }
    }
    return { top: 0 }
  },
})

export default router
