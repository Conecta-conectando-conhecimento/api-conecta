import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, Timestamp } from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        type: string;

    @CreateDateColumn()
        created_at: Timestamp;

    @DeleteDateColumn()
        deleted_at!: Date;
}