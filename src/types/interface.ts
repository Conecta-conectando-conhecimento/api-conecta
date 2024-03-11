export interface IUserToken {
    user_id: number;
}

export interface ILoginResponse {
    user: {
        id: number,
        name: string,
        email: string,
    },
    accessToken: string
}