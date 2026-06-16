<!-- SkillsSection — grouped capability cards with animated proficiency bars. -->
<script setup lang="ts">
import { skillGroups } from '@/data/skills'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <p class="eyebrow" v-reveal>Skills</p>
      <h2 class="section-title" v-reveal>A full-stack toolkit</h2>
      <p class="section-sub" v-reveal>
        Front-end engineering leads — with deep Power Platform automation and a Data Science foundation underneath.
      </p>

      <div class="grid">
        <article
          v-for="(group, i) in skillGroups"
          :key="group.title"
          class="card glass"
          v-reveal="i * 70"
        >
          <header class="card-head">
            <span class="ic"><AppIcon :name="group.icon" :size="20" /></span>
            <div>
              <h3>{{ group.title }}</h3>
              <p>{{ group.blurb }}</p>
            </div>
          </header>
          <ul class="skills">
            <li v-for="s in group.skills" :key="s.name">
              <div class="skill-top">
                <span class="skill-name">{{ s.name }}</span>
                <span class="skill-pct">{{ s.level }}%</span>
              </div>
              <div class="bar">
                <span class="fill" :style="{ '--lvl': s.level + '%' }" />
              </div>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: var(--sp-4);
  margin-top: var(--sp-6);
}
.card {
  padding: clamp(20px, 2.6vw, 28px);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-2);
}
.card-head {
  display: flex;
  gap: var(--sp-3);
  align-items: flex-start;
  margin-bottom: var(--sp-4);
}
.ic {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: var(--r-md);
  background: var(--accent-soft);
  color: var(--accent);
}
.card-head h3 {
  font-size: 1.08rem;
  font-weight: 700;
}
.card-head p {
  font-size: 0.84rem;
  color: var(--text-faint);
}
.skills {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.skill-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.86rem;
  margin-bottom: 5px;
}
.skill-name {
  color: var(--text-dim);
  font-weight: 500;
}
.skill-pct {
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}
.bar {
  height: 6px;
  border-radius: var(--r-pill);
  background: var(--chip-bg);
  overflow: hidden;
}
.fill {
  display: block;
  height: 100%;
  width: var(--lvl);
  border-radius: var(--r-pill);
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transform-origin: left;
  animation: grow 1.1s var(--ease) both;
}
@keyframes grow {
  from {
    transform: scaleX(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .fill {
    animation: none;
  }
}
</style>
