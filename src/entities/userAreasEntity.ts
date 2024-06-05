import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user';
import { interestAreasEntity } from './InterestArea';

@Entity('UserAreas')
export class UserAreasEntity {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    areas_id: number;

    @ManyToOne(() => UserEntity, user => user.userAreas)
    user: UserEntity;

    @ManyToOne(() => interestAreasEntity, area => area.userAreas)
    area: interestAreasEntity;
}
