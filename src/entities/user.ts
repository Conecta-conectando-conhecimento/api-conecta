import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAreasEntity } from './userAreasEntity';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
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

    @Column({ nullable: true })
    campus?: string;

    @Column({ nullable: true })
    sobre?: string;

    @Column({ nullable: true })
    linkedin?: string;

    @Column({ nullable: true })
    instagram?: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deactivation_date?: Date;

    @OneToMany(() => UserAreasEntity, userAreas => userAreas.user)
    userAreas: UserAreasEntity[];
}
