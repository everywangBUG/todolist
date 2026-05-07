import { useState } from 'react';
import { Check, Edit2, Trash2, X, Calendar, Tag } from 'lucide-react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'priority' | 'dueDate' | 'tags'>>) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低',
};

export const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState<Todo['priority']>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editTags, setEditTags] = useState(todo.tags.join(','));

  const handleSave = () => {
    const tagsArray = editTags.split(',').map(t => t.trim()).filter(t => t);
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate || null,
      tags: tagsArray,
    });
    setIsEditing(false);
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <div
      className={`group relative bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        todo.completed
          ? 'border-gray-200 bg-gray-50'
          : 'border-gray-200 hover:border-primary/30'
      }`}
    >
      {isEditing ? (
        <div className="p-4 space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="标题"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="描述"
            rows={2}
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Todo['priority'])}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="low">低优先级</option>
              <option value="medium">中优先级</option>
              <option value="high">高优先级</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <input
            type="text"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="标签，用逗号分隔"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggle(todo.id)}
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-primary border-primary'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`text-base font-medium ${
                  todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full border ${priorityColors[todo.priority]}`}
                >
                  {priorityLabels[todo.priority]}优先级
                </span>

                {todo.dueDate && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                      isOverdue
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    {new Date(todo.dueDate).toLocaleDateString('zh-CN')}
                  </span>
                )}

                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                title="编辑"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                title="删除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isOverdue && !todo.completed && (
            <div className="mt-3 pt-3 border-t border-red-100 flex items-center gap-2 text-red-600 text-sm">
              <X className="w-4 h-4" />
              <span>已过期</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
