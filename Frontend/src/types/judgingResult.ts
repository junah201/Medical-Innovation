export interface JudgingResultSubmitInfo {
  judging_event_id: number;
  participant_id: number;
  nth: number;
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
  other_comment: string;
}

export interface JudgingResult {
  judging_event_id: string;
  participant_id: string;
  nth: string;
  technical_score1: string;
  technical_score2: string;
  technical_score3: string;
  technical_score4: string;
  technical_score5: string;
  technical_score6: string;
  marketability_score1: string;
  marketability_score2: string;
  marketability_score3: string;
  marketability_score4: string;
  business_score1: string;
  business_score2: string;
  business_score3: string;
  business_score4: string;
  business_score5: string;
  business_score6: string;
  business_score7: string;
  business_score8: string;
  other_score1: string;
  other_comment: string;
  id: string;
  user: any;
  participant_name: string;
  total_score: string;
  created_at: string;
  updated_at: string;
}
