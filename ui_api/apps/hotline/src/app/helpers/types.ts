export interface History {
  role: Role;
  content: string;
  name: string;
}

export type Role = 'assistant' | 'system' | 'user';
