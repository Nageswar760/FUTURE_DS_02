import { useState } from 'react';
import { FunnelData } from '../types/funnel';
import { getChannelMetrics } from '../utils/calculateMetrics';

interface ChannelBarsProps {
  data: FunnelData;
}

export function ChannelBars({ data }: ChannelBarsProps) {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const maxVisitors = Math.max(...data.channels.map((c) => c.visitors));

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-500/20', text: 'text-emerald-400' },
      violet: { bg: 'bg-violet-500', light: 'bg-violet-500/20', text: 'text-violet-400' },
      amber: { bg: 'bg-amber-500', light: 'bg-amber-500/20', text: 'text-amber-400' },
      rose: { bg: 'bg-rose-500', light: 'bg-rose-500/20', text: 'text-rose-400' },
    };
    return colors[color as keyof typeof colors] || colors.violet;
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Channel Performance</h2>
        <span className="text-xs text-zinc-500">Click to highlight</span>
      </div>

      <div className="space-y-5">
        {data.channels.map((channel) => {
          const metrics = getChannelMetrics(channel);
          const colors = getColorClasses(channel.color);
          const visitorWidth = (channel.visitors / maxVisitors) * 100;
          const leadWidth = (channel.leads / maxVisitors) * 100;
          const customerWidth = (channel.customers / maxVisitors) * 100;
          const isSelected = selectedChannel === channel.name;

          return (
            <div
              key={channel.name}
              className={`
                transition-all duration-300 cursor-pointer rounded-xl p-3
                ${isSelected ? 'bg-zinc-800 scale-[1.02]' : 'hover:bg-zinc-800/50'}
              `}
              onClick={() => setSelectedChannel(isSelected ? null : channel.name)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                  <span className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {channel.name}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {metrics.leadConversionRate}%
                  </span>
                  <span className="text-xs text-zinc-500">leads</span>
                </div>
              </div>

              <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${colors.light} transition-all duration-700`}
                  style={{ width: `${visitorWidth}%` }}
                />
                <div
                  className={`absolute top-0 left-0 h-full ${colors.bg} transition-all duration-700`}
                  style={{ width: `${leadWidth}%` }}
                />
                <div
                  className={`absolute top-0 left-0 h-full ${colors.bg} opacity-60 transition-all duration-700`}
                  style={{ width: `${customerWidth}%` }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-zinc-500">
                <span>{channel.visitors.toLocaleString()}</span>
                <span>{channel.leads.toLocaleString()}</span>
                <span>{channel.customers.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}