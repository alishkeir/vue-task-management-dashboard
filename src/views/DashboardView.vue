<template>
  <div class="dashboard-view">
    <h1>Dashboard</h1>

    <div class="dashboard-filters">
      <Select v-model="selectedFilter" :options="taskStatusOptions" label="Filter by Status:" />
      <TextInputField v-model="searchTerm" placeholder="Search by title" />
    </div>

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
import TextInputField from '@/components/common/TextInputField.vue';

const store = useTaskStore();
const selectedFilter = ref('all');

const searchTerm = ref('');

// fetch the data as soonas the page loads
onMounted(() => {
  store.fetchTasks();
});

const taskStatusOptions = computed(() => {
  const options = store.statuses;

  return [{ label: 'All Tasks', value: 'all' }, ...options];
});

const filteredTasks = computed(() => {
  return store.tasks.filter((task) => {
    // status filter
    const statusMatches = selectedFilter.value === 'all' || task.status === selectedFilter.value;

    // search  term filter (not case-sensitive)
    const searchMatch = task.title.toLowerCase().includes(searchTerm.value.toLowerCase());

    return statusMatches && searchMatch;
  });
});
</script>

<style scoped>
.dashboard-view {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
}

.dashboard-filters {
  display: flex;
  align-items: end;
  gap: 1rem;
  margin: 1rem 0;
}

.dashboard-filters > * {
  flex: 1;
}
</style>
