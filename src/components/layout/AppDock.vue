<!-- AppDock — floating macOS dock for quick section navigation with hover magnify. -->
<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const items = [
  { id: 'top', label: 'Home', icon: 'user' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'experience', label: 'Experience', icon: 'grid' },
  { id: 'projects', label: 'Projects', icon: 'layout' },
  { id: 'education', label: 'Education', icon: 'cap' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

const hovered = ref<string | null>(null)
</script>

<template>
  <nav class="dock glass" aria-label="Section navigation">
    <a
      v-for="item in items"
      :key="item.id"
      :href="`#${item.id}`"
      class="dock-item"
      :class="{ active: hovered === item.id }"
      :aria-label="item.label"
      @mouseenter="hovered = item.id"
      @mouseleave="hovered = null"
    >
      <span class="tip">{{ item.label }}</span>
      <AppIcon :name="item.icon" :size="22" />
    </a>
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
.tip {
  position: absolute;
  top: -34px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  border-radius: var(--r-pill);
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
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
