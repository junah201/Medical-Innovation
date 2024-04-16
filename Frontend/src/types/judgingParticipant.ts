import { User } from '.';

export interface JudgingParticipant {
  id: number;
  user_id: number;
  user: User;
  event_id: number;
  nth_pass: number;
  application: any;
  created_at: string;
  updated_at: string;
}

export interface JudgingParticipantList {
  total: number;
  participants: JudgingParticipant[];
}
