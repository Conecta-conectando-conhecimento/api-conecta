import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user';
import { interestAreasEntity } from './interestArea';

@Entity('User_Areas')
export class UserAreasEntity {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    area_id: number;

    @ManyToOne(() => UserEntity, user => user.userAreas)
    user: UserEntity;

    @ManyToOne(() => interestAreasEntity, area => area.userAreas)
    area: interestAreasEntity;
}
