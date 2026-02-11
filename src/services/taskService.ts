import type { ITask } from '@/types/task';

import tasks from './data.json';

export const taskService = {
  async fetchTasks(): Promise<ITask[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasks as ITask[]);
      }, 500); // to simulate network delay to bw able to show the loading indicator
    });
  },
};
