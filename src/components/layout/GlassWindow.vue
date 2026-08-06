<!-- GlassWindow — reusable flat card: title bar + slot. -->
<script setup lang="ts">
defineProps<{ title?: string; subtitle?: string }>()
</script>

<template>
  <div class="window surface">
    <div class="titlebar">
      <span v-if="title" class="title">{{ title }}</span>
      <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.window {
  overflow: hidden;
}
.titlebar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 13px 16px;
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-hi);
}
.title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-dim);
}
.subtitle {
  font-size: 0.78rem;
  color: var(--text-faint);
  margin-left: auto;
  font-family: var(--font-mono);
}
.body {
  padding: clamp(18px, 3vw, 28px);
}
</style>
