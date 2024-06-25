// userAreasEntity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user';
import { InterestAreaEntity } from './InterestArea';

@Entity('User_Areas')
export class UserAreasEntity {

    @PrimaryColumn()
    user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @PrimaryColumn()
    area_id: number;

    @ManyToOne(() => InterestAreaEntity)
    @JoinColumn({ name: 'area_id' })
    interestArea: InterestAreaEntity;
}
