<!-- LivePreviewPanel — slide-in "Run in Browser" panel that embeds a project's live app in an iframe. -->
<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps<{ modelValue: boolean; url: string; title: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const loaded = ref(false)
const slow = ref(false)
let slowTimer: ReturnType<typeof setTimeout> | undefined

function close() {
  emit('update:modelValue', false)
}
function onFrameLoad() {
  loaded.value = true
  slow.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      loaded.value = false
      slow.value = false
      clearTimeout(slowTimer)
      // Many enterprise apps block framing (X-Frame-Options/CSP) with no
      // detectable error — a stalled load after a few seconds is the tell.
      slowTimer = setTimeout(() => {
        if (!loaded.value) slow.value = true
      }, 4000)
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  },
)

onUnmounted(() => {
  clearTimeout(slowTimer)
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="overlay" @click.self="close">
        <transition name="slide">
          <div v-if="modelValue" class="panel surface" role="dialog" aria-modal="true" :aria-label="`${title} — live preview`">
            <div class="titlebar">
              <span class="title">{{ title }} — running in browser</span>
              <a :href="url" target="_blank" rel="noopener" class="tool" aria-label="Open in a new tab">
                <AppIcon name="external" :size="15" />
              </a>
              <button type="button" class="tool" aria-label="Close preview" @click="close">
                <AppIcon name="close" :size="16" />
              </button>
            </div>
            <div class="body">
              <div v-if="slow" class="fallback">
                <p>This app may not allow embedding in another site.</p>
                <a :href="url" target="_blank" rel="noopener" class="btn btn-primary">
                  <AppIcon name="external" :size="16" /> Open live app in a new tab
                </a>
              </div>
              <iframe
                :src="url"
                :title="`${title} live preview`"
                class="frame"
                loading="lazy"
                referrerpolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                @load="onFrameLoad"
              />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.45);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.panel {
  width: min(94vw, 1040px);
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--r-lg) 0 0 var(--r-lg);
  overflow: hidden;
}
.titlebar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 11px 16px;
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-hi);
  flex-shrink: 0;
}
.title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-dim);
}
.tool {
  margin-left: auto;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: var(--r-pill);
  color: var(--text-dim);
  background: none;
  border: none;
  transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
}
.tool:hover {
  color: var(--text);
  background: var(--chip-bg);
}
.body {
  position: relative;
  flex: 1;
  background: #fff;
}
.frame {
  width: 100%;
  height: 100%;
  border: none;
}
.fallback {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
  text-align: center;
  padding: var(--sp-5);
  background: var(--bg);
  color: var(--text-dim);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s var(--ease);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s var(--ease);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
@media (max-width: 700px) {
  .panel {
    width: 100vw;
    border-radius: 0;
  }
}
</style>
