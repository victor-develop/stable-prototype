import { Flow } from '../types';
import { sleep } from './utils';

export const userLoginFlow: Flow = {
  id: 'user-login',
  name: 'User Login Flow',
  description: 'Standard authentication flow for existing users.',
  user: 'Returning Member',
  seeds: async () => {
    await sleep(300);
    return { lastUsedEmail: 'admin@system.com' };
  },
  commands: [
    { type: 'navigate', raw: 'navigate login', description: 'Go to login page' },
    { type: 'keyin', raw: 'keyin login-form#email admin@system.com', description: 'Fill email' },
    { type: 'keyin', raw: 'keyin login-form#password admin123', description: 'Fill password' },
    { type: 'click', raw: 'click login-submit', description: 'Perform login' },
    { type: 'wait', raw: 'wait 800', description: 'Authenticating...' },
    { type: 'assert', raw: 'assert user-status logged-in', description: 'Verify login status' }
  ]
};