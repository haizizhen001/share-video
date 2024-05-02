export interface Video {
    _id: number;
    title: string;
    email: string;
    content: string;
    link: string;
}
export interface IUserInfo{  
    userId: string;
    userName: string;
    email: string;
    iat: number;
    exp: number;
}
export interface ResponseApi{ 
    data: any;
    message: string;
    code: string;
}
