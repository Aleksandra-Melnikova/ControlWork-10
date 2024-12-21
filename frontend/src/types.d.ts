export interface New {
  id: number;
  title: string;
  description: string;
  image: string | null;
  date: string;
}
export interface IForm {
  title: string;
  description: string;
  image: File | null;
}

export interface IComment {
  id: number;
  news_id: number;
  author: string;
  text: string;
}
export interface IFormComment {
  news_id: number;
  author: string;
  text: string;
}
