<!-- MenuBar — macOS-style frosted top bar: brand, section nav, theme + actions. -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { profile } from '@/data/profile'
import ThemeToggle from './ThemeToggle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
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
      <a href="#top" class="brand">
        <span class="dots" aria-hidden="true"><i /><i /><i /></span>
        <span class="brand-name">{{ profile.initials }}</span>
        <span class="brand-sep">/</span>
        <span class="brand-role">{{ profile.title }}</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`" class="nav-link">
          {{ item.label }}
        </a>
      </nav>

      <div class="actions">
        <button class="cmd" type="button" aria-label="Open command palette" @click="emit('open-palette')">
          <AppIcon name="search" :size="15" />
          <kbd>⌘K</kbd>
        </button>
        <a :href="profile.resumePath" download class="resume-btn">
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
  background: var(--glass-bg-strong);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  border-color: var(--glass-border);
  box-shadow: var(--shadow-1);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}
.dots {
  display: inline-flex;
  gap: 5px;
  margin-right: 4px;
}
.dots i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: block;
}
.dots i:nth-child(1) {
  background: #ff5f57;
}
.dots i:nth-child(2) {
  background: #febc2e;
}
.dots i:nth-child(3) {
  background: #28c840;
}
.brand-sep {
  color: var(--text-faint);
}
.brand-role {
  color: var(--text-dim);
  font-weight: 500;
}
.nav {
  display: flex;
  gap: var(--sp-1);
}
.nav-link {
  padding: 7px 14px;
  border-radius: var(--r-pill);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-dim);
  transition: color var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease);
}
.nav-link:hover {
  color: var(--text);
  background: var(--chip-bg);
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
  border: 1px solid var(--glass-border);
  background: var(--chip-bg);
  color: var(--text-dim);
  font-size: 0.82rem;
}
.cmd kbd {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  color: var(--text-faint);
}
.resume-btn {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 7px 14px;
  border-radius: var(--r-pill);
  font-size: 0.88rem;
  font-weight: 600;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
}

@media (max-width: 900px) {
  .nav,
  .brand-role,
  .brand-sep,
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
