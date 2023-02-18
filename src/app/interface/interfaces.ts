export interface IUserShape {
    name: string;
    email: string;
    password: string;
    id?: number;
}

export interface IUserRequestResponse {
    dataValues: IUserShape;
}