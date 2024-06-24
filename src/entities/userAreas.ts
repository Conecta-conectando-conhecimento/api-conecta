import { Entity, PrimaryColumn } from 'typeorm';

@Entity('User_Areas')
export class UserAreasEntity {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    area_id: number;
}
