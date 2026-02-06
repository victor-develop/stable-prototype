import { Flow } from '../types';
import { sleep } from './utils';

export const userSignupFlow: Flow = {
  id: 'user-signup',
  name: 'User Sign Up Flow',
  description: 'Walkthrough of a new user registering for the platform.',
  user: 'New Prospect',
  seeds: async () => {
    await sleep(500);
    return { suggestedUsername: 'johndoe_' + Math.floor(Math.random() * 1000) };
  },
  commands: [
    { type: 'navigate', raw: 'navigate signup', description: 'Go to registration page' },
    { type: 'wait', raw: 'wait 1000', description: 'Wait for page load' },
    { type: 'keyin', raw: 'keyin signup-form#username automation_user', description: 'Enter username' },
    { type: 'keyin', raw: 'keyin signup-form#email user@example.com', description: 'Enter email address' },
    { type: 'keyin', raw: 'keyin signup-form#password secret123', description: 'Secure password entry' },
    { type: 'click', raw: 'click signup-submit', description: 'Submit registration' },
    { type: 'wait', raw: 'wait 1500', description: 'Processing signup...' },
    { type: 'assert', raw: 'assert view dashboard', description: 'Verify landed on dashboard' }
  ]
};