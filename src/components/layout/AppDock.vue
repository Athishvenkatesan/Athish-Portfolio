<!-- AppDock — floating macOS dock for quick section navigation with hover magnify. -->
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSectionNav } from '@/composables/useSectionNav'
import AppIcon from '@/components/ui/AppIcon.vue'

const { goToSection } = useSectionNav()

/** `id` items scroll to a home-page section; `to` items are real page routes. */
const items = [
  { id: 'top', label: 'Home', icon: 'user' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'experience', label: 'Experience', icon: 'grid' },
  { id: 'projects', label: 'Projects', icon: 'layout' },
  { label: 'Analysis', icon: 'chart', to: '/analysis' },
  { id: 'education', label: 'Education', icon: 'cap' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

const hovered = ref<string | null>(null)
</script>

<template>
  <nav class="dock surface" aria-label="Section navigation">
    <template v-for="item in items" :key="item.label">
      <RouterLink
        v-if="item.to"
        :to="item.to"
        class="dock-item"
        :class="{ active: hovered === item.label }"
        :aria-label="item.label"
        @mouseenter="hovered = item.label"
        @mouseleave="hovered = null"
      >
        <span class="tip">{{ item.label }}</span>
        <AppIcon :name="item.icon" :size="22" />
      </RouterLink>
      <a
        v-else
        :href="`#${item.id}`"
        class="dock-item"
        :class="{ active: hovered === item.label }"
        :aria-label="item.label"
        @click.prevent="goToSection(item.id!)"
        @mouseenter="hovered = item.label"
        @mouseleave="hovered = null"
      >
        <span class="tip">{{ item.label }}</span>
        <AppIcon :name="item.icon" :size="22" />
      </a>
    </template>
  </nav>
</template>

<style scoped>
.dock {
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--r-xl);
}
.dock-item {
  position: relative;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--r-md);
  color: var(--text-dim);
  transition: transform 0.25s var(--ease), color 0.2s var(--ease), background 0.2s var(--ease);
}
.dock-item:hover {
  transform: translateY(-10px) scale(1.18);
  color: var(--text);
  background: var(--chip-bg);
}
.dock-item.router-link-exact-active {
  color: var(--accent);
}
.tip {
  position: absolute;
  top: -34px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  border-radius: var(--r-pill);
  background: var(--surface);
  border: 1px solid var(--surface-border);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s var(--ease), transform 0.2s var(--ease);
  pointer-events: none;
}
.dock-item:hover .tip {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 680px) {
  .dock {
    bottom: 12px;
    gap: 2px;
    padding: 6px 8px;
    max-width: calc(100vw - 24px);
  }
  .dock-item {
    width: 40px;
    height: 40px;
  }
  .dock-item:hover {
    transform: translateY(-4px) scale(1.05);
  }
  .tip {
    display: none;
  }
}
</style>
