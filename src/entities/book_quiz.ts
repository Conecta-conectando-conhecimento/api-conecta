import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BookEntity } from './book';

@Entity('book_quiz')
export class BookQuizEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        book_id: number;

    @ManyToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
        book: BookEntity;

    @Column()
        name: string;

    @Column()
        description: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}