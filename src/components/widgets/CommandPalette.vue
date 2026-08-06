<!-- CommandPalette — macOS Spotlight-style ⌘K quick navigation. -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { projects } from '@/data/projects'
import { whatsappLink, profile } from '@/data/profile'
import { useSectionNav } from '@/composables/useSectionNav'
import AppIcon from '@/components/ui/AppIcon.vue'

const router = useRouter()
const { goToSection } = useSectionNav()
const open = ref(false)
const query = ref('')
const active = ref(0)
const fieldRef = ref<HTMLInputElement | null>(null)

interface Cmd {
  label: string
  hint: string
  icon: string
  run: () => void
}

const base: Cmd[] = [
  { label: 'Home', hint: 'Top of page', icon: 'user', run: () => goHash('top') },
  { label: 'Skills', hint: 'Section', icon: 'code', run: () => goHash('skills') },
  { label: 'Experience', hint: 'Section', icon: 'grid', run: () => goHash('experience') },
  { label: 'Projects', hint: 'Section', icon: 'layout', run: () => goHash('projects') },
  {
    label: 'Analysis',
    hint: 'Page',
    icon: 'chart',
    run: () => {
      close()
      router.push('/analysis')
    },
  },
  { label: 'Education & Awards', hint: 'Section', icon: 'cap', run: () => goHash('education') },
  { label: 'Contact', hint: 'Section', icon: 'mail', run: () => goHash('contact') },
  { label: 'Message on WhatsApp', hint: 'Open chat', icon: 'chat', run: () => openExt(whatsappLink()) },
  { label: 'Download Résumé', hint: 'PDF', icon: 'download', run: () => openExt(profile.resumePath) },
  ...projects.map((p) => ({
    label: p.title,
    hint: p.category,
    icon: 'arrow',
    run: () => {
      close()
      router.push(`/projects/${p.id}`)
    },
  })),
]

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return base
  return base.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(q))
})

watch(results, () => (active.value = 0))

function goHash(id: string) {
  close()
  goToSection(id)
}
function openExt(href: string) {
  close()
  window.open(href, '_blank', 'noopener')
}
async function show() {
  open.value = true
  query.value = ''
  active.value = 0
  await nextTick()
  fieldRef.value?.focus()
}
function close() {
  open.value = false
}
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value ? close() : show()
    return
  }
  if (!open.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % results.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + results.value.length) % results.value.length
  } else if (e.key === 'Enter') {
    results.value[active.value]?.run()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
defineExpose({ show })
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="overlay" @click.self="close">
      <div class="palette surface" role="dialog" aria-label="Command palette">
        <div class="field">
          <AppIcon name="search" :size="18" />
          <input
            ref="fieldRef"
            v-model="query"
            type="text"
            placeholder="Jump to a section or project…"
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>
        <ul class="list">
          <li
            v-for="(c, i) in results"
            :key="c.label"
            class="row"
            :class="{ active: i === active }"
            @mouseenter="active = i"
            @click="c.run()"
          >
            <span class="r-ic"><AppIcon :name="c.icon" :size="16" /></span>
            <span class="r-label">{{ c.label }}</span>
            <span class="r-hint">{{ c.hint }}</span>
          </li>
          <li v-if="!results.length" class="empty">No matches</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  padding-top: 14vh;
  background: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.palette {
  width: min(560px, calc(100vw - 32px));
  height: max-content;
  max-height: 64vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.field {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4);
  border-bottom: 1px solid var(--glass-border);
  color: var(--text-faint);
}
.field input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
}
.field kbd {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
}
.list {
  list-style: none;
  overflow-y: auto;
  padding: var(--sp-2);
}
.row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 11px 14px;
  border-radius: var(--r-md);
  cursor: pointer;
}
.row.active {
  background: var(--accent-soft);
}
.r-ic {
  color: var(--accent);
  display: grid;
  place-items: center;
}
.r-label {
  flex: 1;
  font-weight: 500;
  font-size: 0.94rem;
}
.r-hint {
  font-size: 0.78rem;
  color: var(--text-faint);
}
.empty {
  padding: var(--sp-5);
  text-align: center;
  color: var(--text-faint);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s var(--ease);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
