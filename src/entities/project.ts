import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity('Project')
export class ProjectEntity {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    about: string;

    @Column({ type: 'bigint' })
    max_participants: number;

    @Column({ type: 'text' })
    interest_area: string;

    @Column({ type: 'text', nullable: true })
    activities: string | null;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
