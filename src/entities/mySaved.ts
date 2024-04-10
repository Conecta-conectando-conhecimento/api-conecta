import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user';
import { ProjectEntity } from './project';

@Entity('MySaved')
export class MySavedEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        project_id: number;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @Column()
        user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
        saved_at: Date;
    
}