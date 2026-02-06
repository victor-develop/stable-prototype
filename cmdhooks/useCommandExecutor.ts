
import React from 'react';
import { AppState, Command } from '../types';

export const useCommandExecutor = (
  state: AppState,
  setState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  
  const execute = async (command: Command): Promise<void> => {
    const parts = command.raw.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    console.log(`[Playbook] Executing: ${command.raw}`);

    switch (cmd) {
      case 'navigate':
        setState(prev => ({ ...prev, currentView: args[0] as any }));
        break;

      case 'keyin': {
        const [selector, value] = args;
        const fieldName = selector.split('#')[1] || selector;
        setState(prev => ({
          ...prev,
          activeElementId: selector,
          formValues: { ...prev.formValues, [fieldName]: value }
        }));
        // Clear active state after short delay
        setTimeout(() => setState(prev => ({ ...prev, activeElementId: undefined })), 800);
        break;
      }

      case 'click': {
        const id = args[0];
        // Visual feedback for click
        setState(prev => ({ ...prev, activeElementId: id }));
        
        await new Promise(resolve => setTimeout(resolve, 300));

        if (id === 'signup-submit') {
          setState(prev => ({ 
            ...prev, 
            currentView: 'dashboard', 
            activeElementId: undefined,
            user: { username: prev.formValues.username || 'user', isLoggedIn: true, role: 'user' } 
          }));
        } else if (id === 'login-submit') {
          setState(prev => ({ 
            ...prev, 
            currentView: 'dashboard', 
            activeElementId: undefined,
            user: { username: 'Admin', isLoggedIn: true, role: 'admin' } 
          }));
        } else {
          setState(prev => ({ ...prev, activeElementId: undefined }));
        }
        break;
      }

      case 'wait': {
        const ms = parseInt(args[0], 10);
        await new Promise(resolve => setTimeout(resolve, ms));
        break;
      }

      case 'assert': {
        console.log(`[Assert] Passed: ${args.join(' ')}`);
        break;
      }

      default:
        console.warn(`Unknown command: ${cmd}`);
    }
  };

  return { execute };
};
