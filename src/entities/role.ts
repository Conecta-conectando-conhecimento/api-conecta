import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        type: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}