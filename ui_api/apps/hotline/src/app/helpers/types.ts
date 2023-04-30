export interface History {
  role: Role;
  content: string;
  name: string;
}

export type Role = 'assistant' | 'system' | 'user';

export type ChatSummaryResponse = string;
export type RiskAssessmentResponse = string;

export interface EmotionClassificationResponse {
  label: string;
  score: number;
}
