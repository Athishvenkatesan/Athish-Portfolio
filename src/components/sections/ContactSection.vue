<!-- ContactSection — CTA + contact methods + mailto form + footer. -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile, whatsappLink } from '@/data/profile'
import AppIcon from '@/components/ui/AppIcon.vue'

const name = ref('')
const message = ref('')

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name.value || 'a visitor'}`)
  const body = encodeURIComponent(`${message.value}\n\n— ${name.value}`)
  return `mailto:${profile.email}?subject=${subject}&body=${body}`
})

const methods = [
  { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: 'phone', label: 'Phone (India)', value: profile.phoneDisplay, href: `tel:+${profile.whatsapp}` },
  {
    icon: 'phone',
    label: 'Phone (UAE)',
    value: profile.phoneDisplaySecondary,
    href: `tel:+${profile.phoneSecondary}`,
  },
  { icon: 'linkedin', label: 'LinkedIn', value: 'athish-venkatesan', href: profile.linkedin },
]
const year = new Date().getFullYear()
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="cta-card surface" v-reveal>
        <p class="eyebrow">Contact</p>
        <h2 class="big">Let's build something <span class="accent">together</span></h2>
        <p class="lead">
          Open to front-end, Power Platform and AI automation roles. The fastest way to reach me is WhatsApp.
        </p>
        <div class="cta">
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-wa">
            <AppIcon name="chat" :size="18" /> Message on WhatsApp
          </a>
          <a :href="`mailto:${profile.email}`" class="btn btn-primary">
            <AppIcon name="mail" :size="18" /> Email me
          </a>
        </div>

        <div class="grid">
          <a v-for="m in methods" :key="m.label" :href="m.href" target="_blank" rel="noopener" class="method">
            <span class="m-ic"><AppIcon :name="m.icon" :size="18" /></span>
            <span class="m-text">
              <span class="m-label">{{ m.label }}</span>
              <span class="m-value">{{ m.value }}</span>
            </span>
          </a>
        </div>

        <form class="form" @submit.prevent>
          <input v-model="name" type="text" placeholder="Your name" aria-label="Your name" />
          <textarea v-model="message" rows="3" placeholder="Your message…" aria-label="Your message" />
          <a :href="mailtoHref" class="btn btn-primary send">
            <AppIcon name="send" :size="16" /> Send via email
          </a>
        </form>
      </div>

      <footer class="footer">
        <span>Copyrights © {{ year }} {{ profile.name }}</span>
        <RouterLink to="/analysis" class="footer-link">Analysis</RouterLink>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.cta-card {
  padding: clamp(28px, 5vw, 56px);
  text-align: center;
}
.eyebrow {
  justify-content: center;
}
.big {
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-top: var(--sp-3);
}
.accent {
  color: var(--accent);
}
.lead {
  color: var(--text-dim);
  max-width: 50ch;
  margin: var(--sp-3) auto 0;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  justify-content: center;
  margin-top: var(--sp-5);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--sp-3);
  margin-top: var(--sp-6);
  text-align: left;
}
.method {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4);
  border-radius: var(--r-md);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  transition: transform var(--dur-fast) var(--ease);
}
.method:hover {
  transform: translateY(-3px);
}
.m-ic {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: var(--r-sm);
  background: var(--accent-soft);
  color: var(--accent);
}
.m-text {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.m-label {
  font-size: 0.74rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.m-value {
  font-weight: 600;
  font-size: 0.92rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  max-width: 480px;
  margin: var(--sp-6) auto 0;
  text-align: left;
}
input,
textarea {
  width: 100%;
  padding: 13px 16px;
  border-radius: var(--r-md);
  background: var(--chip-bg);
  border: 1px solid var(--glass-border);
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color var(--dur-fast) var(--ease);
}
input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
}
.send {
  align-self: flex-start;
}
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-6);
  padding-top: var(--sp-5);
  color: var(--text-faint);
  font-size: 0.84rem;
}
.footer-link {
  font-weight: 600;
  color: var(--text-dim);
  transition: color var(--dur-fast) var(--ease);
}
.footer-link:hover {
  color: var(--accent);
}
@media (max-width: 680px) {
  /* The floating dock is fixed to the bottom of the screen — without this,
     the last-scrolled content (this footer) always ends up sitting under it. */
  .footer {
    margin-bottom: 84px;
  }
}
@media (max-width: 680px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
