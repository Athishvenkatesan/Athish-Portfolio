<!-- CredentialsSection — education, certifications and achievements/awards. -->
<script setup lang="ts">
import { education, certifications, achievements } from '@/data/experience'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <p class="eyebrow" v-reveal>Credentials</p>
      <h2 class="section-title" v-reveal>Education, certifications & awards</h2>

      <div class="grid">
        <div class="col surface" v-reveal>
          <h3 class="col-title"><AppIcon name="cap" :size="18" /> Education</h3>
          <div v-for="e in education" :key="e.degree" class="edu">
            <h4>{{ e.degree }}</h4>
            <p class="inst">{{ e.institution }}</p>
            <span class="score">{{ e.score }}</span>
          </div>
        </div>

        <div class="col surface" v-reveal="90">
          <h3 class="col-title"><AppIcon name="award" :size="18" /> Certifications</h3>
          <ul class="certs">
            <li v-for="c in certifications" :key="c">{{ c }}</li>
          </ul>
        </div>

        <div class="col surface" v-reveal="180">
          <h3 class="col-title"><AppIcon name="award" :size="18" /> Achievements</h3>
          <div v-for="a in achievements" :key="a.title" class="ach">
            <span class="rank">{{ a.rank }}</span>
            <div>
              <h4>{{ a.title }}</h4>
              <p>{{ a.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-4);
  margin-top: var(--sp-6);
}
.col {
  padding: clamp(20px, 2.6vw, 28px);
}
.col-title {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: var(--sp-4);
}
.edu {
  padding-block: var(--sp-3);
  border-top: 1px solid var(--glass-border);
}
.edu:first-of-type {
  border-top: none;
  padding-top: 0;
}
.edu h4 {
  font-size: 1rem;
  font-weight: 600;
}
.inst {
  color: var(--text-dim);
  font-size: 0.88rem;
}
.score {
  display: inline-block;
  margin-top: 4px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-dim);
}
.certs {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.certs li {
  position: relative;
  padding-left: 20px;
  color: var(--text-dim);
  font-size: 0.92rem;
}
.certs li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
}
.ach {
  display: flex;
  gap: var(--sp-3);
  padding-block: var(--sp-3);
  border-top: 1px solid var(--glass-border);
}
.ach:first-of-type {
  border-top: none;
  padding-top: 0;
}
.rank {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.8rem;
  color: #fff;
  background: linear-gradient(140deg, #febc2e, #ff8a3d);
}
.ach h4 {
  font-size: 0.94rem;
  font-weight: 600;
}
.ach p {
  font-size: 0.82rem;
  color: var(--text-faint);
}
@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
