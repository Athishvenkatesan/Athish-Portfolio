<!-- SkillHistogram — distribution of every individual skill's level into bands (spread, not per-category averages). -->
<script setup lang="ts">
import { computed } from 'vue'
import { skillGroups } from '@/data/skills'

const BANDS = [
  { label: '< 70%', min: 0, max: 69 },
  { label: '70–79%', min: 70, max: 79 },
  { label: '80–89%', min: 80, max: 89 },
  { label: '90–100%', min: 90, max: 100 },
]

const buckets = computed(() => {
  const all = skillGroups.flatMap((g) => g.skills)
  return BANDS.map((b) => ({
    ...b,
    count: all.filter((s) => s.level >= b.min && s.level <= b.max).length,
  }))
})

const maxCount = computed(() => Math.max(...buckets.value.map((b) => b.count), 1))
</script>

<template>
  <div class="histogram" role="img" aria-label="Histogram of individual skill levels grouped into bands" v-reveal>
    <div v-for="b in buckets" :key="b.label" class="hist-col">
      <span class="hist-count">{{ b.count }}</span>
      <div class="hist-bar" :style="{ height: (b.count / maxCount) * 100 + '%' }" />
      <span class="hist-label">{{ b.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.histogram {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 180px;
  padding-top: 26px;
}
.hist-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
.hist-count {
  font-size: 0.78rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text-dim);
  margin-bottom: 4px;
}
.hist-bar {
  width: 100%;
  background: var(--accent);
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  /* `height` is set once via inline style (the data-driven bar size) — a CSS
     transition on it never fires on first paint (no prior value to animate
     from). Scale it in from the baseline instead, gated on scroll-reveal. */
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s var(--ease);
}
.histogram.is-visible .hist-bar {
  transform: scaleY(1);
}
.hist-label {
  margin-top: 8px;
  font-size: 0.74rem;
  color: var(--text-faint);
  white-space: nowrap;
}
</style>
