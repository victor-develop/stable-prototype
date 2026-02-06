
import { userSignupFlow } from './userSignup';
import { userLoginFlow } from './userLogin';
import { adminDashboardFlow } from './adminDashboard';
import { Flow } from '../types';

export const FLOWS: Flow[] = [
  userSignupFlow,
  userLoginFlow,
  adminDashboardFlow,
];
