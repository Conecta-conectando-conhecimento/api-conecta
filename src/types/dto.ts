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

export class CreateParticipantDTO {
    project_id: number;
    user_id: number;
}

export class UpdateParticipantDTO {
    project_id?: number;
    user_id?: number;
}

// src/dto/CreateProjectFileDTO.ts
export class CreateProjectFileDTO {
    name: string;
    file_url: string;
    project_id: number;
}

// src/dto/UpdateProjectFileDTO.ts
export class UpdateProjectFileDTO {
    name?: string;
    file_url?: string;
}


