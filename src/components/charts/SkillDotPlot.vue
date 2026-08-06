<!-- SkillDotPlot — a marker dot on a bare track per skill, instead of a filled
     bar/ring/meter. One of six distinct forms SkillsSection uses so no two
     cards on the page render the same chart shape. -->
<script setup lang="ts">
import type { Skill } from '@/data/skills'

defineProps<{ skills: Skill[] }>()
</script>

<template>
  <div class="dot-plot" v-reveal>
    <div v-for="s in skills" :key="s.name" class="dot-row">
      <div class="dot-top">
        <span class="dot-label">{{ s.name }}</span>
        <span class="dot-pct">{{ s.level }}%</span>
      </div>
      <div class="dot-track" role="img" :aria-label="`${s.name}: ${s.level}%`">
        <span class="dot-stem" :style="{ '--lvl': s.level + '%' }" />
        <span class="dot-marker" :style="{ '--lvl': s.level + '%' }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dot-plot {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.dot-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.86rem;
  margin-bottom: 10px;
}
.dot-label {
  color: var(--text-dim);
  font-weight: 500;
}
.dot-pct {
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}
.dot-track {
  position: relative;
  height: 2px;
  background: var(--chip-bg);
  border-radius: var(--r-pill);
}
.dot-stem {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  /* Zero-width until scrolled into view — explicit base/target rule pair
     (not an inline-style-once value), so the transition actually fires. */
  width: 0%;
  background: var(--accent);
  border-radius: var(--r-pill);
  transition: width 0.9s var(--ease);
}
.dot-plot.is-visible .dot-stem {
  width: var(--lvl);
}
.dot-marker {
  position: absolute;
  top: 50%;
  left: 0%;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--surface);
  transition: left 0.9s var(--ease);
}
.dot-plot.is-visible .dot-marker {
  left: var(--lvl);
}
</style>
