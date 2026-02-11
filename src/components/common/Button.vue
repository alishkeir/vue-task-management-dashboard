<template>
  <button type="button" class="custom-btn" :class="statusClass" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  status: 'todo' | 'in_progress' | 'done';
}>();

defineEmits(['click']);

const statusClass = computed(() => `status-${props.status.replace(/_/g, '-')}`);
</script>

<style scoped>
.custom-btn {
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;

  font-size: 14px;
  padding: 8px 5px !important;
  line-height: 1 !important;
  height: fit-content;
}

.custom-btn:hover {
  opacity: 0.8;
}

.status-todo {
  background-color: #e2e8f0;
  color: #475569;
}

.status-in-progress {
  background-color: #fef3c7;
  color: #92400e;
}

.status-done {
  background-color: #dcfce7;
  color: #166534;
}
</style>
