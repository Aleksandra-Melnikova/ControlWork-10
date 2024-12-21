export interface New{
    id: number;
    title: string;
    description: string;
    image: string|null;
    date: string;
}

export type NewWithoutId = Omit<New, 'id', 'date'>

export interface Comment{
    id: number;
    news_id: number;
    author: string | null;
    text: string;
}

export type CommentWithoutId = Omit<Comment, 'id'>
