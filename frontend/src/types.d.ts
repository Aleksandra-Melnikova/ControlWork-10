export interface New{
    id: number;
    title: string;
    description: string;
    image: string|null;
    date: string;
}
export interface IForm {
    title: string;
    description: string;
    image: File | null;
}