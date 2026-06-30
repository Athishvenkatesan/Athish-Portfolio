<!-- ExperienceSection — vertical timeline of roles. -->
<script setup lang="ts">
import { experience } from '@/data/experience'
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <p class="eyebrow" v-reveal>Experience</p>
      <h2 class="section-title" v-reveal>Where I've worked</h2>

      <div class="timeline">
        <article
          v-for="(item, i) in experience"
          :key="`${item.org}-${item.role}`"
          class="item"
          v-reveal="i * 90"
        >
          <span class="node" />
          <div class="content glass">
            <div class="head">
              <h3>{{ item.role }}</h3>
              <span class="period">{{ item.period }}</span>
            </div>
            <p class="org">{{ item.org }}</p>
            <ul class="points">
              <li v-for="p in item.points" :key="p">{{ p }}</li>
            </ul>
            <div class="tags">
              <span v-for="t in item.tags" :key="t" class="chip">{{ t }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  margin-top: var(--sp-6);
  padding-left: 28px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: linear-gradient(var(--accent), var(--accent-2), transparent);
}
.item {
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
.content {
  padding: clamp(18px, 2.4vw, 26px);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--sp-3);
  flex-wrap: wrap;
}
.head h3 {
  font-size: 1.15rem;
  font-weight: 700;
}
.period {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--accent-2);
  white-space: nowrap;
}
.org {
  color: var(--text-dim);
  font-weight: 500;
  margin-top: 2px;
}
.points {
  margin: var(--sp-3) 0;
  padding-left: 18px;
  color: var(--text-dim);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}
</style>
