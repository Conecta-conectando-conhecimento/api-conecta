import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('genre')
export class GenreEntity {
    @PrimaryColumn()
        id: number;

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