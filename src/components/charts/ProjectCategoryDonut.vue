<!-- ProjectCategoryDonut — projects grouped by category, part-to-whole. -->
<script setup lang="ts">
import { computed } from 'vue'
import { projects, type ProjectCategory } from '@/data/projects'
import { CATEGORY_COLORS } from './categoryColors'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 220 })

const total = computed(() => projects.length)
const RADIUS = computed(() => props.size * 0.38)
const STROKE = computed(() => props.size * 0.16)
const CIRC = computed(() => 2 * Math.PI * RADIUS.value)
const GAP = 3

const segments = computed(() => {
  const counts = new Map<ProjectCategory, number>()
  for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  const ordered = Array.from(counts.entries())
    .map(([category, count]) => ({ category, count, color: CATEGORY_COLORS[category] }))
    .sort((a, b) => b.count - a.count)

  let offset = 0
  return ordered.map((c) => {
    const length = (c.count / total.value) * CIRC.value
    const seg = { ...c, offset, length, pct: Math.round((c.count / total.value) * 100) }
    offset += length
    return seg
  })
})
</script>

<template>
  <div class="donut-wrap">
    <svg :viewBox="`0 0 ${size} ${size}`" class="donut-svg" role="img" aria-label="Projects by category donut chart">
      <g :transform="`rotate(-90 ${size / 2} ${size / 2})`">
        <circle
          v-for="s in segments"
          :key="s.category"
          :cx="size / 2"
          :cy="size / 2"
          :r="RADIUS"
          fill="none"
          :stroke="s.color"
          :stroke-width="STROKE"
          :stroke-dasharray="`${Math.max(s.length - GAP, 0)} ${CIRC - Math.max(s.length - GAP, 0)}`"
          :stroke-dashoffset="-(s.offset + GAP / 2)"
        />
      </g>
      <text :x="size / 2" :y="size / 2 - 4" text-anchor="middle" class="donut-total">{{ total }}</text>
      <text :x="size / 2" :y="size / 2 + 16" text-anchor="middle" class="donut-total-label">projects</text>
    </svg>
    <ul class="donut-legend">
      <li v-for="s in segments" :key="s.category">
        <span class="dot" :style="{ background: s.color }" />
        {{ s.category }} <b>{{ s.count }} · {{ s.pct }}%</b>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.donut-wrap {
  display: flex;
  align-items: center;
  gap: var(--sp-6);
  flex-wrap: wrap;
  justify-content: center;
}
.donut-svg {
  width: 100%;
  max-width: 220px;
  height: auto;
  flex-shrink: 0;
}
.donut-total {
  font-size: 2rem;
  font-weight: 800;
  fill: var(--text);
}
.donut-total-label {
  font-size: 0.7rem;
  fill: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.donut-legend {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  list-style: none;
  font-size: 0.86rem;
  color: var(--text-dim);
}
.donut-legend li {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}
.donut-legend b {
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.78rem;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
