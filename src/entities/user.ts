import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Timestamp, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from './role';

@Entity('Usuario')
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
    name_user: string;

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
        data_criacao: Timestamp;

    @DeleteDateColumn()
        data_inativacao!: Date;
}