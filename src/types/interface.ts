export interface IUserToken {
    user_id: number;
}

export interface IResetPasswordToken {
    user_id: number;
    password: string;
}

export interface ILoginResponse {
    user: {
        id: number,
        name: string,
        email: string,
    },
    accessToken: string
}