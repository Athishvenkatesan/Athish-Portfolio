/**
 * v-reveal — directive that adds `is-visible` when an element scrolls into view.
 * Pairs with the `.reveal` base class. One IntersectionObserver per element.
 */
import type { Directive } from 'vue'

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = binding.value
    if (typeof delay === 'number') {
      el.style.transitionDelay = `${delay}ms`
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
  },
}
