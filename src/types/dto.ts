export type CreateUserDTO = {
    email: string;
    cpf: string;
    name: string;
    user_name:string;
    birthday:Date;
    password: string;
    role_id: number;
}

export type UpdateUserDTO = {
    email?: string;
    name?: string;
    user_name?:string;
    birthday?:Date;
    role_id?: number;
}

export type CreateProjectDTO = {
    title: string;
    about: string;
    max_participants: number;
    interest_area: string;
    activities?: string;
    created_by: number;
    likes?: number;
}


export type UpdateProjectDTO = {
    title?: string;
    about?: string;
    max_participants?: number;
    interest_area?: string;
    activities?: string | null;
}

export type CreateFavoriteDTO = {
    project_id: number;
    user_id: number;
}

