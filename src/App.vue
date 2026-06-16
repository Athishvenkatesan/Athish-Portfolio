<!-- App shell — background, menu bar, routed views, dock + floating widgets. -->
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import BgBlobs from '@/components/layout/BgBlobs.vue'
import MenuBar from '@/components/layout/MenuBar.vue'
import AppDock from '@/components/layout/AppDock.vue'
import ChatBot from '@/components/widgets/ChatBot.vue'
import WhatsAppButton from '@/components/widgets/WhatsAppButton.vue'
import CommandPalette from '@/components/widgets/CommandPalette.vue'

const palette = ref<InstanceType<typeof CommandPalette> | null>(null)
</script>

<template>
  <BgBlobs />
  <MenuBar @open-palette="palette?.show()" />

  <RouterView v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <AppDock />
  <WhatsAppButton />
  <ChatBot />
  <CommandPalette ref="palette" />
</template>

<style scoped>
.route-enter-active,
.route-leave-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}
.route-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.route-leave-to {
  opacity: 0;
}
</style>
