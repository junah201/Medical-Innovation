import { JudgingResult } from './judgingResult';

export interface JudgingParticipant {
  id: number;
  user_id: number;
  event_id: number;
  first_judging_result: JudgingResult;
  second_judging_result: JudgingResult;
  name: string;
  english_name: string;
  gender: string;
  birth: string;
  phone: string;
  email: string;
  organization_type: string;
  organization_name: string;
  organization_english_name: string;
  job_position: string;
  address: string;
  final_degree: string;
  participant_motivation: string;
  profile_filename: string;
  zip_filename: string;
  created_at: string;
  updated_at: string;
}

export interface JudgingParticipantList {
  total: number;
  participants: JudgingParticipant[];
}
