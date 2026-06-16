<!-- ProjectCard — glass project card with hover tilt and a "view" affordance. -->
<script setup lang="ts">
import type { Project } from '@/data/projects'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <RouterLink :to="`/projects/${project.id}`" class="card glass" :class="{ featured: project.featured }">
    <div class="glow" :style="{ background: project.accent }" />
    <header class="top">
      <span class="cat" :style="{ color: project.accent }">{{ project.category }}</span>
      <span v-if="project.featured" class="star">★ Featured</span>
    </header>
    <h3 class="title">{{ project.title }}</h3>
    <p class="tagline">{{ project.tagline }}</p>
    <p class="summary">{{ project.summary }}</p>
    <div class="stack">
      <span v-for="t in project.stack.slice(0, 5)" :key="t" class="chip">{{ t }}</span>
      <span v-if="project.stack.length > 5" class="chip more">+{{ project.stack.length - 5 }}</span>
    </div>
    <span class="view">View case study <AppIcon name="arrow" :size="16" /></span>
  </RouterLink>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 2.6vw, 28px);
  overflow: hidden;
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-2);
}
.glow {
  position: absolute;
  top: -40%;
  right: -20%;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.18;
  pointer-events: none;
  transition: opacity var(--dur) var(--ease);
}
.card:hover .glow {
  opacity: 0.34;
}
.featured {
  grid-column: span 2;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sp-3);
}
.cat {
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.star {
  font-size: 0.72rem;
  font-weight: 700;
  color: #febc2e;
}
.title {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.tagline {
  color: var(--text);
  font-weight: 500;
  margin-top: 4px;
}
.summary {
  color: var(--text-dim);
  font-size: 0.92rem;
  margin-top: var(--sp-3);
  flex: 1;
}
.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-4);
}
.more {
  color: var(--accent);
}
.view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: var(--sp-4);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--accent);
  transition: gap var(--dur-fast) var(--ease);
}
.card:hover .view {
  gap: 12px;
}
@media (max-width: 760px) {
  .featured {
    grid-column: span 1;
  }
}
</style>
