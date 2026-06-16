<!--
  AppIcon — inline SVG icon set (stroke-based, currentColor).
  Single responsibility: render one named icon. Add a path = add an icon.
-->
<script setup lang="ts">
const props = defineProps<{ name: string; size?: number }>()

const paths: Record<string, string> = {
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  layout: 'M3 3h18v18H3zM3 9h18M9 21V9',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8',
  plug: 'M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0zM12 16v6',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  brain: 'M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V3zM15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V3z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  phone: 'M5 4h4l2 5-3 2a14 14 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2z',
  linkedin: 'M4 9h3v11H4zM5.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 9h3v1.6c.5-.9 1.7-1.8 3.4-1.8 3 0 3.6 2 3.6 4.6V20h-3v-5.2c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20h-3z',
  download: 'M12 3v12M7 11l5 4 5-4M5 21h14',
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5.3A8 8 0 1 1 21 12z',
  close: 'M6 6l12 12M18 6L6 18',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6L4.5 4.5M19.5 19.5L18 18M18 6l1.5-1.5M4.5 19.5L6 18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  external: 'M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  cap: 'M3 9l9-5 9 5-9 5-9-5zM7 11v5c0 1 2.5 3 5 3s5-2 5-3v-5',
  award: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM8.5 14l-1.5 7 5-3 5 3-1.5-7',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5',
}

const d = paths[props.name] ?? ''
const dim = props.size ?? 20
</script>

<template>
  <svg
    :width="dim"
    :height="dim"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="d" />
  </svg>
</template>
