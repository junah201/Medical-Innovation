export interface PrivateEventSubmitInfo {
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

export interface PrivateEvent {
  id: number;
  name: string;
  thumbnail_filename?: string;
  join_start_date: string;
  join_end_date: string;
  description: string;
  created_at: string;
  updated_at: string;
}
