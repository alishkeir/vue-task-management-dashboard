<template>
  <div class="dashboard-view">
    <h1>Dashboard</h1>

    <Select v-model="selectedFilter" :options="taskStatusOptions" label="Filter by Status:" />

    <Loader v-if="store.isLoading" />

    <TaskList v-else :tasks="filteredTasks" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskList from '@/components/tasks/TaskList.vue';
import Select from '@/components/common/Select.vue';
import Loader from '@/components/common/Loader.vue';

const store = useTaskStore();
const selectedFilter = ref('all');

// fetch the data as soonas the page loads
onMounted(() => {
  store.fetchTasks();
});

const taskStatusOptions = computed(() => {
  const options = store.statuses;

  return [{ label: 'All Tasks', value: 'all' }, ...options];
});

const filteredTasks = computed(() => {
  if (selectedFilter.value === 'all') return store.tasks;
  return store.tasks.filter((t) => t.status === selectedFilter.value);
});
</script>

<style scoped>
.dashboard-view {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}
</style>
