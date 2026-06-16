<!-- GlassWindow — reusable macOS "window" card: traffic lights + title bar + slot. -->
<script setup lang="ts">
defineProps<{ title?: string; subtitle?: string }>()
</script>

<template>
  <div class="window glass">
    <div class="titlebar">
      <span class="lights" aria-hidden="true"><i /><i /><i /></span>
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
  border-radius: var(--r-lg);
}
.titlebar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 11px 16px;
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-hi);
}
.lights {
  display: inline-flex;
  gap: 7px;
}
.lights i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}
.lights i:nth-child(1) {
  background: #ff5f57;
}
.lights i:nth-child(2) {
  background: #febc2e;
}
.lights i:nth-child(3) {
  background: #28c840;
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
