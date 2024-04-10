import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProjectEntity } from './project';

@Entity('ProjectFiles')
export class ProjectFilesEntity {
    @PrimaryColumn()
        id: number;

    @Column()
    name: string;

    @Column()
    file_url: string;

    @Column()
        project_id: number;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
        saved_at: Date;
    
}