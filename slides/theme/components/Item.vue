<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="ryu-item">
    <div v-if="title" class="ryu-item-title">{{ title }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>
