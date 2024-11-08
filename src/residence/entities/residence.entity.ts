import { TourEntity } from 'src/tours/entities/tours.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Residence extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('int', { name: 'start_day' })
  startDay: number;

  @Column('text', {
    array: true,
  })
  image_keys: string[];

  @ManyToOne(() => TourEntity, (tour) => tour.residencies)
  tour: TourEntity
}
