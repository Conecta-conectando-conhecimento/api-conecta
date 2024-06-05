import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, Timestamp } from 'typeorm';

@Entity('InterestAreas')
export class interestAreasEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        name: string;
  
    @OneToMany(() => interestAreasEntity, area => area.userAreas)
    userAreas: interestAreasEntity[];
}