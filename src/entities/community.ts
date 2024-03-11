import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('community')
export class CommunityEntity {
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