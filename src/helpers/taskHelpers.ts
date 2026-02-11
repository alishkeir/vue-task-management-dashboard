import type { ITask } from '@/types/task';

export const formatStatusLabel = (status: string): string => {
  const clean = status.replace(/_/g, ' ');
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

export const getStatusOptions = (tasks: ITask[]) => {
  // extract all the status values from the tasks array
  const statuses = [...new Set(tasks.map((t) => t.status))];

  return statuses.map((status) => ({
    label: formatStatusLabel(status),
    value: status,
  }));
};
