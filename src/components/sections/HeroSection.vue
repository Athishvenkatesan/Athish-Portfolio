<!-- HeroSection — name, title, CTAs and a full-bleed portrait with a 3D mouse-tilt cutout + floating stat badges. -->
<script setup lang="ts">
import { ref } from 'vue'
import { profile, socials, whatsappLink } from '@/data/profile'
import { projects } from '@/data/projects'
import AppIcon from '@/components/ui/AppIcon.vue'
import CountUp from '@/components/ui/CountUp.vue'

const stats = [
  { value: `${profile.experienceYears}y`, label: 'Experience', icon: 'chart' },
  { value: `${projects.length}`, label: 'Projects', icon: 'layout' },
]

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const frameTransform = ref('perspective(1000px) rotateX(0deg) rotateY(0deg)')
const badgeTransform = ref('translate3d(0, 0, 0)')

/** Mouse-tilt "3D" effect — the portrait rotates toward the cursor, and the
 * floating badge layer drifts a little further for a layered parallax feel. */
function handleTilt(e: MouseEvent) {
  if (reducedMotion) return
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  frameTransform.value = `perspective(1000px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`
  badgeTransform.value = `translate3d(${(px * 16).toFixed(1)}px, ${(py * 16).toFixed(1)}px, 0)`
}
function resetTilt() {
  frameTransform.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  badgeTransform.value = 'translate3d(0, 0, 0)'
}
</script>

<template>
  <section id="top" class="hero section">
    <div class="container hero-grid">
      <div class="intro">
        <h1 class="name">
          {{ profile.name }}
        </h1>
        <p class="role">{{ profile.title }}</p>
        <p class="sub">{{ profile.subtitle }}</p>
        <p class="tagline">{{ profile.tagline }}</p>

        <div class="cta">
          <a href="#contact" class="btn-solid">
            <AppIcon name="mail" :size="17" /> Get in touch
          </a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-arrow">
            WhatsApp <AppIcon name="arrow" :size="14" />
          </a>
          <a :href="profile.resumePath" download class="link-arrow">
            Resume <AppIcon name="arrow" :size="14" />
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
        <div class="portrait-stage" @mousemove="handleTilt" @mouseleave="resetTilt">
          <div class="portrait-frame" :style="{ transform: frameTransform }">
            <picture v-if="profile.portrait">
              <source :srcset="profile.portrait" type="image/webp" />
              <img
                :src="profile.portraitFallback ?? profile.portrait"
                :alt="profile.name"
                class="portrait"
                loading="eager"
              />
            </picture>
            <img v-else-if="profile.photo" :src="profile.photo" :alt="profile.name" class="portrait" />
            <div v-else class="monogram">{{ profile.initials }}</div>
          </div>

          <div class="badge-layer" :style="{ transform: badgeTransform }">
            <div v-for="(s, i) in stats" :key="s.label" class="stat-badge" :class="`badge-${i}`">
              <span class="badge-ic"><AppIcon :name="s.icon" :size="16" /></span>
              <span class="badge-text">
                <span class="badge-val"><CountUp :value="s.value" /></span>
                <span class="badge-lbl">{{ s.label }}</span>
              </span>
            </div>
          </div>
        </div>
        <p class="visual-caption">{{ profile.name }} · {{ profile.location }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(110px, 16vh, 180px);
  padding-bottom: clamp(40px, 6vw, 68px);
  background: var(--bg);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
}

