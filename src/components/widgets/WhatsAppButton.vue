<!-- WhatsAppButton — floating click-to-chat FAB with prefilled message. -->
<script setup lang="ts">
import { whatsappLink } from '@/data/profile'
</script>

<template>
  <a
    :href="whatsappLink()"
    target="_blank"
    rel="noopener"
    class="wa-fab"
    aria-label="Chat on WhatsApp"
  >
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
      <path
        d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.6.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5s-.6-1.6-.9-2.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.7 3.1.5 1.7 1.6 3.1 1.8 3.3.2.2 2.5 3.9 6.1 5.3 2.8 1.1 3.4.9 4 .8.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.3z"
      />
      <path
        d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.9 5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"
      />
    </svg>
    <span class="ping" aria-hidden="true" />
  </a>
</template>

<style scoped>
.wa-fab {
  position: fixed;
  right: 20px;
  bottom: 84px;
  z-index: 95;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(140deg, #25d366, #128c7e);
  box-shadow: 0 10px 28px rgba(18, 140, 126, 0.45);
  transition: transform var(--dur-fast) var(--ease);
}
.wa-fab:hover {
  transform: scale(1.08);
}
.ping {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #25d366;
  animation: ping 2.2s var(--ease) infinite;
}
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
@media (max-width: 680px) {
  /* Stacked above the chat launcher, which itself clears the dock. */
  .wa-fab {
    bottom: 142px;
    right: 14px;
    width: 50px;
    height: 50px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ping {
    animation: none;
    display: none;
  }
}
</style>
