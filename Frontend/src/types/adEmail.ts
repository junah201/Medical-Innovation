export interface AdEmail {
  id: number;
  user_id: number;
  user: object;
  email: string;
  subscribe: boolean;
  etc_info: string;
  created_at: string;
  updated_at: string;
}

export interface AdEmailList {
  total: number;
  items: AdEmail[];
}
