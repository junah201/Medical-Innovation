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
  judging_1st_form_type: string;
  judging_2nd_start_date: string;
  judging_2nd_end_date: string;
  judging_2nd_form_type: string;
  created_at: string;
  updated_at: string;
}

export interface JudgingEventList {
  total: number;
  items: JudgingEvent[];
}

export interface JudgingPermission {
  id: number;
  judging_event_id: number;
  user_id: number;
  first_judging_permission: boolean;
  second_judging_permission: boolean;
  created_at: string;
  updated_at: string;
}

export interface JudgingEventSubmitInfo {
  event_id: number;
  name: string;
  english_name: string;
  gender: string;
  birth: string;
  phone: string;
  email: string;
  resident_registration_number: string;
  organization_type: string;
  organization_name: string;
  organization_english_name: string;
  job_position: string;
  address: string;
  final_degree: string;
  participant_motivation: string;
  profile_filename: string;
  zip_filename: string;
}
