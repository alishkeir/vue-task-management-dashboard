<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>

    <div class="task-assignee">
      <img src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png" alt="" />
      <p>{{ task.assignee }}</p>
    </div>

    <div class="task-footer">
      <CardBadge :text="task.status" type="status" />
      <CardBadge :text="task.priority" type="priority" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '@/types/task';
import CardBadge from '../common/CardBadge.vue';

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

.task-assignee {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 0.6rem;
}

.task-assignee img {
  width: 25px;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
</style>
