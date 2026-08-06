<!-- MenuBar — macOS-style frosted top bar: brand, section nav, theme + actions. -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { profile } from '@/data/profile'
import { useSectionNav } from '@/composables/useSectionNav'
import ThemeToggle from './ThemeToggle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { goToSection } = useSectionNav()

/** `id` items scroll to a home-page section; `to` items are real page routes. */
const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Analysis', to: '/analysis' },
  { label: 'Contact', id: 'contact' },
]

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 20)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const emit = defineEmits<{ (e: 'open-palette'): void }>()
</script>

<template>
  <header class="menubar" :class="{ scrolled }">
    <div class="bar container">
      <a href="#top" class="brand" @click.prevent="goToSection('top')">
        <span class="brand-name">{{ profile.initials }}</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <template v-for="item in navItems" :key="item.label">
          <RouterLink v-if="item.to" :to="item.to" class="nav-link">{{ item.label }}</RouterLink>
          <a v-else :href="`#${item.id}`" class="nav-link" @click.prevent="goToSection(item.id!)">
            {{ item.label }}
          </a>
        </template>
      </nav>

      <div class="actions">
        <button class="cmd" type="button" aria-label="Open command palette" @click="emit('open-palette')">
          <AppIcon name="search" :size="15" />
          <kbd>⌘K</kbd>
        </button>
        <a :href="profile.resumePath" download class="resume-btn btn-solid">
          <AppIcon name="download" :size="15" />
          <span>Resume</span>
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.menubar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: padding var(--dur) var(--ease);
  padding-top: 8px;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
  height: var(--menubar-h);
  padding-inline: 16px;
  border-radius: var(--r-pill);
  background: transparent;
  border: 1px solid transparent;
  transition: all var(--dur) var(--ease);
}
.scrolled .bar {
  background: var(--surface);
  -webkit-backdrop-filter: blur(var(--glass-blur));
  backdrop-filter: blur(var(--glass-blur));
  border-color: var(--surface-border);
}
.brand {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.nav {
  display: flex;
  gap: var(--sp-5);
}
.nav-link {
  padding: 7px 2px;
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: var(--text-dim);
  transition: color var(--dur-fast) var(--ease);
}
.nav-link:hover {
  color: var(--text);
}
.nav-link.router-link-exact-active {
  color: var(--text);
}
.actions {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}
.cmd {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 6px 10px;
  border-radius: var(--r-pill);
  border: 1px solid var(--surface-border);
  background: transparent;
  color: var(--text-dim);
  font-size: 0.82rem;
}
.cmd kbd {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  color: var(--text-faint);
}
.resume-btn {
  padding: 8px 16px;
  font-size: 0.85rem;
}

@media (max-width: 900px) {
  .nav,
  .cmd {
    display: none;
  }
}
@media (max-width: 480px) {
  .resume-btn span {
    display: none;
  }
}
</style>
