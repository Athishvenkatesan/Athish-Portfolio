<!-- SkillBoxPlot — spread (min/median/max) of skill levels *within* each category — complements the radar's per-category averages with variance. -->
<script setup lang="ts">
import { computed } from 'vue'
import { skillGroups } from '@/data/skills'

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base]
}

const boxes = computed(() =>
  skillGroups
    .map((g) => {
      const sorted = g.skills.map((s) => s.level).sort((a, b) => a - b)
      return {
        title: g.title,
        min: sorted[0],
        q1: quantile(sorted, 0.25),
        median: quantile(sorted, 0.5),
        q3: quantile(sorted, 0.75),
        max: sorted[sorted.length - 1],
      }
    })
    .sort((a, b) => b.median - a.median),
)
</script>

<template>
  <div class="boxplot" role="img" aria-label="Box plot of skill-level spread within each category">
    <div v-for="b in boxes" :key="b.title" class="box-row">
      <span class="box-label">{{ b.title }}</span>
      <div class="box-axis">
        <div class="whisker" :style="{ left: b.min + '%', width: b.max - b.min + '%' }" />
        <div class="box" :style="{ left: b.q1 + '%', width: b.q3 - b.q1 + '%' }" />
        <div class="median" :style="{ left: b.median + '%' }" />
      </div>
      <span class="box-range">{{ Math.round(b.min) }}–{{ Math.round(b.max) }}%</span>
    </div>
  </div>
</template>

<style scoped>
.boxplot {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}
.box-row {
  display: grid;
  grid-template-columns: 200px 1fr 64px;
  align-items: center;
  gap: var(--sp-3);
}
.box-label {
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text-dim);
}
.box-axis {
  position: relative;
  height: 20px;
}
.whisker {
  position: absolute;
  top: 50%;
  height: 1px;
  background: var(--text-faint);
  transform: translateY(-50%);
}
.whisker::before,
.whisker::after {
  content: '';
  position: absolute;
  top: -4px;
  bottom: -4px;
  width: 1px;
  background: var(--text-faint);
}
.whisker::before {
  left: 0;
}
.whisker::after {
  right: 0;
}
.box {
  position: absolute;
  top: 1px;
  bottom: 1px;
  background: var(--accent);
  opacity: 0.28;
  border: 1px solid var(--accent);
  border-radius: 3px;
}
.median {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
}
.box-range {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-faint);
  text-align: right;
}
@media (max-width: 640px) {
  .box-row {
    grid-template-columns: 110px 1fr 52px;
    gap: var(--sp-2);
  }
  .box-label {
    font-size: 0.76rem;
  }
}
</style>
