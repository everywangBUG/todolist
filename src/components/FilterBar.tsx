import { Search, ArrowUpDown, Filter } from 'lucide-react';
import type { FilterType, SortType, SortOrder } from '../types';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sortBy: SortType;
  onSortByChange: (sortBy: SortType) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar = ({
  filter,
  onFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'active', label: '待完成' },
    { value: 'completed', label: '已完成' },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'createdAt', label: '创建时间' },
    { value: 'dueDate', label: '截止日期' },
    { value: 'priority', label: '优先级' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索任务..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Filter className="w-4 h-4 text-gray-500 ml-1" />
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => onFilterChange(f.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  filter === f.value
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <ArrowUpDown className="w-4 h-4 text-gray-500 ml-1" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortType)}
              className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
