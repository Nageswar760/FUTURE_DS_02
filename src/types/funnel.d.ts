export interface ChannelData {
  name: 'Organic' | 'Paid Ads' | 'Email' | 'Social';
  visitors: number;
  leads: number;
  customers: number;
  color: string;
}

export interface FunnelData {
  totalVisitors: number;
  totalLeads: number;
  totalCustomers: number;
  channels: ChannelData[];
}

export interface FunnelStage {
  name: string;
  count: number;
  conversionRate?: number;
  dropOff?: number;
  color: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
  impact: string;
}