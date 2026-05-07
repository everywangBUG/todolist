export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'createdAt' | 'dueDate' | 'priority';

export type SortOrder = 'asc' | 'desc';
