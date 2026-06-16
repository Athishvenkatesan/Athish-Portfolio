<!-- BgBlobs — animated gradient "wallpaper" behind the glass (macOS Big Sur feel). -->
<script setup lang="ts">
// Purely decorative; no state.
</script>

<template>
  <div class="bg" aria-hidden="true">
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />
    <div class="grain" />
  </div>
</template>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: radial-gradient(120% 120% at 50% 0%, var(--bg-2), var(--bg));
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.85;
  will-change: transform;
}
.blob-1 {
  width: 46vw;
  height: 46vw;
  background: var(--blob-1);
  top: -10%;
  left: -8%;
  animation: drift1 22s var(--ease) infinite alternate;
}
.blob-2 {
  width: 40vw;
  height: 40vw;
  background: var(--blob-2);
  bottom: -12%;
  right: -6%;
  animation: drift2 26s var(--ease) infinite alternate;
}
.blob-3 {
  width: 32vw;
  height: 32vw;
  background: var(--blob-3);
  top: 35%;
  left: 45%;
  animation: drift3 30s var(--ease) infinite alternate;
}
.grain {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
@keyframes drift1 {
  to {
    transform: translate(8vw, 6vh) scale(1.15);
  }
}
@keyframes drift2 {
  to {
    transform: translate(-7vw, -5vh) scale(1.1);
  }
}
@keyframes drift3 {
  to {
    transform: translate(-6vw, 7vh) scale(0.9);
  }
}
@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
}
</style>
