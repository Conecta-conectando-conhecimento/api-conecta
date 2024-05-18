import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user';

@Entity('Project')
export class ProjectEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        about: string;

    @Column()
        introduction: string;

    @Column()
        max_participants: number;

    @Column()
        interest_area: string;

    @Column()
        activities!: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
        created_at: Date;

    @Column()
      user_id: number;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
        status: boolean;
}
