<!-- ProjectDetailView — full case-study page for a single project (/projects/:id). -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProject } from '@/data/projects'
import { useBackNav } from '@/composables/useBackNav'
import GlassWindow from '@/components/layout/GlassWindow.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import LivePreviewPanel from '@/components/widgets/LivePreviewPanel.vue'

const route = useRoute()
const project = computed(() => getProject(String(route.params.id)))
const showPreview = ref(false)
const hasSide = computed(() => Boolean(project.value?.ownership || project.value?.outcomes))
const { goBack } = useBackNav()
</script>

<template>
  <main class="detail section">
    <div class="container">
      <button type="button" class="back" @click="goBack">
        <AppIcon name="arrow" :size="16" class="flip" /> Back to projects
      </button>

      <template v-if="project">
        <p class="eyebrow" :style="{ color: project.accent }">{{ project.category }}</p>
        <h1 class="title">{{ project.title }}</h1>
        <p class="tagline">{{ project.tagline }}</p>

        <div class="stack">
          <span v-for="t in project.stack" :key="t" class="chip">{{ t }}</span>
        </div>

        <div v-if="project.repo || project.demo" class="links">
          <button
            v-if="project.demo"
            type="button"
            class="btn btn-primary"
            title="Opens the live, running app right here in an embedded browser view"
            @click="showPreview = true"
          >
            <AppIcon name="play" :size="16" /> Run in Browser
          </button>
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="btn">
            <AppIcon name="github" :size="17" /> View Source Code
          </a>
        </div>
        <p v-if="project.demo" class="links-hint">
          "Run in Browser" opens the live app right here, in an embedded view — no need to leave this page.
        </p>

        <LivePreviewPanel
          v-if="project.demo"
          v-model="showPreview"
          :url="project.demo"
          :title="project.title"
        />

        <div class="layout" :class="{ 'no-side': !hasSide }">
          <div class="main">
            <GlassWindow title="Overview">
              <p v-for="(para, i) in project.description" :key="i" class="para">{{ para }}</p>
            </GlassWindow>

            <GlassWindow title="Highlights" class="block">
              <ul class="ticks">
                <li v-for="h in project.highlights" :key="h">
                  <AppIcon name="arrow" :size="15" :style="{ color: project.accent }" /> {{ h }}
                </li>
              </ul>
            </GlassWindow>
          </div>

          <aside v-if="hasSide" class="side">
            <div v-if="project.ownership" class="surface panel">
              <h3>End-to-end ownership</h3>
              <ol class="steps">
                <li v-for="s in project.ownership" :key="s">{{ s }}</li>
              </ol>
            </div>
            <div v-if="project.outcomes" class="surface panel">
              <h3>Outcomes</h3>
              <ul class="dots">
                <li v-for="o in project.outcomes" :key="o">{{ o }}</li>
              </ul>
            </div>
          </aside>
        </div>
      </template>

      <div v-else class="missing surface">
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
.links-hint {
  color: var(--text-faint);
  font-size: 0.82rem;
  margin-top: var(--sp-2);
}
.layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--sp-4);
  margin-top: var(--sp-6);
  align-items: start;
}
.layout.no-side {
  grid-template-columns: 1fr;
}
.para {
  max-width: 74ch;
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
  max-width: 74ch;
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
  background: var(--accent);
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
  background: var(--accent);
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
