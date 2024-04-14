export interface Post {
  id: number;
  title: string;
  board_id: number;
  content: string;
  board: Board;
  files: string[];
  author: PostAuthor;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface PostList {
  datas: Post[];
  total: number;
}

export interface Board {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface PostAuthor {
  id: number;
  name: string;
}
