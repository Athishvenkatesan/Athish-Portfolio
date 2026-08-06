/**
 * useScrollDirection — true while the page is actively being scrolled down.
 * Used to tuck away floating widgets (WhatsApp/chat FABs) that would
 * otherwise sit fixed on top of whatever content scrolls underneath them —
 * most noticeable on short mobile viewports. Reveals again on scroll-up or
 * shortly after scrolling settles, so the buttons stay reachable.
 */
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollDirection() {
  const hidden = ref(false)
  let lastY = 0
  let settleTimer: ReturnType<typeof setTimeout> | null = null

  function onScroll() {
    const y = window.scrollY
    if (y > lastY + 4 && y > 80) {
      hidden.value = true
    } else if (y < lastY - 4) {
      hidden.value = false
    }
    lastY = y

    if (settleTimer) clearTimeout(settleTimer)
    settleTimer = setTimeout(() => {
      hidden.value = false
    }, 500)
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (settleTimer) clearTimeout(settleTimer)
  })

  return { hidden }
}
