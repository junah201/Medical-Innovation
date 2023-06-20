export interface JudgingResult {
  id: number;
  nth: number;
  judging_event_id: number;
  user: any;
  participant_id: number;
  participant_name: string;
  technical_score1: number;
  technical_score2: number;
  technical_score3: number;
  technical_score4: number;
  technical_score5: number;
  technical_score6: number;
  marketability_score1: number;
  marketability_score2: number;
  marketability_score3: number;
  marketability_score4: number;
  business_score1: number;
  business_score2: number;
  business_score3: number;
  business_score4: number;
  business_score5: number;
  business_score6: number;
  business_score7: number;
  business_score8: number;
  other_score1: number;
  total_score: number;
  other_comment: string;
  created_at: string;
  updated_at: string;
}

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
