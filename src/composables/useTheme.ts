/**
 * useTheme — light/dark theme controller.
 * The app owns its theme (no OS auto-switch); persisted to localStorage.
 */
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'
const theme = ref<Theme>(readInitial())

function readInitial(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  return saved === 'light' || saved === 'dark' ? saved : 'dark'
}

function apply(value: Theme): void {
  document.documentElement.setAttribute('data-theme', value)
}

watch(theme, (value) => {
  apply(value)
  localStorage.setItem(STORAGE_KEY, value)
})

export function useTheme() {
  apply(theme.value)
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
