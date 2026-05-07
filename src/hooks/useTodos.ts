import { useState, useEffect, useCallback } from 'react';
import type { Todo, FilterType, SortType, SortOrder } from '../types';
import { loadTodos, saveTodos, generateId } from '../utils/storage';

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTodos = loadTodos();
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((title: string, description: string, priority: Todo['priority'], dueDate: string | null, tags: string[]) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      createdAt: now,
      updatedAt: now,
      tags,
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'priority' | 'dueDate' | 'tags'>>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const deleteCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = searchQuery === '' || 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      todo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'dueDate':
        { const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        comparison = aDate - bDate;
        break; }
      case 'priority':
        comparison = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return {
    todos: sortedTodos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    deleteCompleted,
    stats,
  };
};
