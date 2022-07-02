export interface Post {
  slug: string; // id
  title: string;
  author: string;
  coverURL: string;
  content: string;
  tags: string[];
  createdAt: number;
}

export interface PostInfo {
  slug: string; // id
  title: string;
  author: string;
  coverURL: string;
  tags: string[];
  createdAt: number;
}
