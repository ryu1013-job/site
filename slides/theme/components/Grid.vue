<script setup lang="ts">
withDefaults(
  defineProps<{
    cols?: 2 | 3 | '2' | '3'
  }>(),
  {
    cols: 2,
  },
)
</script>

<template>
  <div class="ryu-grid" :data-cols="String(cols)">
    <slot />
  </div>
</template>
