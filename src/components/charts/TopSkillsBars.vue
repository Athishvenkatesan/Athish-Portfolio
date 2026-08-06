<!-- TopSkillsBars — ranked horizontal bar list of the highest-rated individual skills. Reused by the Analysis page (full) and the chatbot (compact). -->
<script setup lang="ts">
import { computed } from 'vue'
import { skillGroups } from '@/data/skills'

const props = withDefaults(defineProps<{ limit?: number; compact?: boolean }>(), {
  limit: 10,
  compact: false,
})

const topSkills = computed(() =>
  skillGroups
    .flatMap((g) => g.skills.map((s) => ({ ...s, group: g.title })))
    .sort((a, b) => b.level - a.level)
    .slice(0, props.limit),
)
</script>

<template>
  <div class="bars" :class="{ compact }" v-reveal>
    <div v-for="s in topSkills" :key="s.name" class="bar-row">
      <span class="bar-label">{{ s.name }}</span>
      <div class="bar-track">
        <span class="bar-fill" :style="{ '--lvl': s.level + '%' }" />
      </div>
      <span class="bar-value">{{ s.level }}%</span>
    </div>
  </div>
</template>

<style scoped>
.bars {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.bar-row {
  display: grid;
  grid-template-columns: 220px 1fr 48px;
  align-items: center;
  gap: var(--sp-4);
  padding: 8px 10px;
  border-radius: var(--r-sm);
  transition: background var(--dur-fast) var(--ease);
}
.bar-row:hover {
  background: var(--chip-bg);
}
.bar-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-dim);
}
.bar-track {
  height: 8px;
  border-radius: var(--r-pill);
  background: var(--chip-bg);
  overflow: hidden;
}
.bar-fill {
  display: block;
  height: 100%;
  width: var(--lvl);
  border-radius: var(--r-pill);
  background: var(--accent);
  transform-origin: left;
  /* Zero-width until the list scrolls into view — gated on .is-visible
     (added by v-reveal on the .bars root above) so the grow animation
     plays when seen, not already-finished before the user scrolls to it. */
  transform: scaleX(0);
}
.bars.is-visible .bar-fill {
  animation: grow 1s var(--ease) both;
}
@keyframes grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
.bar-value {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-faint);
}

/* Compact — chat-bubble sized: no fixed label column, smaller everything. */
.bars.compact {
  gap: var(--sp-2);
}
.bars.compact .bar-row {
  grid-template-columns: 1fr;
  gap: 4px;
  padding: 4px 2px;
}
.bars.compact .bar-label {
  font-size: 0.78rem;
}
.bars.compact .bar-track {
  height: 6px;
}
.bars.compact .bar-value {
  text-align: left;
  font-size: 0.72rem;
}

@media (max-width: 640px) {
  .bar-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .bar-value {
    text-align: left;
  }
}
</style>
