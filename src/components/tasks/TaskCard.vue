<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>

    <p>{{ task.description }}</p>

    <div class="task-footer">
      <span>{{ task.status.replace('_', ' ') }}</span>
      <span>{{ task.priority }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '@/types/task';

defineProps<{
  task: ITask;
}>();
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 0.85rem;
  color: #666;
  text-transform: capitalize;
}
</style>
