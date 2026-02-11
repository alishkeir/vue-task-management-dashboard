import { ref, computed, type Ref } from 'vue';
import type { ITask, TTaskFilter } from '@/types/task';

// pass the tasks from the store here
export function useTaskFilters(tasks: Ref<ITask[]>) {
  // keeping track of what filter is clicked
  const currentFilter = ref<TTaskFilter>('all');

  // filter the tasks based on the current filter value
  const filteredTasks = computed(() => {
    if (currentFilter.value === 'all') {
      return tasks.value;
    }
    return tasks.value.filter((task) => task.status === currentFilter.value);
  });

  // change the filter value when user clicks a button
  const setFilter = (filter: TTaskFilter) => {
    currentFilter.value = filter;
  };

  return {
    currentFilter,
    filteredTasks,
    setFilter,
  };
}
