<!--
  ChatBot — floating macOS-style assistant window.
  Uses askBot() (scripted engine, AI-upgrade-ready). Renders safe mini-markdown,
  plus an inline chart for questions that carry one (see knowledge.ts `chart`),
  and swaps the suggestion row to that reply's follow-ups so the conversation
  has an obvious next step instead of resetting every turn.
-->
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { askBot } from '@/chatbot/engine'
import { greeting, suggestions as starterSuggestions, type ChatChartKind } from '@/chatbot/knowledge'
import { renderMini } from '@/utils/miniMarkdown'
import { profile } from '@/data/profile'
import AppIcon from '@/components/ui/AppIcon.vue'
import SkillRadarChart from '@/components/charts/SkillRadarChart.vue'
import TopSkillsBars from '@/components/charts/TopSkillsBars.vue'
import { useScrollDirection } from '@/composables/useScrollDirection'

interface Msg {
  from: 'bot' | 'user'
  html: string
  chart?: ChatChartKind
}

const { hidden } = useScrollDirection()
const open = ref(false)
const input = ref('')
const typing = ref(false)
const scroller = ref<HTMLElement | null>(null)
const messages = ref<Msg[]>([{ from: 'bot', html: renderMini(greeting) }])
const activeSuggestions = ref<string[]>(starterSuggestions)

async function scrollDown() {
  await nextTick()
  scroller.value?.scrollTo({ top: scroller.value.scrollHeight, behavior: 'smooth' })
}

async function send(text?: string) {
  const content = (text ?? input.value).trim()
  if (!content || typing.value) return
  input.value = ''
  messages.value.push({ from: 'user', html: renderMini(content) })
  typing.value = true
  await scrollDown()

  const reply = await askBot(content)
  // Small delay so the typing indicator reads naturally.
  window.setTimeout(async () => {
    typing.value = false
    messages.value.push({ from: 'bot', html: renderMini(reply.text), chart: reply.chart })
    activeSuggestions.value = reply.followUps
    await scrollDown()
  }, 480)
}

function toggle() {
  open.value = !open.value
  document.body.classList.toggle('chat-lock', open.value)
  if (open.value) scrollDown()
}
</script>

<template>
  <div class="chat-root">
    <transition name="pop">
      <section v-if="open" class="panel" role="dialog" aria-label="Portfolio assistant">
        <header class="head">
          <span class="avatar">{{ profile.initials }}</span>
          <div class="who">
            <strong>Portfolio Assistant</strong>
            <span class="status"><i /> Online · usually instant</span>
          </div>
          <button class="x" aria-label="Close chat" @click="toggle"><AppIcon name="close" :size="18" /></button>
        </header>

        <div ref="scroller" class="messages">
          <transition-group name="msg" tag="div" class="messages-inner">
            <div v-for="(m, i) in messages" :key="i" class="msg" :class="m.from">
              <div class="bubble-col">
                <span class="bubble" v-html="m.html" />
                <div v-if="m.chart" class="chart-card">
                  <SkillRadarChart v-if="m.chart === 'skills-radar'" :size="200" :show-labels="false" />
                  <TopSkillsBars v-else-if="m.chart === 'top-skills'" :limit="5" compact />
                  <RouterLink to="/analysis" class="chart-link">Open full Analysis <AppIcon name="arrow" :size="12" /></RouterLink>
                </div>
              </div>
            </div>
            <div v-if="typing" key="typing" class="msg bot">
              <span class="bubble typing"><i /><i /><i /></span>
            </div>
          </transition-group>
        </div>

        <div class="suggestions">
          <button v-for="s in activeSuggestions" :key="s" class="sugg" @click="send(s)">{{ s }}</button>
        </div>

        <form class="composer" @submit.prevent="send()">
          <input v-model="input" type="text" placeholder="Ask me anything…" aria-label="Message" />
          <button type="submit" class="send" aria-label="Send" :disabled="!input.trim()">
            <AppIcon name="send" :size="18" />
          </button>
        </form>
      </section>
    </transition>

    <button
      class="launcher"
      :class="{ open, 'scroll-hidden': hidden && !open }"
      aria-label="Open chat assistant"
      @click="toggle"
    >
      <AppIcon :name="open ? 'close' : 'chat'" :size="24" />
    </button>
  </div>
</template>

<style scoped>
.chat-root {
  position: fixed;
  right: 20px;
  bottom: 18px;
  z-index: 96;
}
.launcher {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #fff;
  background: var(--accent);
  box-shadow: 0 10px 28px var(--accent-soft);
  transition: transform var(--dur-fast) var(--ease), opacity var(--dur-fast) var(--ease);
}
.launcher:hover {
  transform: scale(1.08);
}
.panel {
  position: absolute;
  bottom: 72px;
  right: 0;
  width: min(380px, calc(100vw - 32px));
  height: min(540px, calc(100vh - 140px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Fully opaque, not the sitewide translucent .surface — a chat panel
     needs a solid, consistent background so messages stay legible instead
     of the page content ghosting through behind it while scrolling. */
  background: var(--bg-2);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-2);
}
.head {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-hi);
}
.avatar {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.85rem;
  color: #fff;
  background: var(--accent);
}
.who {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.who strong {
  font-size: 0.92rem;
}
.status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  color: var(--text-faint);
}
.status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #28c840;
}
.x {
  color: var(--text-dim);
}
.messages {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--sp-4);
}
:global(body.chat-lock) {
  overflow: hidden;
}
.messages-inner {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
/* New message entrance — replaces the previous "just appears" snap-in. */
.msg-enter-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}
.msg-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.msg {
  display: flex;
}
.msg.user {
  justify-content: flex-end;
}
.bubble-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 84%;
}
.bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
}
.msg.bot .bubble {
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-bottom-left-radius: 5px;
}
.msg.user .bubble {
  color: #fff;
  background: var(--accent);
  border-bottom-right-radius: 5px;
}
.bubble :deep(a) {
  color: var(--accent);
  text-decoration: underline;
}
.msg.user .bubble :deep(a) {
  color: #fff;
}
.chart-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px;
  border-radius: var(--r-md);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
}
.chart-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--accent);
}
.typing {
  display: inline-flex;
  gap: 4px;
}
.typing i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-faint);
  animation: blink 1.2s infinite;
}
.typing i:nth-child(2) {
  animation-delay: 0.2s;
}
.typing i:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes blink {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}
.suggestions {
  display: flex;
  gap: var(--sp-2);
  padding: 0 var(--sp-4) var(--sp-3);
  overflow-x: auto;
}
.sugg {
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-dim);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
}
.sugg:hover {
  color: var(--accent);
}
.composer {
  display: flex;
  gap: var(--sp-2);
  padding: var(--sp-3);
  border-top: 1px solid var(--glass-border);
}
.composer input {
  flex: 1;
  padding: 10px 14px;
  border-radius: var(--r-pill);
  background: var(--chip-bg);
  border: 1px solid var(--glass-border);
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
}
.composer input:focus {
  outline: none;
  border-color: var(--accent);
}
.send {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background: var(--accent);
}
.send:disabled {
  opacity: 0.5;
}
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
@media (max-width: 680px) {
  /* Lift the launcher above the bottom-center dock so they never overlap. */
  .chat-root {
    right: 14px;
    bottom: 78px;
  }
  /* Tucks out of the way while actively scrolling, so it doesn't sit on top
     of whatever section happens to pass underneath on a short screen. */
  .launcher.scroll-hidden {
    opacity: 0;
    transform: translateX(16px) scale(0.85);
    pointer-events: none;
  }
}
</style>
