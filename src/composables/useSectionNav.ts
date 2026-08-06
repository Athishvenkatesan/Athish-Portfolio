/**
 * useSectionNav — click a section anchor (#id) from anywhere in the app.
 * Plain `<a href="#id">` only works while already on `/`; from any other
 * route (e.g. /projects/:id) it just rewrites the URL hash with nothing to
 * scroll to. This routes home first, then scrolls, or scrolls directly.
 */
import { useRouter } from 'vue-router'

export function useSectionNav() {
  const router = useRouter()

  function goToSection(id: string) {
    if (router.currentRoute.value.path !== '/') {
      router.push({ path: '/', hash: `#${id}` })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { goToSection }
}
