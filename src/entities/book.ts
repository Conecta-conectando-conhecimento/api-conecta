import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { AuthorEntity } from './author';
import { GenreEntity } from './genre';

@Entity('book')
export class BookEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        synopsis: string;

    @Column()
        url_image: string;

    @Column()
        genre_id: number;

    @OneToOne(() => GenreEntity)
    @JoinColumn({ name: 'genre_id' })
        genre: GenreEntity;

    @Column()
        author_id: number;

    @OneToOne(() => AuthorEntity)
    @JoinColumn({ name: 'author_id' })
        author: AuthorEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}