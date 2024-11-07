import { TourEntity } from 'src/tours/entities/tours.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Residence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: string;

  @Column('text', {
    array: true,
  })
  image_keys: string[];

  @ManyToMany(() => TourEntity, (tour) => tour.residencies)
  tours: TourEntity;
}
