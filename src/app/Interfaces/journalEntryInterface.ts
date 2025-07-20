export interface Entry{
    _id?: string;
    title: string;
    desc: string;
    date: Date;
    rating: '1' | '2' | '3' | '4' | '5';
}