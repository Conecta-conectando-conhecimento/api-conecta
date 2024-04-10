import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, Timestamp } from 'typeorm';

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
    
    @CreateDateColumn( {type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'} )
        created_date: Date;

    @DeleteDateColumn( {type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'} )
        deactivation_date!: Date;

}