import { CheckSquare } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center py-8">
      <div className="inline-flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
          <CheckSquare className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">任务管理器</h1>
          <p className="text-gray-500 mt-1">高效管理你的日常任务</p>
        </div>
      </div>
    </header>
  );
};
