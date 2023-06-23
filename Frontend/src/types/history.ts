export interface History {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface HistoryList {
  total: number;
  items: History[];
}
