import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CommunityEntity } from './community';
import { UserEntity } from './user';

@Entity('community_user')
export class CommunityUserEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        community_id: number;

    @ManyToOne(() => CommunityEntity)
    @JoinColumn({ name: 'community_id' })
        community: CommunityEntity;

    @Column()
        user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
        user: UserEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}