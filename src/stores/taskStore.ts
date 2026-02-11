import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ITask, TTaskStatus } from '@/types/task';
import { taskService } from '@/services/taskService';
import { formatStatusLabel } from '@/helpers/taskHelpers';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<ITask[]>([]); // reactive tasks array (data)
  const statuses = ref<{ label: string; value: TTaskStatus }[]>([]); // reactive tasks array (data)
  const isLoading = ref(false);

  //   fetch thetasks from the service and update the status
  const fetchTasks = async () => {
    isLoading.value = true; //adding this here to global ui sync, instead of waiting for the api call delay
    try {
      tasks.value = await taskService.fetchTasks();
      const originalStatuses = [...new Set(tasks.value.map((task) => task.status))];
      statuses.value = originalStatuses.map((status) => ({
        label: formatStatusLabel(status),
        value: status,
      }));
    } finally {
      isLoading.value = false;
    }
  };

  //   update the task status in the store using the new value
  const updateTaskStatus = (taskId: string | number, newStatus: TTaskStatus) => {
    const task = tasks.value.find((task) => task.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  };

  return {
    tasks,
    statuses,
    isLoading,
    fetchTasks,
    updateTaskStatus,
  };
});
