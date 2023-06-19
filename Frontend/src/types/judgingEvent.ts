export interface JudgingEvent {
  id: number;
  name: string;
  english_name: string;
  description: string;
  thumbnail_filename: string;
  start_date: string;
  end_date: string;
  join_start_date: string;
  join_end_date: string;
  judging_1st_start_date: string;
  judging_1st_end_date: string;
  judging_2nd_start_date: string;
  judging_2nd_end_date: string;
  created_at: string;
  updated_at: string;
}

export interface JudgingEventList {
  total: number;
  events: JudgingEvent[];
}