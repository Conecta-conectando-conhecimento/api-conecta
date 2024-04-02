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

export type CreateBookDTO = {
    title: string;
    synopsis: string;
    url_image: string;
    genre_id: number;
    author_id: number;
}

export type UpdateBookDTO = {
    title: string;
    synopsis: string;
    url_image: string;
    genre_id: number;
    author_id: number;
}

export type CreateAuthorDTO = {
    name: string;
    description?: string;
}

export type UpdateAuthorDTO = {
    name: string;
    description?: string;
}

export type CreateGenreDTO = {
    name: string;
}

export type UpdateGenreDTO = {
    name: string;
}
