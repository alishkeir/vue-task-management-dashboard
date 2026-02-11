<template>
  <span class="badge" :class="[badgeClass, type]">
    {{ text.replace(/_/g, ' ') }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  type?: 'status' | 'priority';
}>();

// class based on the status
const badgeClass = computed(() => {
  const text = props.text.toLowerCase().replace(/[\s_]+/g, '-');

  return props.type ? `${props.type}-${text}` : text;
});
</script>

<style scoped>
.badge {
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
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

/* priority */
.priority-high {
  background-color: #fee2e2;
  color: #991b1b;
}
.priority-medium {
  background-color: #ffedd5;
  color: #9a3412;
}
.priority-low {
  background-color: #f0fdf4;
  color: #166534;
}
</style>
