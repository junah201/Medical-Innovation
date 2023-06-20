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
