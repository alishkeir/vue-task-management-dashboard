<template>
  <div class="task-list">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />

    <p v-if="tasks.length === 0">No tasks to show!</p>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '@/types/task';
import TaskCard from './TaskCard.vue';

defineProps<{
  tasks: ITask[];
}>();
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30rem;
  margin: 2rem auto;
}
</style>
