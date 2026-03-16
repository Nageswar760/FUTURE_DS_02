import { Zap, TrendUp } from 'lucide-react';

export function Header() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">FunnelInsight</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">Marketing Analytics</p>
        </div>
      </div>
      <p className="text-zinc-400 text-sm max-w-md">
        Transform raw data into growth opportunities with AI-powered insights
      </p>
    </div>
  );
}