<script setup>
import { computed, ref } from 'vue'

const n = ref(2)

const keyword = computed(() => {
  const v = n.value
  if (v <= -2) return 'notch'
  if (v < -0.4) return 'scoop'
  if (v < 0.4) return 'bevel'
  if (v < 1.4) return 'round'
  if (v < 3.2) return 'squircle'
  return 'square'
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
        <span>{{ keyword }}</span>
      </label>
      <input
        id="corner-n"
        v-model.number="n"
        class="corner-slider__range"
        type="range"
        min="-5"
        max="5"
        step="0.1"
      />
    </div>
  </div>
</template>
