import { useState } from 'react';
import { Header } from './components/Header';
import { FunnelChart } from './components/FunnelChart';
import { ChannelBars } from './components/ChannelBars';
import { Recommendations } from './components/Recommendations';
import { StatCard } from './components/StatCard';
import { funnelData } from './data/funnelData';
import { FunnelData } from './types/funnel';
import { Users, Star, Plus, Upload } from 'lucide-react';

function App() {
  const [data] = useState<FunnelData>(funnelData);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <Header />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Visitors"
            value={data.totalVisitors.toLocaleString()}
            change="+12.5%"
            icon={Users}
            color="emerald"
          />
          <StatCard
            title="New Leads"
            value={data.totalLeads.toLocaleString()}
            change="+8.3%"
            icon={Star}
            color="violet"
          />
          <StatCard
            title="Customers"
            value={data.totalCustomers.toLocaleString()}
            change="+15.2%"
            icon={Plus}
            color="amber"
          />
          <StatCard
            title="Revenue"
            value="$99.5K"
            change="+22.1%"
            icon={Upload}
            color="rose"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funnel Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <FunnelChart data={data} />
          </div>

          {/* Channel Bars - 1 column */}
          <div className="lg:col-span-1">
            <ChannelBars data={data} />
          </div>

          {/* Recommendations - Full width */}
          <div className="lg:col-span-3">
            <Recommendations data={data} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between text-sm text-zinc-500">
          <p>FunnelInsight v2.0 • Marketing Analytics Platform</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;