/* Staggered entrance for the hero copy + visual. */
.intro > * {
  animation: heroIn 0.7s var(--ease) both;
}
.intro > *:nth-child(1) {
  animation-delay: 0.05s;
}
.intro > *:nth-child(2) {
  animation-delay: 0.12s;
}
.intro > *:nth-child(3) {
  animation-delay: 0.19s;
}
.intro > *:nth-child(4) {
  animation-delay: 0.26s;
}
.intro > *:nth-child(5) {
  animation-delay: 0.33s;
}
.intro > *:nth-child(6) {
  animation-delay: 0.4s;
}
.visual {
  animation: heroIn 0.85s var(--ease) 0.28s both;
}
@keyframes heroIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .intro > *,
  .visual {
    animation: none;
  }
}
.name {
  font-size: var(--fs-hero);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-top: var(--sp-3);
}
.role {
  font-size: clamp(1.2rem, 3.4vw, 1.9rem);
  font-weight: 700;
  color: var(--accent);
  margin-top: var(--sp-2);
}
.sub {
  font-size: var(--fs-body-lg);
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
  align-items: center;
  gap: var(--sp-6);
  margin-top: var(--sp-6);
}
.socials {
  display: flex;
  gap: var(--sp-3);
  margin-top: var(--sp-6);
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
.portrait-stage {
  position: relative;
}
.portrait-frame {
  position: relative;
  border-radius: var(--r-2xl);
  overflow: hidden;
  aspect-ratio: 1080 / 1239;
  background:
    radial-gradient(ellipse 70% 55% at 50% 20%, var(--accent-soft), transparent 72%),
    var(--chip-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-2);
  transform-style: preserve-3d;
  transition: transform 0.15s var(--ease);
  will-change: transform;
}
.portrait-frame picture {
  display: block;
  width: 100%;
  height: 100%;
}
.portrait {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
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
.visual-caption {
  text-align: center;
  margin-top: var(--sp-3);
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text-faint);
}
/* Floating stat badges — mobile-first: a plain row under the portrait.
   The desktop media query below lifts them into floating 3D-ish chips
   scattered around the frame, drifting with the mouse-tilt parallax. */
.badge-layer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
  transition: transform 0.15s var(--ease);
}
.stat-badge {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px 9px 10px;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-1);
  animation: badgeFloat 4.5s ease-in-out infinite;
}
.badge-1 {
  animation-delay: 0.3s;
}
.badge-ic {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--accent-soft);
  color: var(--accent);
}
.badge-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.badge-val {
  font-size: 1.02rem;
  font-weight: 800;
  color: var(--text);
  font-family: var(--font-mono);
}
.badge-lbl {
  font-size: 0.64rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
@keyframes badgeFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -6px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .stat-badge {
    animation: none;
  }
}

@media (min-width: 881px) {
  .badge-layer {
    position: absolute;
    inset: 0;
    margin-top: 0;
    pointer-events: none;
  }
  .stat-badge {
    position: absolute;
    pointer-events: auto;
  }
  .badge-0 {
    top: 8%;
    left: -12%;
    rotate: -6deg;
  }
  .badge-1 {
    bottom: 10%;
    right: -13%;
    rotate: 4deg;
  }
}

@media (max-width: 880px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .visual {
    max-width: 360px;
  }
}

/* Short viewports (window shrunk vertically, laptop w/ browser chrome, landscape
   phones): the fixed floating dock always sits at the bottom of the screen, so a
   full-size hero can push the CTA/social row directly under it. Compact the
   vertical rhythm instead of letting that happen. */
@media (max-height: 780px) {
  .hero {
    padding-top: clamp(84px, 12vh, 130px);
  }
  .name {
    font-size: clamp(2.1rem, 7vw, 4.4rem);
  }
  .sub {
    margin-top: var(--sp-3);
  }
  .tagline {
    margin-top: var(--sp-2);
  }
  .cta {
    margin-top: var(--sp-4);
    gap: var(--sp-4);
  }
  .socials {
    margin-top: var(--sp-4);
  }
}
@media (max-height: 620px) {
  .hero {
    padding-top: clamp(64px, 9vh, 90px);
  }
  .tagline {
    display: none;
  }
  .sub {
    margin-top: var(--sp-2);
  }
  .cta {
    margin-top: var(--sp-3);
  }
  .socials {
    margin-top: var(--sp-3);
  }
}
</style>
