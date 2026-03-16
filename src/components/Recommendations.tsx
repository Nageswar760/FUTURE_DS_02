import { FunnelData } from '../types/funnel';
import { generateRecommendations } from '../utils/calculateMetrics';
import { Edit, Users, Star, Mail, Check, ArrowRight } from 'lucide-react';

interface RecommendationsProps {
  data: FunnelData;
}

const iconMap: Record<string, React.ElementType> = {
  Edit,
  Users,
  Star,
  Mail,
  Check,
};

const priorityConfig = {
  high: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    label: 'High Impact',
  },
  medium: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    label: 'Medium Impact',
  },
  low: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    label: 'Low Impact',
  },
};

export function Recommendations({ data }: RecommendationsProps) {
  const recommendations = generateRecommendations(data);

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          AI Recommendations
        </h2>
        <span className="text-xs text-zinc-500">{recommendations.length} insights</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const Icon = iconMap[rec.icon] || Star;
          const config = priorityConfig[rec.priority];

          return (
            <div
              key={rec.id}
              className={`
                bg-zinc-800/50 rounded-xl p-5 border border-zinc-700
                hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300
                group cursor-pointer
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${config.bg} ${config.border} border flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-white text-sm">{rec.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.text} flex-shrink-0`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{rec.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-emerald-400">{rec.impact}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}