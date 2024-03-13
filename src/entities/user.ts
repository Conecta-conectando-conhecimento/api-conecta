import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from './role';

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        email: string;

    @Column()
        cpf: string;

    @Column()
        nome_completo: string;

    @Column()
        nome_usuario: string;

    @Column()
    data_de_nascimento: Date;

    @Column()
    senha: string;

    @Column()
    campus: string;

    @Column()
    sobre: string;

    @Column()
    linkedin: string;

    @Column()
    instagram: string;


    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'role_id' })
        role: RoleEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}