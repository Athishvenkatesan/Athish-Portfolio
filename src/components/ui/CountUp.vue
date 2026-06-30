<!-- CountUp — renders a label with its numeric part animated up from zero. -->
<script setup lang="ts">
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps<{ value: string }>()
const display = useCountUp(props.value)
</script>

<template>
  <span>{{ display }}</span>
</template>
