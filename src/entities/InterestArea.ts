import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('InterestArea')
export class InterestAreaEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
