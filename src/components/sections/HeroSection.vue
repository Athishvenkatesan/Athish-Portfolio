<!-- HeroSection — name, title, CTAs and a macOS "code window" portrait card. -->
<script setup lang="ts">
import { profile, socials, whatsappLink } from '@/data/profile'
import { projects } from '@/data/projects'
import GlassWindow from '@/components/layout/GlassWindow.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const stats = [
  { value: `${profile.experienceYears}y`, label: 'Experience' },
  { value: `${projects.length}`, label: 'Projects' },
  { value: '9.1', label: 'M.Sc CGPA' },
]
</script>

<template>
  <section id="top" class="hero section">
    <div class="container hero-grid">
      <div class="intro">
        <p class="eyebrow"><span class="pulse" /> Available for opportunities</p>
        <h1 class="name">
          {{ profile.name }}
        </h1>
        <p class="role gradient-text">{{ profile.title }}</p>
        <p class="sub">{{ profile.subtitle }}</p>
        <p class="tagline">{{ profile.tagline }}</p>

        <div class="cta">
          <a href="#contact" class="btn btn-primary">
            <AppIcon name="mail" :size="17" /> Get in touch
          </a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-wa">
            <AppIcon name="chat" :size="17" /> WhatsApp
          </a>
          <a :href="profile.resumePath" download class="btn">
            <AppIcon name="download" :size="17" /> Resume
          </a>
        </div>

        <div class="socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="social"
            :aria-label="s.label"
          >
            <AppIcon :name="s.icon" :size="18" />
          </a>
        </div>
      </div>

      <div class="visual">
        <GlassWindow title="athish.profile" subtitle="~/portfolio">
          <div class="portrait-frame">
            <img
              v-if="profile.portrait"
              :src="profile.portrait"
              :alt="profile.name"
              class="portrait"
              loading="eager"
            />
            <img v-else-if="profile.photo" :src="profile.photo" :alt="profile.name" class="portrait" />
            <div v-else class="monogram">{{ profile.initials }}</div>
            <div class="portrait-meta">
              <h3>{{ profile.name }}</h3>
              <p>{{ profile.location }}</p>
            </div>
          </div>
          <div class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <span class="stat-val gradient-text">{{ s.value }}</span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
          </div>
        </GlassWindow>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(110px, 16vh, 180px);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 0 0 var(--accent-2);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(25, 194, 168, 0.5);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(25, 194, 168, 0);
  }
}
.name {
  font-size: clamp(2.6rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-top: var(--sp-3);
}
.role {
  font-size: clamp(1.2rem, 3.4vw, 1.9rem);
  font-weight: 700;
  margin-top: var(--sp-2);
}
.sub {
  font-size: 1.05rem;
  color: var(--text);
  margin-top: var(--sp-4);
  max-width: 46ch;
  font-weight: 500;
}
.tagline {
  color: var(--text-dim);
  margin-top: var(--sp-3);
  max-width: 52ch;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
}
.socials {
  display: flex;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
}
.social {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--chip-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-dim);
  transition: transform var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
}
.social:hover {
  transform: translateY(-3px);
  color: var(--accent);
}
.portrait-frame {
  position: relative;
  border-radius: var(--r-md);
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--chip-bg);
}
.portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
  display: block;
}
.monogram {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 3.6rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
}
.portrait-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 28px 18px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
  color: #fff;
}
.portrait-meta h3 {
  font-size: 1.2rem;
  font-weight: 700;
}
.portrait-meta p {
  font-size: 0.86rem;
  opacity: 0.85;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-2);
  margin-top: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--glass-border);
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-val {
  font-size: 1.5rem;
  font-weight: 800;
}
.stat-lbl {
  font-size: 0.74rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

@media (max-width: 880px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .visual {
    max-width: 360px;
  }
}
</style>
