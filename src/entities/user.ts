import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Timestamp, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from './role';

@Entity('User')
export class UserEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column()
    name: string;

    @Column()
    user_name: string;

    @Column()
    birthday: Date;

    @Column()
    password: string;

    @Column()
    campus!: string;

    @Column()
    sobre!: string;

    @Column()
    linkedin!: string;

    @Column()
    instagram!: string;

    @CreateDateColumn()
        created_date: Timestamp;

    @DeleteDateColumn()
        deactivation_date!: Date;
}