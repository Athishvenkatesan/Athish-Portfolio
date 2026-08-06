/**
 * useBackNav — "Back" button for full-page routes (project detail, analysis).
 * Restores the exact page/scroll position the user came from via browser
 * history; if there's no in-app history to go back to (direct link, refresh),
 * falls back to the home page top.
 */
import { useRouter } from 'vue-router'

export function useBackNav() {
  const router = useRouter()

  function goBack() {
    if (window.history.state?.back) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return { goBack }
}
