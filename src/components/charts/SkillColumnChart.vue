<!-- SkillColumnChart — vertical (column) bars instead of horizontal ones. One
     of six distinct forms SkillsSection uses so no two cards look alike. -->
<script setup lang="ts">
import type { Skill } from '@/data/skills'

defineProps<{ skills: Skill[] }>()
</script>

<template>
  <div class="col-chart" v-reveal>
    <div v-for="s in skills" :key="s.name" class="col-cell">
      <span class="col-pct">{{ s.level }}%</span>
      <div class="col-track">
        <span class="col-fill" :style="{ height: s.level + '%' }" />
      </div>
      <span class="col-label">{{ s.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.col-chart {
  display: flex;
  align-items: stretch;
  gap: var(--sp-3);
  height: 190px;
}
.col-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.col-pct {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--text-dim);
}
.col-track {
  flex: 1;
  width: 100%;
  max-width: 34px;
  display: flex;
  align-items: flex-end;
  border-radius: var(--r-sm);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  overflow: hidden;
}
.col-fill {
  display: block;
  width: 100%;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
  background: var(--accent);
  /* Height is data-driven inline style (set once) — a transition on `height`
     never fires on first paint, so scale it in on the transform axis instead,
     gated on scroll-reveal (same fix as SkillHistogram on the Analysis page). */
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.7s var(--ease);
}
.col-chart.is-visible .col-fill {
  transform: scaleY(1);
}
.col-label {
  font-size: 0.72rem;
  color: var(--text-faint);
  text-align: center;
  line-height: 1.25;
}
</style>
