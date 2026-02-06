
import { Flow } from '../types';

export const adminDashboardFlow: Flow = {
  id: 'admin-dashboard-audit',
  name: 'Admin Dashboard Audit',
  description: 'An exploration of the administrator dashboard widgets.',
  seeds: async () => {
    return { reportsCount: 12, alerts: 2 };
  },
  commands: [
    { type: 'navigate', raw: 'navigate dashboard', description: 'Direct access to dashboard' },
    { type: 'click', raw: 'click toggle-sidebar', description: 'Expand navigation' },
    { type: 'wait', raw: 'wait 500', description: 'View animation' },
    { type: 'click', raw: 'click refresh-stats', description: 'Refresh data analytics' },
    { type: 'wait', raw: 'wait 2000', description: 'Simulating data fetch' }
  ]
};
