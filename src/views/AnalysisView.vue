<!-- AnalysisView — self-report dashboard: KPIs, skill radar, top skills, project timeline (/analysis). -->
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { projects, type Project } from '@/data/projects'
import { useBackNav } from '@/composables/useBackNav'
import AppIcon from '@/components/ui/AppIcon.vue'
import CountUp from '@/components/ui/CountUp.vue'
import SkillRadarChart from '@/components/charts/SkillRadarChart.vue'
import TopSkillsBars from '@/components/charts/TopSkillsBars.vue'
import SkillHistogram from '@/components/charts/SkillHistogram.vue'
import SkillBoxPlot from '@/components/charts/SkillBoxPlot.vue'
import CategoryTornado from '@/components/charts/CategoryTornado.vue'
import ProjectCategoryDonut from '@/components/charts/ProjectCategoryDonut.vue'
import TechStackTreemap from '@/components/charts/TechStackTreemap.vue'
import ProjectComplexityBubble from '@/components/charts/ProjectComplexityBubble.vue'

const { goBack } = useBackNav()

const avgOverallSkill = computed(() => {
  const all = skillGroups.flatMap((g) => g.skills)
  return Math.round(all.reduce((sum, s) => sum + s.level, 0) / all.length)
})

const kpis = computed(() => [
  { label: 'Experience', value: `${profile.experienceYears}y` },
  { label: 'Projects Shipped', value: `${projects.length}` },
  { label: 'Avg Skill Level', value: `${avgOverallSkill.value}%` },
  { label: 'M.Sc CGPA', value: '9.1' },
])

interface Era {
  period: string
  periodStart: string
  projects: Project[]
}

const eras = computed<Era[]>(() => {
  const map = new Map<string, Era>()
  for (const p of projects) {
    if (!map.has(p.period)) map.set(p.period, { period: p.period, periodStart: p.periodStart, projects: [] })
    map.get(p.period)!.projects.push(p)
  }
  return Array.from(map.values()).sort((a, b) => b.periodStart.localeCompare(a.periodStart))
})
</script>

