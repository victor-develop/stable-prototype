
export type CommandType = 'navigate' | 'keyin' | 'click' | 'wait' | 'assert' | 'seed';

export interface Command {
  type: CommandType;
  raw: string;
  description: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  commands: Command[];
  seeds: () => Promise<any>;
}

export interface AppState {
  currentView: 'landing' | 'signup' | 'login' | 'dashboard';
  user: {
    username: string;
    isLoggedIn: boolean;
    role: string;
  } | null;
  formValues: Record<string, string>;
  activeElementId?: string;
}

export interface PlaybookContextType {
  state: AppState;
  updateState: (update: Partial<AppState>) => void;
  executeCommand: (cmd: Command) => Promise<void>;
  isExecuting: boolean;
  currentStep: number;
}
