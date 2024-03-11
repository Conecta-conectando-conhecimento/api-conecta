import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity( 'alternative')
export class AlternativeEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        text: string;

    @Column()
        correct: boolean;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    @DeleteDateColumn()
        deleted_at: Date;
}