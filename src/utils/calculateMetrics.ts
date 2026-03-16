import { FunnelData, FunnelStage, Recommendation } from '../types/funnel';

export function calculateConversionRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round((current / previous) * 100);
}

export function calculateDropOff(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((previous - current) / previous) * 100);
}

export function getFunnelStages(data: FunnelData): FunnelStage[] {
  const visitorToLeadRate = calculateConversionRate(data.totalLeads, data.totalVisitors);
  const leadToCustomerRate = calculateConversionRate(data.totalCustomers, data.totalLeads);
  const visitorDropOff = calculateDropOff(data.totalLeads, data.totalVisitors);
  const leadDropOff = calculateDropOff(data.totalCustomers, data.totalLeads);

  return [
    {
      name: 'Visitors',
      count: data.totalVisitors,
      color: 'emerald',
    },
    {
      name: 'Leads',
      count: data.totalLeads,
      conversionRate: visitorToLeadRate,
      dropOff: visitorDropOff,
      color: 'amber',
    },
    {
      name: 'Customers',
      count: data.totalCustomers,
      conversionRate: leadToCustomerRate,
      dropOff: leadDropOff,
      color: 'violet',
    },
  ];
}

export function generateRecommendations(data: FunnelData): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const visitorToLeadRate = calculateConversionRate(data.totalLeads, data.totalVisitors);
  const leadToCustomerRate = calculateConversionRate(data.totalCustomers, data.totalLeads);

  if (visitorToLeadRate < 20) {
    recommendations.push({
      id: '1',
      title: 'Optimize Landing Page CTA',
      description: `${100 - visitorToLeadRate}% drop-off between Visitor and Lead. Test stronger headlines, clearer value propositions, and more prominent call-to-action buttons.`,
      priority: 'high',
      icon: 'Edit',
      impact: '+15-25% conversion',
    });
  }

  if (leadToCustomerRate < 15) {
    recommendations.push({
      id: '2',
      title: 'Improve Onboarding Flow',
      description: `Customer conversion from leads is ${leadToCustomerRate}%. Consider adding a demo video, case studies, or a free trial to increase trust and conversion.`,
      priority: 'high',
      icon: 'Users',
      impact: '+10-20% revenue',
    });
  }

  const emailChannel = data.channels.find((c) => c.name === 'Email');
  const paidChannel = data.channels.find((c) => c.name === 'Paid Ads');

  if (emailChannel && paidChannel) {
    const emailRate = calculateConversionRate(emailChannel.leads, emailChannel.visitors);
    const paidRate = calculateConversionRate(paidChannel.leads, paidChannel.visitors);

    if (emailRate > paidRate * 1.5) {
      recommendations.push({
        id: '3',
        title: 'Reallocate Budget to Email',
        description: `Email has ${emailRate}% lead conversion — ${Math.round(emailRate / paidRate)}x higher than Paid Ads (${paidRate}%). Consider shifting budget to email campaigns.`,
        priority: 'medium',
        icon: 'Star',
        impact: '+30% ROI',
      });
    }
  }

  const socialChannel = data.channels.find((c) => c.name === 'Social');

  if (socialChannel) {
    const socialLeadRate = calculateConversionRate(socialChannel.leads, socialChannel.visitors);
    const socialCustomerRate = calculateConversionRate(socialChannel.customers, socialChannel.leads);

    if (socialLeadRate < 15 && socialCustomerRate < 20) {
      recommendations.push({
        id: '4',
        title: 'Retarget Social Traffic',
        description: `Social traffic shows low conversion (${socialLeadRate}% leads, ${socialCustomerRate}% customers). Retarget with case studies and testimonials to build credibility.`,
        priority: 'medium',
        icon: 'Mail',
        impact: '+12% conversion',
      });
    }
  }

  if (recommendations.length < 3) {
    recommendations.push({
      id: '5',
      title: 'Scale What Works',
      description: 'Your top-performing channels are showing strong results. Consider increasing investment in these areas while maintaining current optimization efforts.',
      priority: 'low',
      icon: 'Check',
      impact: '+5-10% growth',
    });
  }

  return recommendations.slice(0, 5);
}

export function getChannelMetrics(channel: { visitors: number; leads: number; customers: number }) {
  return {
    leadConversionRate: calculateConversionRate(channel.leads, channel.visitors),
    customerConversionRate: calculateConversionRate(channel.customers, channel.leads),
  };
}