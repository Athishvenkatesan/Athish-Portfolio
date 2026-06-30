<!-- ProjectsSection — filterable grid of project cards (D2D featured first). -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, projectCategories, type ProjectCategory } from '@/data/projects'
import ProjectCard from '@/components/widgets/ProjectCard.vue'

type Filter = 'All' | ProjectCategory
const filters: Filter[] = ['All', ...projectCategories]
const active = ref<Filter>('All')

const visible = computed(() =>
  active.value === 'All' ? projects : projects.filter((p) => p.category === active.value),
)
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <p class="eyebrow" v-reveal>Projects</p>
      <h2 class="section-title" v-reveal>Selected work</h2>
      <p class="section-sub" v-reveal>
        From a React + TypeScript enterprise SPA to Power Platform automations and Copilot agents.
      </p>

      <div class="filters" v-reveal>
        <button
          v-for="f in filters"
          :key="f"
          class="filter"
          :class="{ active: active === f }"
          type="button"
          @click="active = f"
        >
          {{ f }}
        </button>
      </div>

      <div class="grid">
        <ProjectCard
          v-for="(p, i) in visible"
          :key="p.id"
          :project="p"
          v-reveal="Math.min(i * 70, 350)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin: var(--sp-5) 0 var(--sp-5);
}
.filter {
  padding: 8px 16px;
  border-radius: var(--r-pill);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-dim);
  border: 1px solid var(--chip-border);
  background: var(--chip-bg);
  transition: all var(--dur-fast) var(--ease);
}
.filter:hover {
  color: var(--text);
}
.filter.active {
  color: #fff;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  border-color: transparent;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-4);
}
@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
