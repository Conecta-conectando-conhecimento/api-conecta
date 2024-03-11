export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    profile_picture?: string;
    role_id: number;
}

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    profile_picture?: string;
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
