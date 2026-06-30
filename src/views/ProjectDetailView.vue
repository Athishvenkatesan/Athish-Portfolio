<!-- ProjectDetailView — full case-study page for a single project (/projects/:id). -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProject } from '@/data/projects'
import GlassWindow from '@/components/layout/GlassWindow.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()
const project = computed(() => getProject(String(route.params.id)))
</script>

<template>
  <main class="detail section">
    <div class="container">
      <RouterLink to="/#projects" class="back">
        <AppIcon name="arrow" :size="16" class="flip" /> Back to projects
      </RouterLink>

      <template v-if="project">
        <p class="eyebrow" :style="{ color: project.accent }">{{ project.category }}</p>
        <h1 class="title">{{ project.title }}</h1>
        <p class="tagline">{{ project.tagline }}</p>

        <div class="stack">
          <span v-for="t in project.stack" :key="t" class="chip">{{ t }}</span>
        </div>

        <div v-if="project.repo || project.demo" class="links">
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="btn">
            <AppIcon name="github" :size="17" /> View source
          </a>
          <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="btn btn-primary">
            <AppIcon name="external" :size="16" /> Open live app
          </a>
        </div>

        <div class="layout">
          <div class="main">
            <GlassWindow title="overview.md">
              <p v-for="(para, i) in project.description" :key="i" class="para">{{ para }}</p>
            </GlassWindow>

            <GlassWindow title="highlights" class="block">
              <ul class="ticks">
                <li v-for="h in project.highlights" :key="h">
                  <AppIcon name="arrow" :size="15" :style="{ color: project.accent }" /> {{ h }}
                </li>
              </ul>
            </GlassWindow>
          </div>

          <aside class="side">
            <div v-if="project.ownership" class="glass panel">
              <h3>End-to-end ownership</h3>
              <ol class="steps">
                <li v-for="s in project.ownership" :key="s">{{ s }}</li>
              </ol>
            </div>
            <div v-if="project.outcomes" class="glass panel">
              <h3>Outcomes</h3>
              <ul class="dots">
                <li v-for="o in project.outcomes" :key="o">{{ o }}</li>
              </ul>
            </div>
          </aside>
        </div>
      </template>

      <div v-else class="missing glass">
        <h2>Project not found</h2>
        <RouterLink to="/#projects" class="btn btn-primary">Back to projects</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail {
  padding-top: clamp(96px, 14vh, 150px);
}
.back {
  /* Block-level (flex, fit-content) so it sits on its own row — the global
     .eyebrow that follows is inline-flex and would otherwise share this line. */
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 6px;
  color: var(--text-dim);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: var(--sp-5);
}
.back:hover {
  color: var(--accent);
}
.flip {
  transform: rotate(180deg);
}
.title {
  font-size: clamp(2rem, 6vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-top: var(--sp-2);
}
.tagline {
  color: var(--text-dim);
  font-size: 1.1rem;
  margin-top: var(--sp-2);
}
.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-4);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-4);
}
.layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--sp-4);
  margin-top: var(--sp-6);
  align-items: start;
}
.para {
  color: var(--text-dim);
  line-height: 1.75;
  margin-bottom: var(--sp-3);
}
.para:last-child {
  margin-bottom: 0;
}
.block {
  margin-top: var(--sp-4);
}
.ticks,
.steps,
.dots {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  list-style: none;
}
.ticks li {
  display: flex;
  gap: var(--sp-2);
  color: var(--text-dim);
}
.side {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.panel {
  padding: clamp(20px, 2.6vw, 26px);
}
.panel h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: var(--sp-3);
  color: var(--accent);
}
.steps {
  counter-reset: s;
  padding-left: 0;
}
.steps li {
  counter-increment: s;
  position: relative;
  padding-left: 34px;
  color: var(--text-dim);
  font-size: 0.92rem;
}
.steps li::before {
  content: counter(s);
  position: absolute;
  left: 0;
  top: -2px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
}
.dots li {
  position: relative;
  padding-left: 18px;
  color: var(--text-dim);
  font-size: 0.92rem;
}
.dots li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-2);
}
.missing {
  padding: var(--sp-8) var(--sp-5);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
}
@media (max-width: 820px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