<template>
  <main class="analysis section">
    <div class="container">
      <button type="button" class="back" @click="goBack">
        <AppIcon name="arrow" :size="16" class="flip" /> Back
      </button>

      <p class="eyebrow">Analysis</p>
      <h1 class="title">Skills &amp; project timeline</h1>
      <p class="subtitle">
        A self-report: where my strengths concentrate, and roughly when each project happened.
      </p>

      <section class="kpis">
        <div v-for="(k, i) in kpis" :key="k.label" class="kpi surface" v-reveal="i * 60">
          <span class="kpi-value"><CountUp :value="k.value" /></span>
          <span class="kpi-label">{{ k.label }}</span>
        </div>
      </section>

      <div class="group">
        <h2 class="group-title">Skills analysis</h2>

        <section class="block">
          <h3 class="block-title">Skill strength by category</h3>
          <p class="block-sub">A holistic view across all six skill areas — the ranked per-skill list is below.</p>
          <div class="radar-card surface" v-reveal>
            <SkillRadarChart :size="340" />
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">Top individual skills</h3>
          <p class="block-sub">Highest-rated skills across every category.</p>
          <TopSkillsBars :limit="10" />
          <!-- No v-reveal wrapper here — TopSkillsBars owns its own scroll-reveal
               internally (it's also used standalone in the chatbot, with no wrapper). -->
        </section>

        <div class="split">
          <section class="block split-col">
            <h3 class="block-title">Skill level distribution</h3>
            <p class="block-sub">How many individual skills fall in each proficiency band.</p>
            <div class="chart-card surface" v-reveal>
              <SkillHistogram />
            </div>
          </section>

          <section class="block split-col">
            <h3 class="block-title">Category vs. overall average</h3>
            <p class="block-sub">Which categories run above or below the average across all skills.</p>
            <div class="chart-card surface" v-reveal>
              <CategoryTornado />
            </div>
          </section>
        </div>

        <section class="block">
          <h3 class="block-title">Skill spread by category</h3>
          <p class="block-sub">The radar shows the average per category — this shows the range within it.</p>
          <div class="chart-card surface" v-reveal>
            <SkillBoxPlot />
          </div>
        </section>
      </div>

      <div class="group">
        <h2 class="group-title">Project analysis</h2>

        <div class="split">
          <section class="block split-col">
            <h3 class="block-title">Projects by category</h3>
            <p class="block-sub">Share of the {{ projects.length }} shipped projects per category.</p>
            <div class="chart-card surface" v-reveal>
              <ProjectCategoryDonut :size="200" />
            </div>
          </section>

          <section class="block split-col">
            <h3 class="block-title">Tech stack usage</h3>
            <p class="block-sub">Which technologies recur most across all projects.</p>
            <div class="chart-card surface" v-reveal>
              <TechStackTreemap :limit="10" />
            </div>
          </section>
        </div>

        <section class="block">
          <h3 class="block-title">Project complexity over time</h3>
          <p class="block-sub">Tech-stack size per project, grouped by role/era — bubble size is highlights documented.</p>
          <div class="chart-card surface" v-reveal>
            <ProjectComplexityBubble />
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">Project timeline</h3>
          <p class="block-sub">Approximate — grouped by role/period, most recent first.</p>
          <div class="timeline">
            <article v-for="(era, i) in eras" :key="era.period" class="era" v-reveal="i * 90">
              <span class="node" />
              <div class="era-content surface">
                <h4>{{ era.period }}</h4>
                <div class="era-projects">
                  <RouterLink
                    v-for="p in era.projects"
                    :key="p.id"
                    :to="`/projects/${p.id}`"
                    class="era-project"
                    :style="{ borderColor: p.accent }"
                  >
                    <span class="era-project-title" :style="{ color: p.accent }">{{ p.title }}</span>
                    <span class="era-project-stack">{{ p.stack.join(' · ') }}</span>
                  </RouterLink>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.analysis {
  padding-top: clamp(96px, 14vh, 150px);
}
.back {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 6px;
  color: var(--text-dim);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: var(--sp-5);
  transition: color var(--dur-fast) var(--ease);
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
.subtitle {
  color: var(--text-dim);
  font-size: 1.1rem;
  margin-top: var(--sp-2);
  max-width: 60ch;
}
.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-4);
  margin-top: var(--sp-8);
}
.kpi {
  padding: clamp(20px, 2.6vw, 28px);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.kpi-value {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  color: var(--text);
}
.kpi-label {
  font-size: 0.78rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.group {
  margin-top: var(--sp-11);
}
.group-title {
  font-size: var(--fs-h1);
  font-weight: 800;
  letter-spacing: -0.02em;
  padding-bottom: var(--sp-3);
  border-bottom: 1px solid var(--surface-border);
}
.block {
  margin-top: var(--sp-9);
}
.block-title {
  font-size: var(--fs-h2);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.block-sub {
  color: var(--text-faint);
  font-size: 0.9rem;
  margin-top: 4px;
  margin-bottom: var(--sp-5);
}
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  gap: var(--sp-4);
}
.split-col {
  display: flex;
  flex-direction: column;
}
.radar-card,
.chart-card {
  padding: clamp(24px, 5vw, 56px);
  display: flex;
  justify-content: center;
}
.chart-card {
  flex: 1;
  min-height: 0;
  flex-direction: column;
}
.timeline {
  position: relative;
  padding-left: 28px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: linear-gradient(var(--accent), transparent);
}
.era {
  position: relative;
  margin-bottom: var(--sp-4);
}
.node {
  position: absolute;
  left: -28px;
  top: 22px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 3px solid var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.era-content {
  padding: clamp(18px, 2.4vw, 26px);
}
.era-content h4 {
  font-size: 1.05rem;
  font-weight: 700;
}
.era-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--sp-2);
  margin-top: var(--sp-3);
}
.era-project {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 14px;
  border-radius: var(--r-md);
  border: 1px solid;
  background: var(--chip-bg);
  transition: transform var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease);
}
.era-project:hover {
  transform: translateY(-2px);
  background: var(--glass-hi);
}
.era-project-title {
  font-size: 0.86rem;
  font-weight: 700;
}
.era-project-stack {
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--text-faint);
}

@media (max-width: 820px) {
  .split {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
