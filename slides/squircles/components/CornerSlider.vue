<script setup>
import { computed, ref } from 'vue'

const n = ref(4)

const label = computed(() => {
  const v = n.value
  if (v <= 0.05) return 'scoop'
  if (v < 1.2) return 'bevel寄り'
  if (v < 2.4) return 'round'
  if (v < 5) return 'squircle'
  return 'ほぼ矩形'
})
</script>

<template>
  <div class="corner-slider">
    <div
      class="corner-slider__shape"
      :style="{
        borderRadius: '2.6rem',
        cornerShape: `superellipse(${n})`,
      }"
    />
    <div class="corner-slider__controls">
      <label class="corner-slider__label" for="corner-n">
        <code>superellipse({{ n.toFixed(1) }})</code>
        <span>{{ label }}</span>
      </label>
      <input
        id="corner-n"
        v-model.number="n"
        class="corner-slider__range"
        type="range"
        min="0"
        max="10"
        step="0.1"
      />
    </div>
  </div>
</template>
