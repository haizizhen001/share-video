export interface Video {
    _id: number;
    title: string;
    email: string;
    content: string;
    link: string;
}
export interface ResponseApi{ 
    data: any;
    message: string;
    code: string;
}