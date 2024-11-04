import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tours')
export class TourEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

}
