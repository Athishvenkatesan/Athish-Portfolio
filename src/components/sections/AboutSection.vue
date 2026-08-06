<!-- AboutSection — career objective + highlight chips. -->
<script setup lang="ts">
import { profile } from '@/data/profile'
import { languages } from '@/data/experience'

const focus = ['React + TypeScript SPAs', 'Power Platform automation', 'Copilot Studio agents', 'Data Science / ML']
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <p class="eyebrow" v-reveal>About</p>
      <h2 class="section-title" v-reveal>Building solutions, end to end</h2>

      <div class="about-grid">
        <p class="about-text surface" v-reveal>{{ profile.about }}</p>

        <aside class="side surface" v-reveal="120">
          <div class="row">
            <span class="k">Focus</span>
            <div class="chips">
              <span v-for="f in focus" :key="f" class="chip">{{ f }}</span>
            </div>
          </div>
          <div class="row">
            <span class="k">Languages</span>
            <div class="chips">
              <span v-for="l in languages" :key="l" class="chip">{{ l }}</span>
            </div>
          </div>
          <div class="row">
            <span class="k">Based in</span>
            <span class="v">{{ profile.location }}</span>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--sp-5);
  margin-top: var(--sp-6);
}
.about-text {
  padding: clamp(20px, 3vw, 32px);
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--text);
}
.side {
  padding: clamp(20px, 3vw, 28px);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.row {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.k {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-faint);
  font-weight: 600;
}
.v {
  color: var(--text-dim);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}
@media (max-width: 760px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
