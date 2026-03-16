import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'emerald' | 'violet' | 'amber' | 'rose';
}

const colorClasses = {
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
};

export function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colorClasses[color]} border`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-zinc-500">{title}</div>
    </div>
  );
}