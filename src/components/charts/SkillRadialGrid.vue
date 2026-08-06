<!-- SkillRadialGrid — a small grid of circular progress rings, one per skill.
     Alternate visual form to the horizontal bar list, used by SkillsSection so
     cards on the same screen don't all render the identical chart shape. -->
<script setup lang="ts">
import type { Skill } from '@/data/skills'

defineProps<{ skills: Skill[] }>()

const R = 30
const CIRC = 2 * Math.PI * R
</script>

<template>
  <div class="ring-grid" v-reveal>
    <div v-for="s in skills" :key="s.name" class="ring-cell">
      <svg viewBox="0 0 72 72" class="ring-svg" role="img" :aria-label="`${s.name}: ${s.level}%`">
        <circle class="ring-track" cx="36" cy="36" :r="R" />
        <circle
          class="ring-progress"
          cx="36"
          cy="36"
          :r="R"
          :style="{ '--circ': CIRC, '--offset': CIRC * (1 - s.level / 100) }"
        />
        <text x="36" y="40" class="ring-pct" text-anchor="middle">{{ s.level }}%</text>
      </svg>
      <span class="ring-label">{{ s.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.ring-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-4);
}
.ring-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}
.ring-svg {
  width: 72px;
  height: 72px;
  transform: rotate(-90deg);
}
.ring-track {
  fill: none;
  stroke: var(--chip-bg);
  stroke-width: 6;
}
.ring-progress {
  fill: none;
  stroke: var(--accent);
  stroke-width: 6;
  stroke-linecap: round;
  /* Sits at zero progress (full offset) until scrolled into view, same
     gating convention as the bar-chart variants — no first-paint transition. */
  stroke-dasharray: var(--circ);
  stroke-dashoffset: var(--circ);
  transition: stroke-dashoffset 1.1s var(--ease);
}
.ring-grid.is-visible .ring-progress {
  stroke-dashoffset: var(--offset);
}
.ring-pct {
  transform: rotate(90deg);
  transform-box: fill-box;
  transform-origin: center;
  fill: var(--text);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
}
.ring-label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-dim);
  line-height: 1.3;
}
</style>
