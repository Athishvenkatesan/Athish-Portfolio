<!-- ProjectCard — flat project card with hover lift and source/live actions. -->
<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/data/projects'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import LivePreviewPanel from '@/components/widgets/LivePreviewPanel.vue'

defineProps<{ project: Project }>()

const showPreview = ref(false)
</script>

<template>
  <article class="card surface" :class="{ featured: project.featured }">
    <header class="top">
      <span class="cat" :style="{ color: project.accent }">{{ project.category }}</span>
      <span v-if="project.featured" class="badge star">★ Featured</span>
      <span v-else-if="project.freelance" class="badge free">Freelance</span>
    </header>
    <h3 class="title">{{ project.title }}</h3>
    <p class="tagline">{{ project.tagline }}</p>
    <p class="summary">{{ project.summary }}</p>
    <div class="stack">
      <span v-for="t in project.stack.slice(0, 5)" :key="t" class="chip">{{ t }}</span>
      <span v-if="project.stack.length > 5" class="chip more">+{{ project.stack.length - 5 }}</span>
    </div>

    <footer class="actions">
      <!-- Stretched link: makes the whole card open the case study. -->
      <RouterLink :to="`/projects/${project.id}`" class="view stretched">
        View case study <AppIcon name="arrow" :size="16" />
      </RouterLink>

      <span v-if="project.repo || project.demo" class="ext-links">
        <button
          v-if="project.demo"
          type="button"
          class="ext live"
          title="Opens the live, running app right here in an embedded browser view"
          @click.stop="showPreview = true"
        >
          <AppIcon name="play" :size="14" /> Run in Browser
        </button>
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener"
          class="ext"
          aria-label="View source code on GitHub"
          @click.stop
        >
          <AppIcon name="github" :size="16" /> View Source Code
        </a>
      </span>
    </footer>

    <LivePreviewPanel
      v-if="project.demo"
      v-model="showPreview"
      :url="project.demo"
      :title="project.title"
    />
  </article>
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
.badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: var(--r-pill);
}
.star {
  color: #febc2e;
  background: rgba(254, 188, 46, 0.12);
}
.free {
  color: var(--accent);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
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
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  margin-top: var(--sp-4);
}
.view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--accent);
  transition: gap var(--dur-fast) var(--ease);
}
/* Stretch the case-study link across the whole card. */
.stretched::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
}
.card:hover .view {
  gap: 12px;
}
.ext-links {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
}
.ext {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: var(--r-pill);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-dim);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  transition: transform var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease);
}
.ext:hover {
  transform: translateY(-2px);
  color: var(--text);
}
.ext.live {
  color: #fff;
  background: var(--accent);
  border-color: transparent;
}
@media (max-width: 760px) {
  .featured {
    grid-column: span 1;
  }
}
</style>
