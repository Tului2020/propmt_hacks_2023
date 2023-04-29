export interface History {
  role: Role;
  content: string;
  name: string;
}

export enum Role {
  'assistant' = 'assistant',
  'system' = 'system',
  'user' = 'user',
}
