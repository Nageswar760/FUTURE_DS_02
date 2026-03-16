import { FunnelData } from '../types/funnel';

export const funnelData: FunnelData = {
  totalVisitors: 10000,
  totalLeads: 2200,
  totalCustomers: 330,
  channels: [
    {
      name: 'Organic',
      visitors: 3500,
      leads: 700,
      customers: 105,
      color: 'emerald',
    },
    {
      name: 'Paid Ads',
      visitors: 3000,
      leads: 450,
      customers: 60,
      color: 'violet',
    },
    {
      name: 'Email',
      visitors: 2000,
      leads: 900,
      customers: 135,
      color: 'amber',
    },
    {
      name: 'Social',
      visitors: 1500,
      leads: 150,
      customers: 30,
      color: 'rose',
    },
  ],
};