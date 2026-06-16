<!-- ThemeToggle — macOS control-center style light/dark switch. -->
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import AppIcon from '@/components/ui/AppIcon.vue'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    class="toggle"
    :class="{ 'is-dark': theme === 'dark' }"
    type="button"
    role="switch"
    :aria-checked="theme === 'dark'"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span class="track">
      <AppIcon name="sun" :size="13" class="ic ic-sun" />
      <AppIcon name="moon" :size="12" class="ic ic-moon" />
    </span>
    <span class="knob" />
  </button>
</template>

<style scoped>
.toggle {
  position: relative;
  width: 54px;
  height: 28px;
  border-radius: var(--r-pill);
  background: var(--chip-bg);
  border: 1px solid var(--glass-border);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: background var(--dur-fast) var(--ease);
}
.track {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px;
  color: var(--text-faint);
}
.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: linear-gradient(140deg, #fff, #e8e8ef);
  box-shadow: var(--shadow-1);
  transition: transform var(--dur) var(--ease);
}
.is-dark .knob {
  transform: translateX(26px);
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
}
.ic-sun {
  opacity: 1;
}
.ic-moon {
  opacity: 0.4;
}
.is-dark .ic-sun {
  opacity: 0.4;
}
.is-dark .ic-moon {
  opacity: 1;
  color: var(--text);
}
</style>
