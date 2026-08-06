<!-- SkillMeterList — segmented "level meter" pips instead of a continuous bar.
     Alternate visual form to the horizontal bar list, used by SkillsSection so
     cards on the same screen don't all render the identical chart shape. -->
<script setup lang="ts">
import type { Skill } from '@/data/skills'

defineProps<{ skills: Skill[] }>()

const SEGMENTS = 10
const filledCount = (level: number) => Math.round((level / 100) * SEGMENTS)
</script>

<template>
  <div class="meter-list" v-reveal>
    <div v-for="s in skills" :key="s.name" class="meter-row">
      <div class="meter-top">
        <span class="meter-label">{{ s.name }}</span>
        <span class="meter-pct">{{ s.level }}%</span>
      </div>
      <div class="meter-track" role="img" :aria-label="`${s.name}: ${s.level}%`">
        <span
          v-for="n in SEGMENTS"
          :key="n"
          class="meter-pip"
          :class="{ filled: n <= filledCount(s.level) }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.meter-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.meter-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.86rem;
  margin-bottom: 5px;
}
.meter-label {
  color: var(--text-dim);
  font-weight: 500;
}
.meter-pct {
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}
.meter-track {
  display: flex;
  gap: 3px;
  transform-origin: left;
  /* Zero-width until scrolled into view — same gating convention as the
     bar-chart variants (grown, not faded, so it reads as a "level" filling in). */
  transform: scaleX(0);
}
.meter-list.is-visible .meter-track {
  animation: grow 0.9s var(--ease) both;
}
@keyframes grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
.meter-pip {
  flex: 1;
  height: 8px;
  border-radius: 2px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
}
.meter-pip.filled {
  background: var(--accent);
  border-color: var(--accent);
}
</style>
