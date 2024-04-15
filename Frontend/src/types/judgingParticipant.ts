import { JudgingResult } from './judgingResult';

export interface JudgingParticipant {
  id: number;
  user_id: number;
  event_id: number;
  nth_pass: number;
  // first_judging_result: JudgingResult;
  // second_judging_result: JudgingResult;
  application: any;
  created_at: string;
  updated_at: string;
}

export interface JudgingParticipantList {
  total: number;
  participants: JudgingParticipant[];
}
