export interface PublicEvent {
  id: number;
  name: string;
  english_name: string;
  description: string;
  thumbnail_filename: string;
  start_date: string;
  end_date: string;
  join_start_date: string;
  join_end_date: string;
  created_at: string;
  updated_at: string;
}

export interface PublicEventList {
  total: number;
  events: PublicEvent[];
}
