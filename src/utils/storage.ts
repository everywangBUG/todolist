import type { Todo } from '../types';

const STORAGE_KEY = 'react-todo-app-data';

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
