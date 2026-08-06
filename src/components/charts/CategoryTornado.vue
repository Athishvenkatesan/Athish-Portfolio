<!-- CategoryTornado — each skill category's average vs. the overall average, diverging from a zero baseline. A distinct analytical angle from the radar: relative performance, not absolute shape. -->
<script setup lang="ts">
import { computed } from 'vue'
import { skillGroups } from '@/data/skills'

const overallAvg = computed(() => {
  const all = skillGroups.flatMap((g) => g.skills)
  return Math.round(all.reduce((sum, s) => sum + s.level, 0) / all.length)
})

const rows = computed(() => {
  const categoryAverages = skillGroups.map((g) => ({
    title: g.title,
    avg: Math.round(g.skills.reduce((sum, s) => sum + s.level, 0) / g.skills.length),
  }))
  const deltas = categoryAverages.map((c) => ({ ...c, delta: c.avg - overallAvg.value }))
  const maxDelta = Math.max(...deltas.map((d) => Math.abs(d.delta)), 1)
  return deltas.sort((a, b) => b.delta - a.delta).map((d) => ({ ...d, maxDelta }))
})
</script>

<template>
  <div class="tornado" role="img" :aria-label="`Category averages vs the overall average of ${overallAvg}%`">
    <p class="baseline-label">Overall average: <b>{{ overallAvg }}%</b></p>
    <div v-for="r in rows" :key="r.title" class="tornado-row">
      <span class="tornado-label">{{ r.title }}</span>
      <div class="tornado-track">
        <span class="tornado-zero" />
        <span
          class="tornado-bar"
          :class="{ negative: r.delta < 0 }"
          :style="{ width: (Math.abs(r.delta) / r.maxDelta) * 48 + '%' }"
        />
      </div>
      <span class="tornado-value" :class="{ negative: r.delta < 0 }">{{ r.delta > 0 ? '+' : '' }}{{ r.delta }}pt</span>
    </div>
  </div>
</template>

<style scoped>
.tornado {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.baseline-label {
  font-size: 0.82rem;
  color: var(--text-faint);
  margin-bottom: var(--sp-2);
}
.baseline-label b {
  color: var(--text-dim);
  font-family: var(--font-mono);
}
.tornado-row {
  display: grid;
  grid-template-columns: 200px 1fr 56px;
  align-items: center;
  gap: var(--sp-3);
}
.tornado-label {
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text-dim);
}
.tornado-track {
  position: relative;
  height: 14px;
}
.tornado-zero {
  position: absolute;
  left: 50%;
  top: -5px;
  bottom: -5px;
  width: 1px;
  background: var(--text-faint);
}
.tornado-bar {
  position: absolute;
  top: 0;
  height: 100%;
  left: 50%;
  background: var(--accent);
  border-radius: 0 4px 4px 0;
}
.tornado-bar.negative {
  left: auto;
  right: 50%;
  background: #d97706;
  border-radius: 4px 0 0 4px;
}
.tornado-value {
  font-size: 0.76rem;
  font-family: var(--font-mono);
  color: var(--accent);
  text-align: right;
}
.tornado-value.negative {
  color: #d97706;
}
@media (max-width: 640px) {
  .tornado-row {
    grid-template-columns: 110px 1fr 48px;
    gap: var(--sp-2);
  }
  .tornado-label {
    font-size: 0.76rem;
  }
}
</style>
