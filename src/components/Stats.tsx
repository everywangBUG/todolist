import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface StatsProps {
  total: number;
  active: number;
  completed: number;
  onDeleteCompleted: () => void;
}

export const Stats = ({ total, active, completed, onDeleteCompleted }: StatsProps) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Circle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{total}</p>
                <p className="text-xs text-gray-500">总任务</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Circle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{active}</p>
                <p className="text-xs text-gray-500">待完成</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{completed}</p>
                <p className="text-xs text-gray-500">已完成</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">{completionRate}%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
                <p className="text-xs text-gray-500">完成率</p>
              </div>
            </div>
          </div>
        </div>

        {completed > 0 && (
          <button
            onClick={onDeleteCompleted}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            清除已完成
          </button>
        )}
      </div>

      {total > 0 && (
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
