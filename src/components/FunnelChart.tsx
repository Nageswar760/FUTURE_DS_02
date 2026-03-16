import { useState } from 'react';
import { FunnelData } from '../types/funnel';
import { getFunnelStages } from '../utils/calculateMetrics';
import { ArrowRight, Minus } from 'lucide-react';

interface FunnelChartProps {
  data: FunnelData;
}

export function FunnelChart({ data }: FunnelChartProps) {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const stages = getFunnelStages(data);

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-500 shadow-emerald-500/20',
      amber: 'bg-amber-500 shadow-amber-500/20',
      violet: 'bg-violet-500 shadow-violet-500/20',
    };
    return colors[color as keyof typeof colors] || colors.violet;
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Conversion Funnel</h2>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Data
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        {stages.map((stage, index) => (
          <div
            key={stage.name}
            className="relative w-full group"
            onMouseEnter={() => setHoveredStage(index)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div
              className={`
                ${getColorClasses(stage.color)}
                rounded-xl p-4 shadow-lg transition-all duration-300
                hover:scale-[1.02] hover:shadow-xl cursor-pointer
              `}
              style={{
                width: `${100 - index * 18}%`,
                margin: '0 auto',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{stage.count.toLocaleString()}</div>
                  <div className="text-sm text-white/80">{stage.name}</div>
                </div>
                {stage.conversionRate && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{stage.conversionRate}%</div>
                    <div className="text-xs text-white/70">conversion</div>
                  </div>
                )}
              </div>
            </div>

            {index < stages.length - 1 && (
              <div className="flex items-center justify-center py-2">
                <ArrowRight className="w-4 h-4 text-zinc-600 rotate-90" />
              </div>
            )}

            {hoveredStage === index && stage.dropOff && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-zinc-800 text-white text-sm rounded-xl p-4 shadow-2xl border border-zinc-700 z-10 w-56">
                <div className="flex items-center gap-2 mb-2">
                  <Minus className="w-4 h-4 text-rose-400" />
                  <span className="font-semibold text-rose-400">{stage.dropOff}% Drop-off</span>
                </div>
                <div className="text-zinc-400 text-xs">
                  {stage.count.toLocaleString()} {stage.name.toLowerCase()} remaining
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">22%</div>
          <div className="text-xs text-zinc-500">Visitor → Lead</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">15%</div>
          <div className="text-xs text-zinc-500">Lead → Customer</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-violet-400">3.3%</div>
          <div className="text-xs text-zinc-500">Overall Rate</div>
        </div>
      </div>
    </div>
  );
}