<!-- SkillTagCloud — badge cloud with tier-tinted chips (background/border
     intensity standing in for level) instead of an axis-based chart. One of
     six distinct forms SkillsSection uses so no two cards look alike. -->
<script setup lang="ts">
import type { Skill } from '@/data/skills'

defineProps<{ skills: Skill[] }>()

function tier(level: number) {
  if (level >= 88) return 'expert'
  if (level >= 80) return 'strong'
  return 'solid'
}
</script>

<template>
  <div class="tag-cloud" v-reveal>
    <span
      v-for="(s, i) in skills"
      :key="s.name"
      class="tag"
      :class="tier(s.level)"
      :style="{ transitionDelay: i * 60 + 'ms' }"
    >
      {{ s.name }}
      <b>{{ s.level }}%</b>
    </span>
  </div>
</template>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  align-content: flex-start;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border-radius: var(--r-pill);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-dim);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  /* Fades/lifts in per-tag (staggered via inline transition-delay) instead of
     firing at mount — gated the same way as the other chart variants. */
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.tag-cloud.is-visible .tag {
  opacity: 1;
  transform: translateY(0);
}
.tag b {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 700;
}
.tag.strong {
  background: var(--accent-soft);
  color: var(--text);
}
.tag.expert {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--text);
  font-weight: 600;
}
.tag.strong b,
.tag.expert b {
  color: var(--accent);
}
</style>
