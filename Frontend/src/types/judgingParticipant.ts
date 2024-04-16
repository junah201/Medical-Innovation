import { JudgingEvent, JudgingResult, User } from '.';

export interface JudgingParticipant {
  id: number;
  user_id: number;
  user: User;
  event_id: number;
  event: JudgingEvent;
  nth_pass: number;
  application: any;
  first_judging_result: JudgingResult;
  second_judging_result: JudgingResult;
  created_at: string;
  updated_at: string;
}

export interface JudgingParticipantList {
  total: number;
  participants: JudgingParticipant[];
}
