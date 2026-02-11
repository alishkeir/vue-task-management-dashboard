<template>
  <div class="dashboard-view">
    <h1>Dashboard</h1>

    <!-- TODO: use spinner component-->
    <div v-if="store.isLoading">Loading...</div>

    <TaskList v-else :tasks="store.tasks" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskList from '@/components/tasks/TaskList.vue';

const store = useTaskStore();

// fetch the data as soonas the page loads
onMounted(() => {
  store.fetchTasks();
});
</script>

<style scoped>
.dashboard-view {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}
</style>
