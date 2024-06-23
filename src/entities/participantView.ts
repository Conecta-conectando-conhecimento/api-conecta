// src/entities/ParticipantView.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'vw_participants_completos' })
export class ParticipantViewEntity {
    @PrimaryGeneratedColumn()
    participant_id: number;

    @Column()
    project_id: number;

    @Column()
    user_id: number;

    @Column()
    is_admin: boolean;

    @Column()
    project_title: string;

    @Column()
    user_name: string;

    @Column()
    user_image_url: string;
    
    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;
}
