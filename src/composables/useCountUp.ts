/**
 * useCountUp — animates the numeric part of a label from 0 to its target,
 * preserving any surrounding text (e.g. "9.1", "2+", "10y", "CGPA 9.1").
 * Honors prefers-reduced-motion by rendering the final value immediately.
 */
import { ref, onMounted, type Ref } from 'vue'

export function useCountUp(target: string, durationMs = 1100): Ref<string> {
  const display = ref(target)
  const match = target.match(/\d+(?:\.\d+)?/)

  onMounted(() => {
    if (!match || typeof requestAnimationFrame === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const full = match[0]
    const end = parseFloat(full)
    const decimals = full.includes('.') ? full.split('.')[1].length : 0
    const before = target.slice(0, match.index)
    const after = target.slice((match.index ?? 0) + full.length)
    const frame = (val: number) => `${before}${val.toFixed(decimals)}${after}`

    let startTs: number | null = null
    display.value = frame(0)

    const step = (ts: number) => {
      if (startTs === null) startTs = ts
      const p = Math.min((ts - startTs) / durationMs, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      display.value = p < 1 ? frame(end * eased) : target
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })

  return display
}
