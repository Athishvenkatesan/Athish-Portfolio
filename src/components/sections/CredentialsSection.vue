<!-- CredentialsSection — education, certifications and achievements/awards. -->
<script setup lang="ts">
import { education, achievements } from '@/data/experience'
import { certificationList } from '@/data/certifications'
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

      <h3 id="certifications" class="cert-heading" v-reveal><AppIcon name="award" :size="18" /> Certifications <span>{{ certificationList.length }}</span></h3>
      <div class="cert-grid">
        <article v-for="(c, i) in certificationList" :key="c.title" class="cert surface" v-reveal="(i % 3) * 70">
          <a
            v-if="c.image"
            :href="c.image"
            target="_blank"
            rel="noopener"
            class="thumb-link"
            :aria-label="`View certificate: ${c.title}`"
          >
            <img :src="c.image" :alt="`${c.title} certificate`" loading="lazy" class="thumb" />
          </a>
          <div v-else class="thumb thumb-empty"><AppIcon name="award" :size="28" /></div>
          <div class="cert-body">
            <h4>{{ c.title }}</h4>
            <p class="issuer">{{ c.issuer }}</p>
            <p v-if="c.date || c.note" class="meta">{{ [c.date, c.note].filter(Boolean).join(' · ') }}</p>
            <details v-if="c.courses" class="courses">
              <summary>{{ c.courses.length }} courses</summary>
              <ul><li v-for="x in c.courses" :key="x">{{ x }}</li></ul>
            </details>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
.cert-heading {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-7, 48px);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--accent);
}
.cert-heading span {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
}
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-4);
  margin-top: var(--sp-4);
}
.cert {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease;
}
.cert:hover {
  border-color: var(--accent);
}
.thumb-link {
  display: block;
}
.thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: top;
  border-bottom: 1px solid var(--glass-border);
  background: var(--surface-2, rgba(127, 127, 127, 0.08));
}
.thumb-empty {
  display: grid;
  place-items: center;
  color: var(--text-faint);
  aspect-ratio: 16 / 7;
}
.cert-body {
  padding: var(--sp-3) var(--sp-4) var(--sp-4);
}
.cert-body h4 {
  font-size: 0.94rem;
  font-weight: 600;
}
.issuer {
  color: var(--text-dim);
  font-size: 0.82rem;
  margin-top: 2px;
}
.meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 4px;
}
.courses {
  margin-top: var(--sp-2);
  font-size: 0.8rem;
  color: var(--text-dim);
}
.courses summary {
  cursor: pointer;
  color: var(--accent);
}
.courses ul {
  margin: var(--sp-2) 0 0 16px;
  display: grid;
  gap: 2px;
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
