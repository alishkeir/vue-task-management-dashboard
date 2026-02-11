export type TTaskStatus = 'todo' | 'in_progress' | 'done';
export type TTaskPriority = 'low' | 'medium' | 'high';

export type TTaskFilter = TTaskStatus | 'all';

export interface ITask {
  id: string | number;
  title: string;
  description?: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  createdAt: string;
}
