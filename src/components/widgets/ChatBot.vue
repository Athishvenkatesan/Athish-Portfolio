<!--
  ChatBot — floating macOS-style assistant window.
  Uses askBot() (scripted engine, AI-upgrade-ready). Renders safe mini-markdown.
-->
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { askBot } from '@/chatbot/engine'
import { greeting, suggestions } from '@/chatbot/knowledge'
import { renderMini } from '@/utils/miniMarkdown'
import { profile } from '@/data/profile'
import AppIcon from '@/components/ui/AppIcon.vue'

interface Msg {
  from: 'bot' | 'user'
  html: string
}

const open = ref(false)
const input = ref('')
const typing = ref(false)
const scroller = ref<HTMLElement | null>(null)
const messages = ref<Msg[]>([{ from: 'bot', html: renderMini(greeting) }])

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
    messages.value.push({ from: 'bot', html: renderMini(reply.text) })
    await scrollDown()
  }, 480)
}

function toggle() {
  open.value = !open.value
  if (open.value) scrollDown()
}
</script>

<template>
  <div class="chat-root">
    <transition name="pop">
      <section v-if="open" class="panel glass" role="dialog" aria-label="Portfolio assistant">
        <header class="head">
          <span class="avatar">{{ profile.initials }}</span>
          <div class="who">
            <strong>Portfolio Assistant</strong>
            <span class="status"><i /> Online · usually instant</span>
          </div>
          <button class="x" aria-label="Close chat" @click="toggle"><AppIcon name="close" :size="18" /></button>
        </header>

        <div ref="scroller" class="messages">
          <div v-for="(m, i) in messages" :key="i" class="msg" :class="m.from">
            <span class="bubble" v-html="m.html" />
          </div>
          <div v-if="typing" class="msg bot">
            <span class="bubble typing"><i /><i /><i /></span>
          </div>
        </div>

        <div class="suggestions">
          <button v-for="s in suggestions" :key="s" class="sugg" @click="send(s)">{{ s }}</button>
        </div>

        <form class="composer" @submit.prevent="send()">
          <input v-model="input" type="text" placeholder="Ask me anything…" aria-label="Message" />
          <button type="submit" class="send" aria-label="Send" :disabled="!input.trim()">
            <AppIcon name="send" :size="18" />
          </button>
        </form>
      </section>
    </transition>

    <button class="launcher" :class="{ open }" aria-label="Open chat assistant" @click="toggle">
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
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
  box-shadow: 0 10px 28px var(--accent-soft);
  transition: transform var(--dur-fast) var(--ease);
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
  border-radius: var(--r-lg);
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
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
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
  padding: var(--sp-4);
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.msg {
  display: flex;
}
.msg.user {
  justify-content: flex-end;
}
.bubble {
  max-width: 84%;
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
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-bottom-right-radius: 5px;
}
.bubble :deep(a) {
  color: var(--accent-2);
  text-decoration: underline;
}
.msg.user .bubble :deep(a) {
  color: #fff;
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
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
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
}
</style>
