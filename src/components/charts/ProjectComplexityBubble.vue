<!-- ProjectComplexityBubble — project complexity over time: x = era (chronological), y = tech-stack size, bubble size = highlights documented, color = category. Adds a quantitative trend the plain timeline doesn't show. -->
<script setup lang="ts">
import { computed } from 'vue'
import { projects } from '@/data/projects'
import { CATEGORY_COLORS } from './categoryColors'

const eras = computed(() => {
  const seen = new Map<string, string>()
  for (const p of projects) seen.set(p.period, p.periodStart)
  return Array.from(seen.entries())
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([period]) => period)
})

const maxStack = computed(() => Math.max(...projects.map((p) => p.stack.length)))
const minStack = computed(() => Math.min(...projects.map((p) => p.stack.length)))
const maxHighlights = computed(() => Math.max(...projects.map((p) => p.highlights.length), 1))

const bubbles = computed(() => {
  const eraList = eras.value
  const bandWidth = 100 / eraList.length
  const seenPerEra = new Map<string, number>()

  return projects.map((p) => {
    const eraIdx = eraList.indexOf(p.period)
    const within = seenPerEra.get(p.period) ?? 0
    seenPerEra.set(p.period, within + 1)
    // Spread projects that share an era so same-era bubbles don't stack exactly.
    const jitter = ((within % 3) - 1) * (bandWidth * 0.24)

    const stackRange = maxStack.value - minStack.value || 1
    const xPct = eraIdx * bandWidth + bandWidth / 2 + jitter
    const yPct = 92 - ((p.stack.length - minStack.value) / stackRange) * 80
    const size = 16 + (p.highlights.length / maxHighlights.value) * 22

    return { ...p, xPct, yPct, size, color: CATEGORY_COLORS[p.category] }
  })
})
</script>

<template>
  <div class="bubble-chart">
    <div class="plot" role="img" aria-label="Project complexity over time: tech-stack size per project, grouped by era">
      <div
        v-for="b in bubbles"
        :key="b.id"
        class="bubble"
        :style="{
          left: b.xPct + '%',
          top: b.yPct + '%',
          width: b.size + 'px',
          height: b.size + 'px',
          background: b.color,
        }"
        :title="`${b.title} — ${b.stack.length} technologies, ${b.highlights.length} highlights`"
      />
    </div>
    <div class="axis-x">
      <span v-for="era in eras" :key="era" class="axis-tick">{{ era.split('·')[0].trim() }}</span>
    </div>
    <p class="axis-y-hint">Vertical position = number of technologies used · bubble size = highlights documented</p>
  </div>
</template>

<style scoped>
.bubble-chart {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.plot {
  position: relative;
  width: 100%;
  height: 220px;
  border-left: 1px solid var(--surface-border);
  border-bottom: 1px solid var(--surface-border);
  border-radius: 2px;
}
.bubble {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid var(--surface);
  transition: transform var(--dur-fast) var(--ease);
  cursor: pointer;
}
.bubble:hover {
  transform: translate(-50%, -50%) scale(1.15);
}
.axis-x {
  display: flex;
}
.axis-tick {
  flex: 1;
  text-align: center;
  font-size: 0.72rem;
  color: var(--text-faint);
  padding-top: 4px;
}
.axis-y-hint {
  font-size: 0.76rem;
  color: var(--text-faint);
  margin-top: 2px;
}
</style>
