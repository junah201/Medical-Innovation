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
  total_score: string;
  results: any;
  id: string;
  user: any;
  participant_name: string;
  created_at: string;
  updated_at: string;
}

export interface Judging2ndResultSubmitInfo {
  judging_event_id: number;
  participant_id: number;
  efficacy_and_stability_score1: number;
  efficacy_and_stability_score2: number;
  efficacy_and_stability_score3: number;
  efficacy_and_stability_score4: number;
  technical_score1: number;
  technical_score2: number;
  technical_score3: number;
  business_score1: number;
  business_score2: number;
  business_score3: number;
  business_score4: number;
  business_score5: number;
  business_score6: number;
  other_score1: number;
  other_comment: string;
}

export interface Judging2ndResult {
  judging_event_id: string;
  participant_id: string;
  efficacy_and_stability_score1: number;
  efficacy_and_stability_score2: number;
  efficacy_and_stability_score3: number;
  efficacy_and_stability_score4: number;
  technical_score1: number;
  technical_score2: number;
  technical_score3: number;
  business_score1: number;
  business_score2: number;
  business_score3: number;
  business_score4: number;
  business_score5: number;
  business_score6: number;
  other_score1: string;
  other_comment: string;
  id: string;
  user: any;
  participant_name: string;
  total_score: string;
  created_at: string;
  updated_at: string;
}
