import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoItem } from './components/TodoItem';
import { Stats } from './components/Stats';
import { useTodos } from './hooks/useTodos';
import { ClipboardList } from 'lucide-react';

function App() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />

        <div className="space-y-4">
          <Stats
            total={stats.total}
            active={stats.active}
            completed={stats.completed}
            onDeleteCompleted={deleteCompleted}
          />

          <TodoForm onAdd={addTodo} />

          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">暂无任务</h3>
              <p className="text-gray-400">点击上方按钮创建你的第一个任务</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>任务管理器 - 让每一天都更高效</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
