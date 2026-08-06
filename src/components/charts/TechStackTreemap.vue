<!-- TechStackTreemap — which technologies recur most across all projects, sized by frequency. -->
<script setup lang="ts">
import { computed } from 'vue'
import { projects } from '@/data/projects'

const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 10 })

interface Item {
  name: string
  value: number
}
interface Rect extends Item {
  x: number
  y: number
  w: number
  h: number
}

/** Simple recursive binary-split ("slice and dice") treemap — alternates the
 * split axis by whichever side of the remaining box is longer, which keeps
 * tiles reasonably square without a full squarified-treemap implementation. */
function squarify(items: Item[], x: number, y: number, w: number, h: number): Rect[] {
  if (items.length === 0) return []
  if (items.length === 1) return [{ ...items[0], x, y, w, h }]

  const total = items.reduce((sum, i) => sum + i.value, 0)
  let sumA = 0
  let splitIdx = 1
  for (let i = 0; i < items.length; i++) {
    sumA += items[i].value
    if (sumA >= total / 2) {
      splitIdx = i + 1
      break
    }
  }
  splitIdx = Math.max(1, Math.min(splitIdx, items.length - 1))
  const groupA = items.slice(0, splitIdx)
  const groupB = items.slice(splitIdx)
  const fracA = groupA.reduce((sum, i) => sum + i.value, 0) / total

  if (w >= h) {
    const wA = w * fracA
    return [...squarify(groupA, x, y, wA, h), ...squarify(groupB, x + wA, y, w - wA, h)]
  }
  const hA = h * fracA
  return [...squarify(groupA, x, y, w, hA), ...squarify(groupB, x, y + hA, w, h - hA)]
}

const rects = computed<Array<Rect & { showLabel: boolean }>>(() => {
  const counts = new Map<string, number>()
  for (const p of projects) {
    for (const tech of p.stack) counts.set(tech, (counts.get(tech) ?? 0) + 1)
  }
  const items = Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, props.limit)
  // Tiles below this size can't fit the label with padding — hide it rather
  // than let it clip/overflow (the `title` attribute keeps it reachable on hover).
  return squarify(items, 0, 0, 100, 100).map((r) => ({ ...r, showLabel: r.w >= 18 && r.h >= 20 }))
})
</script>

<template>
  <div>
    <div class="treemap" role="img" aria-label="Technology usage treemap, sized by how many projects use each">
      <div
        v-for="r in rects"
        :key="r.name"
        class="tile"
        :style="{ left: r.x + '%', top: r.y + '%', width: r.w + '%', height: r.h + '%' }"
        :title="`${r.name} — used in ${r.value} project${r.value === 1 ? '' : 's'}`"
      >
        <template v-if="r.showLabel">
          <span class="tile-name">{{ r.name }}</span>
          <span class="tile-count">{{ r.value }}× </span>
        </template>
      </div>
    </div>
    <!-- Table-view twin: every tile's data stays reachable even where a tile is too small to show its own label. -->
    <ul class="treemap-legend">
      <li v-for="r in rects" :key="`legend-${r.name}`">{{ r.name }} <b>{{ r.value }}×</b></li>
    </ul>
  </div>
</template>

<style scoped>
.treemap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--r-md);
  overflow: hidden;
}
.tile {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 8px 10px;
  box-sizing: border-box;
  border: 2px solid var(--surface);
  background: var(--accent);
  color: #fff;
  overflow: hidden;
}
.tile-name {
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.2;
  overflow-wrap: break-word;
}
.tile-count {
  font-size: 0.68rem;
  font-family: var(--font-mono);
  opacity: 0.85;
}
.treemap-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  list-style: none;
  margin-top: var(--sp-3);
  font-size: 0.76rem;
  color: var(--text-faint);
}
.treemap-legend b {
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-weight: 600;
}
@media (max-width: 640px) {
  .tile-name {
    font-size: 0.68rem;
  }
}
</style>
