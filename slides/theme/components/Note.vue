<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'note' | 'tip' | 'warn'
    label?: string
  }>(),
  {
    type: 'note',
    label: undefined,
  },
)

const labels: Record<string, string> = {
  note: 'Note',
  tip: 'Tip',
  warn: 'Warning',
}
</script>

<template>
  <aside class="ryu-note" :data-type="type">
    <span class="ryu-note-label">{{ label || labels[type] }}</span>
    <div>
      <slot />
    </div>
  </aside>
</template>
