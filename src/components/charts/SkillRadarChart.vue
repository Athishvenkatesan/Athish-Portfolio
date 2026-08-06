<!-- SkillRadarChart — skill-category radar/hexagon. Reused by the Analysis page (full) and the chatbot (compact). -->
<script setup lang="ts">
import { computed } from 'vue'
import { skillGroups } from '@/data/skills'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = withDefaults(defineProps<{ size?: number; showLabels?: boolean }>(), {
  size: 340,
  showLabels: true,
})

const categoryStrength = computed(() =>
  skillGroups
    .map((g) => ({
      title: g.title,
      icon: g.icon,
      avg: Math.round(g.skills.reduce((sum, s) => sum + s.level, 0) / g.skills.length),
    }))
    .sort((a, b) => b.avg - a.avg),
)

const CENTER = computed(() => props.size / 2)
const MAX_R = computed(() => props.size * 0.32)
const LEVELS = [25, 50, 75, 100]

function point(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  const r = (value / 100) * MAX_R.value
  return { x: CENTER.value + r * Math.cos(angle), y: CENTER.value + r * Math.sin(angle) }
}

const gridPolygons = computed(() =>
  LEVELS.map((level) =>
    categoryStrength.value
      .map((_, i) => {
        const p = point(i, categoryStrength.value.length, level)
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
      })
      .join(' '),
  ),
)

const spokes = computed(() =>
  categoryStrength.value.map((_, i) => point(i, categoryStrength.value.length, 100)),
)

const dataPolygon = computed(() =>
  categoryStrength.value
    .map((c, i) => {
      const p = point(i, categoryStrength.value.length, c.avg)
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    .join(' '),
)

const dataPoints = computed(() =>
  categoryStrength.value.map((c, i) => ({ ...c, ...point(i, categoryStrength.value.length, c.avg) })),
)

const labels = computed(() =>
  categoryStrength.value.map((c, i) => {
    const p = point(i, categoryStrength.value.length, 134)
    return { ...c, leftPct: (p.x / props.size) * 100, topPct: (p.y / props.size) * 100 }
  }),
)
</script>

<template>
  <div class="radar-wrap" :style="{ maxWidth: size + 'px' }">
    <svg :viewBox="`0 0 ${size} ${size}`" class="radar-svg" role="img" aria-label="Skill category radar chart">
      <polygon v-for="(poly, i) in gridPolygons" :key="`grid-${i}`" :points="poly" class="radar-grid" />
      <line
        v-for="(s, i) in spokes"
        :key="`spoke-${i}`"
        :x1="CENTER"
        :y1="CENTER"
        :x2="s.x"
        :y2="s.y"
        class="radar-spoke"
      />
      <polygon :points="dataPolygon" class="radar-fill" />
      <polygon :points="dataPolygon" class="radar-stroke" />
      <circle v-for="p in dataPoints" :key="p.title" :cx="p.x" :cy="p.y" :r="showLabels ? 5 : 3.5" class="radar-dot" />
    </svg>
    <template v-if="showLabels">
      <span
        v-for="l in labels"
        :key="l.title"
        class="radar-label"
        :style="{ left: l.leftPct + '%', top: l.topPct + '%' }"
      >
        <AppIcon :name="l.icon" :size="14" />
        {{ l.title }}
        <b>{{ l.avg }}%</b>
      </span>
    </template>
  </div>
</template>

<style scoped>
.radar-wrap {
  position: relative;
  width: 100%;
  margin-inline: auto;
}
.radar-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
.radar-grid {
  fill: none;
  stroke: var(--surface-border);
  stroke-width: 1;
}
.radar-spoke {
  stroke: var(--surface-border);
  stroke-width: 1;
}
.radar-fill {
  fill: var(--accent);
  fill-opacity: 0.12;
  stroke: none;
}
.radar-stroke {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-linejoin: round;
}
.radar-dot {
  fill: var(--accent);
  stroke: var(--surface);
  stroke-width: 2;
  transform-box: fill-box;
  transform-origin: center;
  transition: transform var(--dur-fast) var(--ease);
}
.radar-dot:hover {
  transform: scale(1.4);
}
.radar-label {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-dim);
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
}
.radar-label b {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent);
  font-weight: 700;
}
@media (max-width: 640px) {
  .radar-label {
    font-size: 0.66rem;
  }
}
</style>
